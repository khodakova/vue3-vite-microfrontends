/** Маршруты приложения */
export const paths = {
  MAIN: '',
  REMOTE_1: '/remote-1',
  REMOTE_2: '/remote-2',
  // NOT_FOUND: '/:pathMatch(.*)*',
};

type PathsKeys = keyof typeof paths;
export type PathsValues = typeof paths[PathsKeys];
