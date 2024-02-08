import { PathsValues } from '../../config/paths';

export type ManifestItem = {
  /** Название МФЕ */
  name: string,
  /** Персональный путь МФЕ */
  remote: string,
  /** Путь МФЕ внутри приложения */
  appUrl: PathsValues,
}

let savedManifest: ManifestItem[] = [];

/**
 * Асинхронное получение манифеста
 *
 * Если он уже был загружен, достаем из памяти
 * @returns manifest - массив с данными по МФЕ
 */
export async function getManifest(): Promise<ManifestItem[]> {

  if (savedManifest.length === 0) {
    savedManifest = await fetch('/manifest.json', {})
        .then((response) => response.json())
        .catch(() => {
          return []
        });
  }
  return savedManifest;
}
