addEventListener('load', async () => {
    let planets = []
    localPlanets = JSON.parse(localStorage.getItem('planets'))

    if (localPlanets) {
        planets.push(...localPlanets)
    } else {
        planets = await getPlanets()
        localStorage.setItem('planets', JSON.stringify(planets))
    }

    planets.forEach(planet => {
        console.log(planet.name)
    })

    renderPlanetButtons(planets)

})


async function getPlanets() {
    const url = 'https://swapi.dev/api/planets/?format=json'
    const planets = []

    const response = await fetch(url)
    const data = await response.json()

    planets.push(...data.results)

    while (data.next) {
        const response = await fetch(data.next)
        const data = await response.json()
        planets.push(...data.results)
    }

    return planets
}

function renderPlanetButtons(planets) {
    const container = document.getElementById('planets-buttons')

    planets.forEach(planet => {
        const button = document.createElement('button')

        button.innerText = planet.name

        container.appendChild(button)
    })
}

