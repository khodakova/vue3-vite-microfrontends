import { reactive } from 'vue';
import { _prefix } from './paths';

export const routeNames = {
  MAIN: 'remote1:main',
  ONE_MORE: 'remote1:one-more',
  ANOTHER: 'remote1:another',
};

type RouteNamesKeys = keyof typeof routeNames;

export const getRouteNames = (prefix?: string) => {
  const newPrefix = prefix || _prefix?.value || '';
  const modifiedPaths = Object.entries(routeNames)
    .map((x) => [x[0], `${newPrefix}-${x[1]}`]);
  return Object.fromEntries(modifiedPaths) as Record<RouteNamesKeys, string>;
};

export const _routeNames = reactive<Record<RouteNamesKeys, string>>(getRouteNames());
