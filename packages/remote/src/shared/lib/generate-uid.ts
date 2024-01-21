export const generateUid = ():string => Date.now().toString(36) + Math.random().toString(36).substring(2);

