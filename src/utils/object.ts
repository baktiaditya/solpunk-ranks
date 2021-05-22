// https://github.com/microsoft/TypeScript/pull/12253#issuecomment-393954723
export const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];

export const sort = <T extends { [key: string]: any }>(obj: T) => {
  const sortedObj: { [key: string]: any } = {};
  const _keys = Object.keys(obj).sort();

  for (let i = 0; i < _keys.length; i++) {
    const k = _keys[i];
    sortedObj[k] = obj[k];
  }

  return sortedObj as T;
};
