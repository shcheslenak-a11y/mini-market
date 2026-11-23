import { describe, expect, it } from 'vitest';
import { getFilter } from './getData';

const data = [
  { name: 'abc', categories: ['c1'] },
  { name: 'c', categories: ['c2'] },
  { name: 'de', categories: ['c3'] },
  { name: '1', categories: ['c4'] },
  { name: '12', categories: ['c1', 'c4'] },
  { name: '13', categories: ['c1', 'c3'] },
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
});
