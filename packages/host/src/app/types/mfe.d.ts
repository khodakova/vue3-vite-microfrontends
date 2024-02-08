declare module 'mfe/app';
declare module 'mfe/routes' {
  import { RouteRecordRaw } from 'vue-router';

  const routes: RouteRecordRaw[] | ((prefix: string) => RouteRecordRaw[]);
  export default routes;
}

declare interface RemotesConfig {
  url: string,
  /** Container locations from which modules should be resolved and loaded at runtime. */
  external?: string,
  /** The format of the specified external */
  externalType?: 'url' | 'promise',
  /** The name of the share scope dev-wrapper with this remote1. */
  shareScope?: string,
  /** the remote1 format */
  format?: 'esm' | 'systemjs' | 'var',
  /** from */
  from?: 'vite' | 'webpack',
}

declare module '__federation__' {
  const __federation_method_getRemote: <T extends unknown>(remoteName: string, componentName: string) => Promise<T>;
  const __federation_method_setRemote: (remoteName: string, remoteConfig: RemotesConfig) => void;

  export {
    __federation_method_getRemote,
    __federation_method_setRemote,
  };
}
