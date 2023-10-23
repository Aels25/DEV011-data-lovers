import { computeStats } from './dataFunctions.js';

export function renderItems(data) {
  // Calcular estadísticas utilizando computeStats
  const stats = computeStats(data);

  // Crear un elemento de lista
  const listElement = document.createElement('ul');

  // Iterar sobre los datos y agregar tarjetas de Pokémon a la lista
  data.forEach((pokemon) => {
    const card = renderPokemonCard(pokemon, stats.combatEfficiency, stats.attackDefenseRatio);
    listElement.appendChild(card);
  });

  // Retornar el elemento de lista completo
  return listElement;
}

export function renderPokemonCard(pokemon, combatEfficiency, attackDefenseRatio) {
  const card = document.createElement('li'); // Cambio a <li>
  card.classList.add('pokemon-card');

  // Cambios en la estructura para cumplir con los requisitos de microdatos
  card.innerHTML = `
    <div itemscope itemtype="http://schema.org/ItemList">
      <h3 itemprop="name">${pokemon.name}</h3>
      <img src="${pokemon.img}" alt="${pokemon.name}" itemprop="image">
      <dl>
        <dt>Número de la Pokédex:</dt><dd itemprop="num">${parseInt(pokemon.num, 10)}</dd>
        <dt>Rareza:</dt><dd itemprop="pokemon-rarity">${pokemon['pokemon-rarity']}</dd>
        <dt>Generación:</dt><dd itemprop="generation">${pokemon.generation.name}</dd>
        <dt>Tipo:</dt><dd itemprop="type">${pokemon.type.join(', ')}</dd>
        <dt>Probabilidad de Aparición:</dt><dd itemprop="spawn-chance">${pokemon['spawn-chance']}</dd>
        <dt>Relación Ataque/Defensa:</dt><dd itemprop="attack-defense-ratio">${attackDefenseRatio}</dd>
        <dt>Eficiencia de Combate:</dt><dd itemprop="combat-efficiency">${combatEfficiency}</dd>
      </dl>
      <button class="description-button">Ver Descripción</button>
      <div class="description" style="display: none;">
        <p>Descripción: ${pokemon.about}</p>
      </div>
    </div>
  `;

  const descriptionButton = card.querySelector('.description-button');
  const description = card.querySelector('.description');

  descriptionButton.addEventListener('click', () => {
    if (description.style.display === 'none' || description.style.display === '') {
      description.style.display = 'block';
    } else {
      description.style.display = 'none';
    }
  });

  // Retornar la tarjeta de Pokémon
  return card;
}
