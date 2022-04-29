const url = "https://pokeapi.co/api/v2/pokemon?limit=2&offset=53"
const main = document.querySelector("main")
const spinner = document.querySelector(".spinner")

function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    const titleName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
    div.innerHTML = `
    <figure>
        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" />
        <figcaption><a href="pokemon_detail.html?pokemon=${pokemon.name}">${titleName}</a></figcaption>
    </figure>
    `
    main.append(div)
}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        responses.forEach(response => {
            spinner.classList.add("hidden")
            addPokemonImage(response)
        })
    })