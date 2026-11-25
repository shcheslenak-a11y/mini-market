import { describe, expect, it } from 'vitest';
import { getFilter } from './getData';

const data = [
  { name: 'abc', categories: ['c1'], price: 10 },
  { name: 'c', categories: ['c2'], price: 1000 },
  { name: 'de', categories: ['c3'], price: 0 },
  { name: '1', categories: ['c4'], price: 199 },
  { name: '12', categories: ['c1', 'c4'], price: 101 },
  { name: '13', categories: ['c1', 'c3'], price: 102 },
];

describe('getFilter', () => {
  it('should filter by search', () => {
    expect(data.filter(getFilter('1')).length).toBe(3);
    expect(data.filter(getFilter('a')).length).toBe(1);
    expect(data.filter(getFilter('c')).length).toBe(2);
    expect(data.filter(getFilter('f')).length).toBe(0);
  });

  it('should filter by categories', () => {
    expect(data.filter(getFilter('', ['c1'])).length).toBe(3);
    expect(data.filter(getFilter('', ['c2'])).length).toBe(1);
    expect(data.filter(getFilter('', ['c1', 'c4'])).length).toBe(1);
    expect(data.filter(getFilter('', ['c1', 'c2'])).length).toBe(0);
  });

  it('should filter by categories all = false', () => {
    expect(data.filter(getFilter('', ['c1'], false)).length).toBe(3);
    expect(data.filter(getFilter('', ['c1', 'c4'], false)).length).toBe(4);
    expect(data.filter(getFilter('', ['c3', 'c2'], false)).length).toBe(3);
  });

  it('should filter by categories all = false', () => {
    expect(data.filter(getFilter('', [], true, ['0', '102'])).length).toBe(4);
    expect(data.filter(getFilter('', [], true, ['102', '200'])).length).toBe(2);
    expect(data.filter(getFilter('', [], true, ['0', '0'])).length).toBe(6);
  });
});
