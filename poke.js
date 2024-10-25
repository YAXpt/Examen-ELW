const pokeURL = 'https://pokeapi.co/api/v2'

window.onload = async () => {
    const pokemons = await getAllPokemons();
    let element = document.getElementById('pokemons');
    for (let poke of pokemons) {
        const newElement = document.createElement('ul');
        newElement.innerHTML = `
        <li onclick="showInfo('${poke.url}')" id=${poke.name}>${poke.name}</li>
        <button onclick="addToTeam('${poke.name}')">Afegir al equip</button>`
        element.appendChild(newElement);
    }
}

async function getAllPokemons() {
    const resposta = await fetch(`${pokeURL}/pokemon/?limit=151`);
    const respostaJSON = await resposta.json();
    return respostaJSON.results;
}

async function showInfo(infoURL){
//arreglar imagen
console.log(infoURL);
const infoPokemon = await getInfo(infoURL);
const element = document.getElementById(infoPokemon.name);
const img = await fetch(infoPokemon.sprites.front_default);
    const newElement = document.createElement('ul');
    newElement.id = `${infoPokemon.name}-info`;
    newElement.innerHTML = `
        <li>Nom: ${infoPokemon.name}</li>
        <li>Numero de Pokedex: ${infoPokemon.id}</li>
        <img src="${img}" alt="Imagen de ${infoPokemon.name}">
        <li>Tipus:`;

    for (let tipus of infoPokemon.types) {
        newElement.innerHTML += `${tipus.type.name} `;
    }
    newElement.innerHTML += `</li>`;
    newElement.innerHTML += `<button onclick="unshowInfo('${infoPokemon}-info')">Amaga la informació</button>`;

    element.appendChild(newElement);
}

async function getInfo(infoURL){
    const infoPokemon = await fetch(infoURL);
    const infoPokemonJSON = await infoPokemon.json();
    return infoPokemonJSON;
}

function addToTeam(pokeName){
const element = document.getElementById('equip');
const newElement = document.createElement('ul');
if (document.getElementById)

}