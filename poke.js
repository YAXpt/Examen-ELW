const pokeURL = 'https://pokeapi.co/api/v2'

window.onload = async () => {
    const pokemons = await getAllPokemons();
    console.table(dataPoke);
    let element = document.getElementById('pokemons');
    for (let poke of pokemons) {
        const newElement = document.createElement('ul');
        newElement.innerHTML = `
        <li>${poke.name}</li>
        <button onclick="addToTeam('${Poke.url}')">Afegir al equip</button>`

        element.appendChild(newElement);
    }
}

async function getAllPokemons() {
    const resposta = await fetch(`${pokeURL}/pokemon/?limit=151`);
    const respostaJSON = await resposta.json();
    return respostaJSON.results;
}