//CALCULA LA EFICIENCIA DE COMBATE  ataque + defensa
export function getCombatEfficiency(pokemon) {
  const attack = parseInt(pokemon.stats['base-attack']);
  const defense = parseInt(pokemon.stats['base-defense']);
  return attack + defense;
}


export function computeStats(data) {
  // Calcular la eficiencia de combate y relación ataque/defensa
  const combatEfficiency = data.map(getCombatEfficiency).reduce((total, value) => total + value, 0);
  const attackDefenseRatio = data.map(pokemon => {
    const attack = parseInt(pokemon.stats['base-attack']);
    const defense = parseInt(pokemon.stats['base-defense']);
    return attack / defense;
  }).reduce((total, value) => total + value, 0);

  // Retornar un objeto con los resultados
  return {
    combatEfficiency,
    attackDefenseRatio,
  };
}

export function filterData(data, filterBy, value) {
  return data.filter(item => {
    const itemValue = getFieldByPath(item, filterBy);
    const lowerCaseItemValue = itemValue && itemValue.toString().toLowerCase();
    return value === 'todos' || (lowerCaseItemValue && lowerCaseItemValue === value.toLowerCase());
  });
}

export function sortData(data, sortBy, sortOrder) {
  const categoriasDeRareza = ["normal", "raro", "legendario"];

  const getCombatEfficiency = pokemon => parseInt(pokemon.stats['base-attack']) + parseInt(pokemon.stats['base-defense']);
// sortBy  criterio por el cual deseas ordenar los datos. 
  return data.sort((a, b) => {
    switch (sortBy) {
    case 'CP Máximo': {
      return sortOrder === 'asc' ? parseInt(a.stats['max-cp']) - parseInt(b.stats['max-cp']) : parseInt(b.stats['max-cp']) - parseInt(a.stats['max-cp']);
    }
    case 'Índice de Rareza': {
      const rarezaA = categoriasDeRareza.indexOf(a['pokemon-rarity'].toLowerCase());
      const rarezaB = categoriasDeRareza.indexOf(b['pokemon-rarity'].toLowerCase());
      return sortOrder === 'asc' ? rarezaA - rarezaB: rarezaB - rarezaA;
    }
    case 'Probabilidad de Captura': {
      return sortOrder === 'asc' ? parseFloat(a.encounter['base-capture-rate']) - parseFloat(b.encounter['base-capture-rate']) : parseFloat(b.encounter['base-capture-rate']) - parseFloat(a.encounter['base-capture-rate']);
    }
    case 'Distancia de Evolución': {
      const distanceA = parseInt(a['buddy-distance-km']);
      const distanceB = parseInt(b['buddy-distance-km']);
      return sortOrder === 'asc' ? distanceA - distanceB : distanceB - distanceA;
    }
    case 'Eficiencia de Combate': {
      const efficiencyA = [a].map(getCombatEfficiency).reduce((total, value) => total + value, 0);
      const efficiencyB = [b].map(getCombatEfficiency).reduce((total, value) => total + value, 0);
      return sortOrder === 'asc' ? efficiencyA - efficiencyB : efficiencyB - efficiencyA;
    }
    case 'Relación Ataque/Defensa': {
      const attackDefenseRatioA = parseInt(a.stats['base-attack']) / parseInt(a.stats['base-defense']);
      const attackDefenseRatioB = parseInt(b.stats['base-attack']) / parseInt(b.stats['base-defense']);
      return sortOrder === 'asc' ? attackDefenseRatioA - attackDefenseRatioB : attackDefenseRatioB - attackDefenseRatioA;
    }
    default: {
      return 0;
    }
    }
  });
}

export function getFieldByPath(obj, path) {
  const filterBys = path.split('.');
  return filterBys.reduce((acc, filterBy) => (acc && acc[filterBy]) ? acc[filterBy] : null, obj);
}
