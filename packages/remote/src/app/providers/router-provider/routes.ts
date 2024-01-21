import { RouteRecordRaw } from 'vue-router';
import { getAppPaths } from '../../../shared/config/paths';
import { MainPage } from '../../../pages/main-page';
import { getRouteNames } from '../../../shared/config/route-names';
import { OneMorePage } from '../../../pages/one-more-page';
import { AnotherPage } from '../../../pages/another-page';

/**
 * Динамическое формирование роутов в зависимости от префиксов при встраивании мфе в хост
 * @param prefix - префикс передается принудительно для правильного формирования роутов в хосте
 */
export default function getRoutes(prefix?: string): RouteRecordRaw[] {
    const appPaths = getAppPaths(prefix);
    const routeNames = getRouteNames(prefix);
    return [
        {
            path: appPaths.MAIN,
            component: MainPage,
            name: routeNames.MAIN,
            children: [
                {
                    path: appPaths.ONE_MORE,
                    component: OneMorePage,
                    name: routeNames.ONE_MORE,
                },
                {
                    path: appPaths.ANOTHER,
                    component: AnotherPage,
                    name: routeNames.ANOTHER,
                },
            ]
        },
    ];
}

export const routes = getRoutes();
