import type { cartData } from './types';

export function getData(source: string) {
  return fetch(source).then((resp) => resp.json());
}

export function getFilter(search: string, include: Array<string> = [], all: boolean = true) {
  return function (item: cartData): boolean {
    if (search.length && item.name.toLowerCase().search(search.toLowerCase()) < 0) return false;
    if (include.length) {
      let founded = false;
      for (const category of include) {
        if (item.categories.includes(category)) {
          founded = true;
          if (!all) break;
        } else if (all) return false;
      }
      if (!founded) return false;
    }
    return true;
  };
}
