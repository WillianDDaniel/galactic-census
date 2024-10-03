const searchInput = document.getElementById('search-input')
const suggestionsContainer = document.getElementById('suggestions-container')
const searchButton = document.getElementById('find-planet-btn')

function filterPlanets(query) {
  return planetsNames.filter(planet =>
    planet.toLowerCase().includes(query.toLowerCase())
  )
}

function showSuggestions(suggestions) {
  suggestionsContainer.innerHTML = ''

  if (suggestions.length === 0) {
    suggestionsContainer.style.display = 'none'
    return
  }

  suggestionsContainer.style.display = 'block'

  suggestions.forEach(sugestao => {
    const div = document.createElement('div')
    div.classList.add('suggestion')
    div.textContent = sugestao

    div.addEventListener('click', () => {
      searchInput.value = sugestao
      suggestionsContainer.style.display = 'none'
    })

    suggestionsContainer.appendChild(div)
  })
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value

  if (query.length === 0) {
    suggestionsContainer.style.display = 'none'
    return
  }

  const filteredSugestions = filterPlanets(query)
  showSuggestions(filteredSugestions)
})


searchButton.addEventListener('click', () => {
  let query = searchInput.value

  let filteredPlanet = planetsNames.find(
    planet => planet.toLowerCase().includes(query.toLowerCase())
  )

  const id = planetIds[filteredPlanet]

  if (!filteredPlanet) {
    return
  }

  if (query.length === 0) {
    return
  }

  if (filteredPlanet) {
    window.location.href = `./pages/index.html?planet=${id}&name=${filteredPlanet}`
  }
})