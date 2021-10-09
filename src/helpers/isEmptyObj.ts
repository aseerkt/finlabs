export function isEmptyObj(obj: object, exceptions: string[] = []) {
  return Object.entries(obj).some(([k, v]) =>
    ['__v', ...exceptions].includes(k) ? false : !v
  );
}
