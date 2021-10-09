export function isEmptyObj(obj: object, exceptions?: string[]) {
  return Object.entries(obj).some(([k, v]) =>
    exceptions?.includes(k) ? false : !v
  );
}
