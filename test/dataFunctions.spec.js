import { getCombatEfficiency, computeStats, filterData, sortData, getFieldByPath } from '../src/dataFunctions.js';

describe('getCombatEfficiency', () => {
  it('calcula la eficiencia de combate correctamente', () => {
    const pokemon = {
      stats: {
        'base-attack': '100',
        'base-defense': '50',
      },
    };
    const result = getCombatEfficiency(pokemon);
    expect(result).toBe(150);
  });
});

describe('computeStats', () => {
  it('calcula las estadísticas correctamente', () => {
    const data = [
      {
        stats: {
          'base-attack': '100',
          'base-defense': '50',
        },
      },
      {
        stats: {
          'base-attack': '80',
          'base-defense': '40',
        },
      },
    ];
    const result = computeStats(data);
    expect(result).toEqual({
      combatEfficiency: 270,
      attackDefenseRatio: 4,
    });
  });
});

describe('filterData', () => {
  it('filtra los datos correctamente', () => {
    const data = [
      { type: 'fire' },
      { type: 'water' },
      { type: 'grass' },
    ];
    const result = filterData(data, 'type', 'fire');
    expect(result).toEqual([{ type: 'fire' }]);
  });
});

describe('sortData', () => {
  it('ordena los datos correctamente', () => {
    const data = [
      { name: 'Charmander', stats: { 'max-cp': '500' } },
      { name: 'Bulbasaur', stats: { 'max-cp': '400' } },
    ];
    const result = sortData(data, 'CP Máximo', 'asc');
    expect(result).toEqual([
      { name: 'Bulbasaur', stats: { 'max-cp': '400' } },
      { name: 'Charmander', stats: { 'max-cp': '500' } },
    ]);
  });
});

describe('getFieldByPath', () => {
  it('obtiene el campo correctamente', () => {
    const obj = { a: { b: { c: 'value' } } };
    const result = getFieldByPath(obj, 'a.b.c');
    expect(result).toBe('value');
  });

  it('maneja caminos incorrectos', () => {
    const obj = { a: { b: { c: 'value' } } };
    const result = getFieldByPath(obj, 'x.y.z');
    expect(result).toBe(null);
  });
});
