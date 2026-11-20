export function getData(source: string) {
  return fetch(source).then((resp) => resp.json());
}
