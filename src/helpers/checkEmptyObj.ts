export function checkEmptyObj(obj: Record<string, string>) {
  return Object.values(obj).some((v) => !v);
}
