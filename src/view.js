// view.js

export const renderItems = (pokemonList, rootElement) => {
  console.log("Renderización iniciada");

  const container = document.createElement('div');
  container.classList.add('pokemon-container');

  pokemonList.forEach(pokemon => {
      const card = document.createElement('div');
      card.classList.add('pokemon-card');

      card.innerHTML = `
          <h3>Número de la Pokédex: ${pokemon.num}</h3>
          <h3>Nombre: ${pokemon.name}</h3>
          <p>Generación: ${pokemon.generation.name}</p>
          <p>Descripción: ${pokemon.about}</p>
          <!-- Agrega el resto de los datos del Pokémon aquí -->
      `;

      container.appendChild(card);
  });

  rootElement.innerHTML = ''; // Limpia el contenido anterior en el elemento root
  rootElement.appendChild(container);

  console.log("Renderización completada");
};
