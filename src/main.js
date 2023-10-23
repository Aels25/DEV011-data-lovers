// Importar las funciones renombradas, main.js 
import { filterData, sortData } from './dataFunctions.js';
import { renderItems } from './view.js';
import data from './data/pokemon/pokemon.js';

document.addEventListener('DOMContentLoaded', () => {
  const openPokemonButton = document.querySelector('#openPokemonButton');
  const cardsContainer = document.querySelector('.pokemon-cards-container');
  const optionsContainer = document.querySelector('#opciones');
  const ordenadoContainer = document.querySelector('#ordenado');
  const clearButton = document.querySelector('#clearButton');
  const ordenarPorSelect = document.querySelector('#ordenarPor');
  const ordenSelect = document.querySelector('#orden');

  let filteredPokemon = [];

  openPokemonButton.addEventListener('click', (event) => {
    const selectedType = document.querySelector('#tipo').value;
    const selectedGeneration = document.querySelector('#generacion').value;
    const selectedRarity = document.querySelector('#rareza').value;

    // Utilizar las funciones corregidas
    filteredPokemon = filterData(data.pokemon, 'type', selectedType);
    filteredPokemon = filterData(filteredPokemon, 'generation.name', selectedGeneration);
    filteredPokemon = filterData(filteredPokemon, 'pokemon-rarity', selectedRarity);
    filteredPokemon.sort((a, b) => parseInt(a.num) - parseInt(b.num));

    // Utilizar la nueva función renderItems para renderizar las tarjetas
    cardsContainer.innerHTML = ''; // Limpiar el contenedor
    cardsContainer.appendChild(renderItems(filteredPokemon));

    ordenadoContainer.style.display = 'block';
    hideElements();
    cardsContainer.style.display = 'flex';

    clearButton.style.display = filteredPokemon.length > 0 ? 'block' : 'none';

  });

  ordenarPorSelect.addEventListener('change', aplicarOrden);
  ordenSelect.addEventListener('change', aplicarOrden);

  function aplicarOrden() {
    const orderBy = ordenarPorSelect.value;
    const sortOrder = ordenSelect.value;

    if (filteredPokemon.length > 0) {
      // Utilizar la función corregida
      filteredPokemon = sortData(filteredPokemon, orderBy, sortOrder);

      // Utilizar la nueva función renderItems para renderizar las tarjetas
      cardsContainer.innerHTML = ''; // Limpiar el contenedor
      cardsContainer.appendChild(renderItems(filteredPokemon));
    }
  }

  clearButton.addEventListener('click', () => {
    showElements();
    cardsContainer.style.display = 'none';
    ordenadoContainer.style.display = 'none';
    clearButton.style.display = 'none';
  });

  // Función para ocultar elementos no necesarios
  function hideElements() {
    document.querySelector('.buttons.left').style.display = 'none';
    document.querySelector('.buttons.right').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.pokemon-image').style.display = 'none';
    document.getElementById('openPokemonButton').style.display = 'none';
    document.getElementById('discoverHeading').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('opciones').style.display = 'none';
    document.getElementById('clearButton').style.display = 'none';
  }

  // Función para mostrar elementos principales
  function showElements() {
    optionsContainer.style.display = 'block';
    document.querySelector('.buttons.left').style.display = 'flex';
    document.querySelector('.buttons.right').style.display = 'flex';
    document.querySelector('header').style.display = 'block';
    document.querySelector('.pokemon-image').style.display = 'block';
    document.getElementById('openPokemonButton').style.display = 'block';
    document.getElementById('discoverHeading').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
  }
});
// Otras funciones del archivo...
