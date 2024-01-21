import { __federation_method_getRemote, __federation_method_setRemote } from '__federation__';
import { defineAsyncComponent } from 'vue';
import { RouteComponent, RouteRecordRaw } from 'vue-router';
import { getManifest } from './get-manifest';

type ImportedRoutesModule = typeof import('mfe/routes');

type MfeModuleConfig = {
    baseUrl: string,
    name: string,
    component: RouteComponent,
    children?: () => Promise<ImportedRoutesModule>,
}

export type GetMfeDynamicallyResult = {
    /** МФЕ для внедрения в роуты приложения */
    config: MfeModuleConfig,
    /** Внутренние роуты МФЕ */
    innerRoutes?: RouteRecordRaw[],
}

/**
 * Динамическое внедрение микрофронта и всех его составляющих (корневой компонент с дочерними роутами)
 * @param name - имя МФЕ который надо загрузить
 * @param baseUrl - корневой роут вида "/something"
 */
export const getMfeModule = async (name: string, baseUrl: string): Promise<GetMfeDynamicallyResult | null> => {
    // подгрузим манифест где у нас лежит карта ремоутов с МФЕ
    const manifest = await getManifest();
    // найдем необходимый модуль по имени
    const mfeModuleManifestConfig = manifest?.find((x) => x.name === name);

    // если все данные для установления ремоута есть, зададим ремоут для этого МФЕ
    if (manifest && mfeModuleManifestConfig) {
        __federation_method_setRemote(mfeModuleManifestConfig.name, {
            url: mfeModuleManifestConfig.remote,
            format: 'esm',
            from: 'vite',
        });

        const mfeModuleConfig: MfeModuleConfig = {
            baseUrl,
            name: mfeModuleManifestConfig.name,
            component: defineAsyncComponent(() => __federation_method_getRemote<RouteComponent>(mfeModuleManifestConfig.name, './app')),
            children: () => __federation_method_getRemote<ImportedRoutesModule>(mfeModuleManifestConfig.name, './routes'),
        };

        if (mfeModuleConfig) {
            // создадим карту внутренних роутов МФЕ
            const mfeModuleInnerRoutes = mfeModuleConfig.children
                ? await mfeModuleConfig.children().then((res) => {
                    if (Array.isArray(res.default)) {
                        return res.default;
                    }
                    if (typeof res.default === 'function') {
                        // @ts-expect-error возможно понадобится заменить декларацию для mfe/routes
                        return res.default(baseUrl);
                    }
                    return undefined;
                })
                : undefined;
            return {
                config: mfeModuleConfig,
                innerRoutes: mfeModuleInnerRoutes
            };
        }
        return null;
    }
    return null;
};

