import type { cartData } from './types';

export function getData(source: string) {
  return fetch(source).then((resp) => resp.json());
}

export function getFilter(search: string, include: Array<string> = [], all: boolean = true) {
  console.log(search, include, all);
  return function (item: cartData): boolean {
    console.log(item);
    return true;
  };
}
