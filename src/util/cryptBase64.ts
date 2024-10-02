
export const getLocalStorageWithB64 = <T>(key: string) =>
  JSON.parse(atob(localStorage.getItem(key) || 'W10=')) as T;

export const setLocalStorageWithB64 = (key: string, data: any) =>
  localStorage.setItem(key, btoa(JSON.stringify(data)));