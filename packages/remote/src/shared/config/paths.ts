import { reactive, ref, watchEffect } from 'vue';

const relativePaths = {
    MAIN: '',
    ONE_MORE: 'one-more',
    ANOTHER: 'another',
};

type PathsKeys = keyof typeof relativePaths;

/** Префикс для формирования путей приложения */
export const _prefix = ref<string>();

/**
 Получение путей приложения с учетом префиксов
 * @param prefix - принудительный префикс
 */
export const getAppPaths = (prefix?: string): Record<PathsKeys, string> => {
    const newPrefix = prefix ?? _prefix?.value ?? '';
    const modifiedPaths = Object.entries(relativePaths)
        .map((x) => [x[0], `${newPrefix}/${x[1]}`]);
    return Object.fromEntries(modifiedPaths);
};

/** Пути для роутов приложения */
export const _paths = reactive<Record<PathsKeys, string>>(getAppPaths());

// при изменении префикса обновляем пути приложения
watchEffect(() => {
    const newPaths = getAppPaths(_prefix.value);
    Object.entries(newPaths).forEach(([key, val]) => {
        _paths[key as PathsKeys] = val;
    });
});
