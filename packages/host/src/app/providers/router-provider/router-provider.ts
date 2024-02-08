import { App } from 'vue';
import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { getMfeModule } from '../../../shared/lib/mfe/get-mfe-module';

const router = createVueRouter({
  history: createWebHistory(),
  routes,
});

/** список загруженных МФЕ
 * пока что не используется в логике резолвинга МФЕ,
 * но надо будет подумать как смотреть какие МФЕ не загрузились чтобы повторить попытку
 */
const downloadedMfes: string[] = [];

type Section = {
  id: string,
  fullName: string,
  shortName: string,
  url: string | null,
  section: Section[],
  appName: string | null,
  code: string,
}

export default {
  install(app: App) {
    router.install(app);
    const emitter = app.config.globalProperties.$emitter;

    router.beforeResolve(async (to) => {
      // определим корневой маршрут
      const rootPath = `/${to.fullPath.split('/')[1]}`;
      // проверим, загружали ли мы до этого этот мфе (или он статично определен в приложении)
      const isMfeDownloaded = downloadedMfes.includes(rootPath);

      // если мфе не загружали, попробуем его получить
      if (!isMfeDownloaded) {
        try {
          emitter.emit('loading', true);

          const sections: Section[] = await fetch('/sections.json')
            .then((res) => res.json())
            .catch(async () => {
              await router.replace(to.fullPath);
              return [];
            });
          const mfeToDownload = sections.find((x) => x.url === rootPath);

          if (!mfeToDownload) {
            emitter.emit('loading', false);
            return;
          }

          // пытаемся получить составляющие мфе
          const mfeResult = await getMfeModule(mfeToDownload.appName ?? '', mfeToDownload.url ?? '');
          // если есть результат, значит он есть в манифесте и связь с хостом мфе была осуществлена
          if (mfeResult && mfeResult.config) {
            // добавим мфе как роут, получив его корневой компонент и дочерние роуты
            router.addRoute({
              path: mfeResult?.config.baseUrl ?? '',
              name: mfeResult?.config.name ?? '',
              component: mfeResult?.config.component ?? null,
              children: mfeResult?.innerRoutes || [],
              props: { baseUrl: mfeResult?.config.baseUrl ?? '' },
            });

            // для имитации загрузки
            setTimeout(() => {
              emitter.emit('loading', false);
            }, 1000);

            // добавляем мфе в перечень существующих в приложении, чтобы не производить повторную загрузку по нему
            downloadedMfes.push(rootPath);

            // продолжим навигацию
            router.replace(to.fullPath);
          }
        } catch (error) {
          console.log(error);
          emitter.emit('loading', false);
        }
      }
    });

  },
};
