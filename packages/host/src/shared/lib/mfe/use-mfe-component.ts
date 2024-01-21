// eslint-disable-next-line camelcase, import/no-unresolved
import { __federation_method_getRemote, __federation_method_setRemote } from '__federation__';
import { Component, computed, defineAsyncComponent, Ref, ref, watchEffect } from 'vue';
import { getManifest, ManifestItem } from './get-manifest';
// import MfeError from './ui/mfe-error.vue';
// import MfeLoading from './ui/mfe-loading.vue';

type GetMfeComponentProps = {
    /** Название микрофронта */
    mfeName: string,
    /** Название компонента */
    componentName?: string,
}

/**
 * Получение компонента из микрофронта
 * @param mfeName - название микрофронта
 * @param componentName - название компонента (по умолчанию "app")
 * @returns asyncComponent - в том случае, если он был успешно загружен
 */
export function useMfeComponent({ mfeName, componentName = 'app' }: GetMfeComponentProps): Ref<Component | undefined> {
    const manifest = ref<ManifestItem[]>();

    const getAsyncManifest = async () => {
        manifest.value = await getManifest();
    };

    if (!manifest.value) {
        getAsyncManifest();
    }

    const mfeFromManifest = computed(() => {
        if (manifest.value) {
            const s = manifest.value.find((x) => x.name === mfeName)?.remote;
            return s;
        }
        return null;
    });

    const asyncComponent = ref<Component>();

    watchEffect(() => {
        if (mfeFromManifest.value) {
            // даем знать vite-plugin-federation, что существует указанный МФЕ
            __federation_method_setRemote(mfeName, {
                url: mfeFromManifest.value,
                format: 'esm',
                from: 'vite',
            });
            // определяем асинхронный компонент на загрузку
            asyncComponent.value = defineAsyncComponent({
                loader: () => __federation_method_getRemote(mfeName, `./${componentName}`),
                // loadingComponent: MfeLoading,
                // errorComponent: MfeError,
            });
        }
    });

    return asyncComponent;
}
