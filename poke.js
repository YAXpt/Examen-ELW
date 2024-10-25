const pokeURL = 'https://pokeapi.co/api/v2'
let pokemons = [];

window.onload = async () => {
    pokemons = await getAllPokemons();
    let element = document.getElementById('pokemons');
    for (let poke of pokemons) {
        const newElement = document.createElement('ul');
        newElement.innerHTML = `
        <li onclick="showInfo('${poke.url}, ${poke.name}')">${poke.name}</li>
        <div id="${poke.name}"></div>
        <button onclick="addToTeam('${poke.name}')">Afegir al equip</button>`
        element.appendChild(newElement);
    }
}

async function getAllPokemons() {
    const resposta = await fetch(`${pokeURL}/pokemon/?limit=151`);
    const respostaJSON = await resposta.json();
    return respostaJSON.results;
}


async function showSearchResults(event, formulari) {
    event.preventDefault();

    const formulariElement = formulari.elements;
    const searchFormulariElement = formulariElement.search;
    const pokemonName = searchFormulariElement.value;
    searchFormulariElement.value = '';

    const pokemon = await searchPokemon(pokemonName);
    const pokeInfo = document.getElementById('poke-resultado');
    pokeInfo.innerHTML = '';

    if (!pokemon) {
        pokeInfo.innerHTML = `<li>No s'ha trobat el pokemon</li>`;
        return;
    }
    console.log(`${poke.name}-search`);
    pokeInfo.innerHTML = `<li onclick="showInfo('${poke.url}', '${poke.name}-search')">${poke.name}</li>
    <div id="${poke.name}-search"></div>
    <button onclick="addToTeam('${poke.name}')">Afegir al equip</button>`;
}


async function searchPokemon(pokemonName) {  //con la busqueda manual
    //dos bucles para priorice el nombre exacto (ej. mew / mewtwo)
    for (poke of pokemons) { //busca por nombre exacto
        if (poke.name === pokemonName.toLowerCase()) {
            return poke;
        }
    }
    for (poke of pokemons) { //si no encuentra el nombre exacto busca por nombre que contenga la palabra
        if (poke.name.includes(pokemonName.toLowerCase())) {
            return poke;
        }
    }
    return null;
}

async function showInfo(infoURL, id) {
    console.log(id);
    console.log(infoURL);
    //arreglar imagen
    const infoPokemon = await getInfo(infoURL);
    const element = document.getElementById(id);
    //const img = await fetch(infoPokemon.sprites.front_default);
    if (!document.getElementById(id)) {
        const newElement = document.createElement('ul');
        newElement.id = id;
        newElement.innerHTML = `
        <li>Nom: ${infoPokemon.name}</li>
        <li>Numero de Pokedex: ${infoPokemon.id}</li>
        <img src="${img}" alt="Imagen de ${infoPokemon.name}">
        <li>Tipus:`;

        for (let tipus of infoPokemon.types) {
            newElement.innerHTML += `${tipus.type.name} `;
        }
        newElement.innerHTML += `</li>`;
        newElement.innerHTML += `<button onclick="unshowInfo('${id}')">Amaga la informació</button>`;

        element.appendChild(newElement);
    }
}

async function getInfo(infoURL) {
    const infoPokemon = await fetch(infoURL);
    const infoPokemonJSON = await infoPokemon.json();
    console.table(infoPokemonJSON);
    return infoPokemonJSON;
}

function unshowInfo(infoID) {
    console.log(infoID);
    const element = document.getElementById(infoID);
    element.remove();
}


function addToTeam(pokeName) {
    const element = document.getElementById('equip');
    console.log(element.childElementCount);
    if (element.childElementCount >= 6) {
        alert('Ja tens 6 pokemons a l\'equip!');
        return;
    }
    const newElement = document.createElement('li');
    if (document.getElementById(`${pokeName}-equip`)) {
        alert('Ja has afegit aquest pokemon al teu equip!');
        return;
    }
    newElement.id = `${pokeName}-equip`;
    newElement.onclick = `removeFromTeam(pokeName)`;
    newElement.innerHTML = `${pokeName} <button onclick="removeFromTeam('${pokeName}-equip')">Treure de l'equip</button>`;
    element.appendChild(newElement);
}

function removeFromTeam(pokeIDequip) {
    const element = document.getElementById(pokeIDequip);
    element.remove();
}
