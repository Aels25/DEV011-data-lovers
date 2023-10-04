import data from './data/pokemon/pokemon.js';

document.addEventListener('DOMContentLoaded', () => {
    const openPokemonButton = document.getElementById('openPokemonButton');
    const cardsContainer = document.querySelector('.pokemon-cards-container');
    const optionsContainer = document.getElementById('opciones');

    openPokemonButton.addEventListener('click', () => {
        optionsContainer.style.display = 'none';

        document.querySelector('.buttons.left').style.display = 'none';
        document.querySelector('.buttons.right').style.display = 'none';
        document.getElementById('welcomeHeader').style.display = 'none';
        document.querySelector('.pokemon-image').style.display = 'none';
        document.getElementById('openPokemonButton').style.display = 'none';
        document.getElementById('discoverHeading').style.display = 'none';
        document.getElementById('footer').style.display = 'none';
        cardsContainer.style.display = 'flex';

        const selectedType = document.getElementById('tipo').value;
        const selectedGeneration = document.getElementById('generacion').value;
        const selectedRarity = document.getElementById('rareza').value;

        console.log('Selected Type:', selectedType);
        console.log('Selected Generation:', selectedGeneration);
        console.log('Selected Rarity:', selectedRarity);

        const filteredPokemon = filterPokemon(data.pokemon, selectedType, selectedGeneration, selectedRarity);
        console.log('Filtered Pokemon:', filteredPokemon);

        renderPokemonCards(filteredPokemon, cardsContainer);
    });
});

function filterPokemon(pokemonList, type, generation, rarity) {
    return pokemonList.filter(pokemon => {
        const typeMatch = type === 'todos' || pokemon.type.some(t => type.includes(t.toLowerCase()));
        const generationMatch = generation === 'todos' || pokemon.generation.name.toLowerCase() === generation.toLowerCase();
        const rarityMatch = rarity === 'todos' || pokemon['pokemon-rarity'].toLowerCase() === rarity.toLowerCase();

        console.log("Pokemon:", pokemon.name, "Tipo:", pokemon.type, "Generación:", pokemon.generation.name, "Rareza:", pokemon['pokemon-rarity']);
        console.log("Type Match:", typeMatch, "Generation Match:", generationMatch, "Rarity Match:", rarityMatch);

        return typeMatch && generationMatch && rarityMatch;
    });
}


function renderPokemonCards(pokemonList, container) {
    container.innerHTML = '';

    pokemonList.forEach((pokemon) => {
        renderPokemonCard(pokemon, container);
    });
}

function renderPokemonCard(pokemon, container) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

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
        </div>
    `;

    container.appendChild(card);

    const descriptionButton = card.querySelector('.description-button');
    const description = card.querySelector('.description');

    descriptionButton.addEventListener('click', () => {
        if (description.style.display === 'none' || description.style.display === '') {
            description.style.display = 'block';
        } else {
            description.style.display = 'none';
        }
    });
}
