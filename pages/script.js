addEventListener('load', async () => {
    const id = new URLSearchParams(window.location.search).get('planet')
    const name = new URLSearchParams(window.location.search).get('name')

    if (!id || !name) {
        window.location.href = '/#planets'
    }

    const planet = getLocalPlanet(name) || await getPlanet(id)

    renderPlanetInfo(planet)
})


async function getPlanet(id) {
    const url = `https://swapi.dev/api/planets/${id}/?format=json`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function getLocalPlanet(planetName) {

    const localPlanets = JSON.parse(localStorage.getItem('planets'))

    return localPlanets.find(planet => planet.name === planetName)
}


function renderPlanetInfo(planet) {

    document.getElementById('planet-name').innerHTML = `Planeta ${planet.name}`

    document.getElementById('climate').innerHTML = `<b>Clima</b>: ${planet.climate}`
    document.getElementById('terrain').innerHTML = `<b>Terreno</b>: ${planet.terrain}`
    document.getElementById('population').innerHTML = `<b>População</b>: ${planet.population}`
}