const urlParams = new URLSearchParams(window.location.search);
//exemplo: urlParams.get('id'); //return 'valor de id como string'
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetail = document.getElementById('pokemonDetail')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="tag ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <a href="details.html?id=${pokemon.id}">Ver mais</a>
        
        </li>
    `
}

function convertPokemonToDetails(pokemon) {
    console.log(pokemon);
    return`
        <div class="detail-container">
            <div class="detail-header fire">
                <div class="detail-header__info">
                    <h3 class="sub-title">${pokemon.name}</h3>
                    <ol class="types">
                        <li class="tag fire type">Grass</li>
                        <li class="tag fire type">Poison</li>
                    </ol>
                    <div class="expert">
                        XP: <span class="badge">140</span>
                    </div>
                </div>
                <div class="detail-header__img">
                    <span class="number">#01</span>
                    <img src="${pokemon.photo}"
                        alt="bulbasaur">
                </div>
            </div>
            <div class="detail-description">
                <h4 class="sub-title">Habilidades:</h4>
                <ul>
                    ${pokemon.abilities.map((abilitie) => `<li>${abilitie}</li>`).join('')}
                </ul>
                <h4 class="sub-title">Movimento:</h4>
                <ul>
                    ${pokemon.moves.map((move) => `<li>${move}</li>`).join('')}
                </ul>
                <h4 class="sub-title">Estatística:</h4>
                <ul>
                    <li><span>Estatísticas básicas: 20</span> | <span>Esforço: 0</span></li>
                </ul>
            </div>
        </div>
    `
}

function loadPokemonItemById(id) {
    pokeApi.getPokemonById(id).then((pokemon) => {
        pokemonDetail.innerHTML = convertPokemonToDetails(pokemon)
    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

if(urlParams.get("id")) {
    loadPokemonItemById(urlParams.get("id"))
} else {
    loadPokemonItens(offset, limit)

    loadMoreButton.addEventListener('click', () => {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemonItens(offset, limit)
        }
    })
}

