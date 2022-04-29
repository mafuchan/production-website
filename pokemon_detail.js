const main = document.querySelector("main")
const ul = document.querySelector("ul")
const spinner = document.querySelector(".spinner")

function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    const titleName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
    div.innerHTML = `
    <figure>
        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${titleName}" />
        <figcaption><a href="pokemon_detail.html?pokemon=${pokemon.name}">${titleName}</a></figcaption>
    </figure>
        `
    main.append(div)
    div.append(ul)
}

function addPokemonMoves(pokemon) {
    const titleName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
    const li = document.createElement('li')
    const flavor_text = (pokemon.flavor_text_entries)
        .find(flavor_text_entry => flavor_text_entry.language.name === 'en')
    li.innerHTML = `
        <span class = "move-name">"${titleName}"</span> 
        <span class="move-short-description">${flavor_text.flavor_text}</span>
        <br>
        `
    ul.append(li)
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(response => {
        addPokemonImage(response)
        const movesRequests = response.moves
            .map(response => response.move.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(movesRequests)
    }).then(responses => {
        spinner.classList.add("hidden")
        responses.forEach(response => {
            addPokemonMoves(response)
        })

    })

