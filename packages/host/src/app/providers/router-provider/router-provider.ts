import { App } from 'vue';
import { createRouter as createVueRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import { emitter } from '@/shared/config/mitt.ts';
// import { getMenu } from '@/shared/api/ppa/menu/menu-api.ts';
// import { NestedMenuPage } from '@/pages/nested-menu-page';
// import { ErrorPage } from '@/pages/error-page';
import { routes } from './routes';
import { GetMfeDynamicallyResult, getMfeModule } from '../../../shared/lib/mfe/get-mfe-module';
import { getEmitter } from '../../../shared/config/mitt/get-emitter';

const router = createVueRouter({
    history: createWebHistory(),
    routes,
});

interface MfeDownloadConfig {
    /** url для которого загружен МФЕ */
    url: string,
    /** название загруженного МФЕ */
    appName: string,
}

/** список загруженных МФЕ
 * пока что не используется в логике резолвинга МФЕ,
 * но надо будет подумать как смотреть какие МФЕ не загрузились чтобы повторить попытку
 */
const downloadedMfes: MfeDownloadConfig[] = [];
/** Флаг который показывает что все МФЕ участвующие в текущей конфигурации приложения загружены
 * на данном жтапе реализации всегда установится в true после первого прохода, даже если какие-то МФЕ не загружены
 */
let isAllMfeResolved = false;

/** Функция которая загружает МФЕ по определенному конфигу
 * конфиг необходим для того чтобы мы могли создавать независимые модули для разных роутов
 * например, если одно приложение отрисовывается на разных роутах
 */
const downloadMfeModule = async (config: MfeDownloadConfig) => {
    const mfeModule = await getMfeModule(config.appName, config.url);
    if (mfeModule) {
        downloadedMfes.push({ appName: config.appName, url: config.url });
        return mfeModule;
    }
    return undefined;
};

type Section = {
    id: string,
    fullName: string,
    shortName: string,
    url: string | null,
    section: Section[],
    appName: string | null,
    code: string,
    isShowNested?: boolean,
}


/**
 * Функция которая маппит полученое меню приложения в роуты, которые добавятся в роутер
 * Релизует логику привязки МФЕ к определенному роуту
 */
// eslint-disable-next-line max-len, arrow-body-style
// appName и url - на этом уровне есть мфе надо промаппить его и его внутренние роуты
// url и !appName и вторая итерация (то есть по подразделам идет цикл) - создаем страницу 3го уровня и на нее маппим мфе
// url и !appName - аггрегирующая вкладка МФЕ могут быть дальше надо маппить его секции дальше

// первая итерация - проходим по разделам
// вторая итерация - проходим по подразделам или табам
// третья итерация - проходим по табам

// как понять это таб или подраздел?
// если на предыдущей итерации isShowNested - true то это подраздел, иначе табы

// eslint-disable-next-line
const mapModulesToSubmenu = (submenu: Section[], modules: (GetMfeDynamicallyResult | undefined)[], menuBaseUrl = '', iteration = 1): RouteRecordRaw[] => {
    return submenu.map((x) => {
        if (x.url) {
            if (x.appName) {
                const menuModule = modules.find((y) => y?.config.name === x.appName && y?.config.baseUrl === `${menuBaseUrl}${x.url}`);

                if (!menuModule) {
                    return {
                        path: `${menuBaseUrl}${x.url}`,
                        component: 'error',
                        props: { title: 'Ошибка', message: `Не удалось загрузить модуль "${x.shortName}"` },
                        children: [],
                    };
                }

                return {
                    path: `${menuBaseUrl}${x.url}`,
                    component: menuModule.config.component,
                    props: { baseUrl: `${menuBaseUrl}${x.url}`, code: x.code },
                    children: menuModule.innerRoutes || [],
                };
            }

            // if (!x.appName && x.section.length > 0 && !x.isShowNested) {
            //     return {
            //         path: `${menuBaseUrl}${x.url}`,
            //         component: NestedMenuPage,
            //         props: { menu: x.section, baseUrl: `${menuBaseUrl}${x.url}`, title: x.shortName, code: x.code },
            //         children: [...mapModulesToSubmenu(x.section, modules, `${menuBaseUrl}${x.url}`, iteration + 1)],
            //         name: `main:nested-${x.url?.replaceAll('/', '')}`
            //     };
            // }

            if (x.section?.length > 0 && !x.appName) {
                return mapModulesToSubmenu(x.section, modules, `${menuBaseUrl}${x.url}`, iteration + 1);
            }
            return null;
        }
        return null;
    }).filter((x) => x != null).flat() as RouteRecordRaw[];
};

/**
 * Функция которая представит полную карту роутов как одномерный массив
 * и определит какие МФЕ нужно загрузить для работы приложения
 */
const getRequiredModules = (menu: Section[]) => {
    const menuMfeConfigs: MfeDownloadConfig[] = [];
    const mapMenuToMfeConfig = (data: Section, baseUrl = '') => {
        menuMfeConfigs.push({ url: `${baseUrl}${data.url}`, appName: data.appName || '' });
        if (data.section) {
            data.section.forEach((x) => {
                mapMenuToMfeConfig(x, `${baseUrl}${data.url}`);
            });
        }
    };

    menu.forEach((x) => {
        mapMenuToMfeConfig(x);
    });

    return menuMfeConfigs.filter((x) => !!x.appName);
};

export default {
    install(app: App) {
        router.install(app);
        const emitter = app.config.globalProperties.$emitter;

        router.beforeResolve(async (to) => {
            if (!isAllMfeResolved) {
                const menu: Section[] = await fetch('/sections.json')
                    .then((res) => res.json())
                    .catch(async () => {
                        isAllMfeResolved = true;
                        await router.replace(to.fullPath);
                        return [];
                    });
                const requiredModules = getRequiredModules(menu);

                if (requiredModules.length > 0) {
                    emitter.emit('loading', true);
                    const modules: GetMfeDynamicallyResult[] = [];

                    // eslint-disable-next-line no-restricted-syntax
                    for (const moduleConfig of requiredModules) {
                        try {
                            // eslint-disable-next-line no-await-in-loop
                            const module = await downloadMfeModule(moduleConfig);
                            if (module) {
                                modules.push(module);
                                downloadedMfes.push({ appName: module.config.name, url: module.config.baseUrl });
                            }
                        } catch (e) {
                            console.log(`Ошибка при загрузке ${moduleConfig.appName}`);
                        }
                    }

                    const routesWithModules = mapModulesToSubmenu(menu, modules);

                    routesWithModules.forEach((x) => {
                        router.addRoute(x);
                    });

                    isAllMfeResolved = true;
                    // для имитации загрузки
                    setTimeout(() => {
                        emitter.emit('loading', false);
                    }, 2000)
                }
                await router.replace(to.fullPath);
            }
            return true;
        });

    },
};
