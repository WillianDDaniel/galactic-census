addEventListener('load', async () => {
    localPlanets = JSON.parse(localStorage.getItem('planets'))

    const planets = localPlanets || await getPlanets()

    planets.forEach(planet => {
        console.log(planet.name)
    })

    renderPlanetButtons(planets)

})


async function getPlanets() {
    const url = 'https://swapi.dev/api/planets/?format=json'
    const planets = []

    const response = await fetch(url)
    const initialData = await response.json()

    planets.push(...initialData.results)

    let nextUrl = initialData.next

    while (nextUrl) {
        const response = await fetch(nextUrl)
        const data = await response.json()
        planets.push(...data.results)

        nextUrl = data.next
    }

    localStorage.setItem('planets', JSON.stringify(planets))

    return planets
}

function renderPlanetButtons(planets) {
    const container = document.getElementById('planets-buttons')

    planets.forEach(planet => {
        const button = document.createElement('button')

        button.innerText = planet.name

        const id = planet.url.split('/').filter(Number).pop()

        button.addEventListener('click', () => {
            window.location.href = `./pages/index.html?planet=${id}&name=${planet.name}`
        })

        container.appendChild(button)
    })
}

