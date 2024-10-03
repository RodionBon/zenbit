const camelCase = (snakeCaseString: string): string => {
  return snakeCaseString
    .split('_')
    .reduce(
      (prev, current) =>
        prev + current[0].toUpperCase() + current.slice(1, current.length),
    );
};

export const objectToCamel = (obj: Record<string, any>): object => {
  const newObj: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    newObj[camelCase(key)] = obj[key];
  });
  return newObj;
};
