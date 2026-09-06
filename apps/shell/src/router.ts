export function pathPrefix(prefix: string) {
  return (location: Location) => location.pathname.startsWith(prefix);
}
