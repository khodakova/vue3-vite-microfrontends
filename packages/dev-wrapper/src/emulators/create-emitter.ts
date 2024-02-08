import mitt from 'mitt';

/**
 * Создание эмулятора эмиттера с возможностью расширения базового набора событий
 */
export const createEmitter = () => mitt<Record<string, any>>();
