import { reactive } from 'vue';
import { _prefix } from './paths';

export const routeNames = {
    MAIN: 'remote:main',
    ONE_MORE: 'remote:one-more',
    ANOTHER: 'remote:another',
}

type RouteNamesKeys = keyof typeof routeNames;

export const getRouteNames = (prefix?: string): Record<RouteNamesKeys, string> => {
    const newPrefix = prefix || _prefix?.value || '';
    const modifiedPaths = Object.entries(routeNames)
        .map((x) => [x[0], `${newPrefix}-${x[1]}`]);
    return Object.fromEntries(modifiedPaths);
};

export const _routeNames = reactive<Record<RouteNamesKeys, string>>(getRouteNames());
