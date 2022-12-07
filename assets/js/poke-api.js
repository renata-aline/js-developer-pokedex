
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    
    pokemon.number = pokeDetail.id
    
    pokemon.id = pokeDetail.id
    
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    
    const [type] = types

    pokemon.types = types
    
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    pokemon.abilities = pokeDetail.abilities.map((item) => item.ability.name)

    pokemon.experience = pokeDetail.base_experience

    pokemon.moves = pokeDetail.moves.map((item) => item.move.name)

    pokemon.stats = pokeDetail.stats.map((item) => ({base_stat: item.base_stat, effort: item.effort}))

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonById = (id = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}