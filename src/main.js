// Importa los datos de Pokémon desde el archivo correspondiente (data/pokemon/pokemon.js).
import data from './data/pokemon/pokemon.js';

document.addEventListener('DOMContentLoaded', () => {
    const openPokemonButton = document.getElementById('openPokemonButton');
    const cardsContainer = document.querySelector('.pokemon-cards-container');

    openPokemonButton.addEventListener('click', () => {
        // Oculta los elementos que deseas ocultar
        document.querySelector('.buttons.left').style.display = 'none';
        document.querySelector('.buttons.right').style.display = 'none';
        document.getElementById('welcomeHeader').style.display = 'none';
        document.querySelector('.pokemon-image').style.display = 'none';
        document.getElementById('openPokemonButton').style.display = 'none';
        document.getElementById('discoverHeading').style.display = 'none';
        document.getElementById('footer').style.display = 'none';


        

    
        // Muestra el contenedor de cartas
        cardsContainer.style.display = 'flex';
    
        // Muestra las cartas de Pokémon en 4 columnas
        renderPokemonCards(data.pokemon, cardsContainer, 4);
    });
    
    
    
    
    
});

// Agrega una función para renderizar las cartas de Pokémon en una sola columna
function renderPokemonCards(pokemonList, container) {
    container.innerHTML = ''; // Limpia el contenido anterior

    pokemonList.forEach((pokemon) => {
        renderPokemonCard(pokemon, container);
    });
}

// Agrega una función para renderizar una carta de Pokémon
function renderPokemonCard(pokemon, container) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    // Agrega aquí el contenido de la carta de Pokémon, incluido el botón de "Ver Descripción"
    card.innerHTML = `
        <h3>Número de la Pokédex: ${pokemon.num}</h3>
        <img src="${pokemon.img}" alt="${pokemon.name}">
        <h3>Nombre: ${pokemon.name}</h3>
        <button class="description-button">Ver Descripción</button>
        <div class="description" style="display: none;">
            <p>Generación: ${pokemon.generation.name}</p>
            <p>Descripción: ${pokemon.about}</p>
            <p>Tamaño: ${pokemon.size.height} / ${pokemon.size.weight}</p>
            <p>Rareza: ${pokemon['pokemon-rarity']}</p>
            <p>Tipo: ${pokemon.type.join(', ')}</p>
            <p>Probabilidad de Aparición: ${pokemon['spawn-chance']}</p>
            <p>Resistencias: ${pokemon.resistant.join(', ')}</p>
            <p>Debilidades: ${pokemon.weaknesses.join(', ')}</p>
            <p>Movimientos Rápidos: ${pokemon['quick-move'].map(move => move.name).join(', ')}</p>
            <p>Ataques Especiales: ${pokemon['special-attack'].map(attack => attack.name).join(', ')}</p>
            <p>Huevo: ${pokemon.egg}</p>
            <p>Distancia de Compañero: ${pokemon['buddy-distance-km']} km</p>
            <p>Evolución: ${pokemon.evolution ? `Candy: ${pokemon.evolution.candy}` : 'No evoluciona'}</p>
        </div>
    `;

    container.appendChild(card);

    // Agrega un evento de clic al botón de "Ver Descripción" para mostrar/ocultar la descripción
    const descriptionButton = card.querySelector('.description-button');
    const description = card.querySelector('.description');

    descriptionButton.addEventListener('click', () => {
        if (description.style.display === 'none' || description.style.display === '') {
            description.style.display = 'block'; // Muestra la descripción
        } else {
            description.style.display = 'none'; // Oculta la descripción
        }
    });
}