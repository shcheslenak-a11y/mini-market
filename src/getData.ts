import type { cartData } from './types';

export function getData(source: string) {
  return fetch(source).then((resp) => resp.json());
}

export function getFilter(
  search: string,
  include: Array<string> = [],
  all: boolean = true,
  range: Array<string> = ['0', '0'],
) {
  const left = Number(range[0]) || -1;
  const rigth = Number(range[1]) || Infinity;
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
    if (item.price < left || item.price > rigth) return false;
    return true;
  };
}

export function getSort(mode: string) {
  switch (mode) {
    case 'asc':
      return (a: cartData, b: cartData) => a.price - b.price;
    case 'desc':
      return (a: cartData, b: cartData) => b.price - a.price;
    default:
      return () => 0;
  }
}
