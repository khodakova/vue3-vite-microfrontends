import { PathsValues } from '../../config/paths';

export type ManifestItem = {
    /** Название МФЕ */
    name: string,
    /** Персональный путь МФЕ */
    remote: string,
    /** Путь МФЕ внутри приложения */
    appUrl: PathsValues,
}

let savedManifest: ManifestItem[] | undefined;

/**
 * Асинхронное получение манифеста
 *
 * Если он уже был загружен, достаем из памяти
 * @returns manifest - массив с данными по МФЕ
 */
export async function getManifest(): Promise<ManifestItem[] | undefined> {
    if (!savedManifest) {
        savedManifest = await fetch('/manifest.json', {}).then((response) => response.json()) || [];
    }
    return savedManifest;
}

