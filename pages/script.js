addEventListener('load', async () => {
    const id = new URLSearchParams(window.location.search).get('planet')
    const name = new URLSearchParams(window.location.search).get('name')

    document.getElementById('page-title').innerHTML = `Planeta ${name} | Censo Galáctico`

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


async function renderPlanetInfo(planet) {

    document.getElementById('planet-name').innerHTML = `Planeta ${planet.name}`

    const [climate, terrain] = await translateText([planet.climate, planet.terrain])

    const population = planet.population !== 'unknown' ? planet.population : "desconhecido"

    document.getElementById('loading-gif').style.display = 'none'

    document.getElementById('climate').innerHTML = `<b>Clima</b>: ${climate}`
    document.getElementById('terrain').innerHTML = `<b>Terreno</b>: ${terrain}`
    document.getElementById('population').innerHTML = `<b>População</b>: ${population}`
}

async function translateText(texts) {
    const url = 'https://words-translate-willian-daniel.netlify.app/translate';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texts: texts, target: 'pt' })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Translation error: ' + errorData.message)
    }

    const data = await response.json()
    return data.translatedTexts
}

function initializeHeaderLink() {
    const headerLink = document.getElementById('header-link')
    const backButton = document.getElementById('back-button')

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    headerLink.addEventListener('click', () => {

        if (isLocalhost) {
            window.location.href = '/'
        } else {
            window.location.href = '/galactic-census/'
        }
    })

    if (isLocalhost) {
        backButton.href = '/#planets'
    } else {
        backButton.href = '/galactic-census/#planets'
    }
}

initializeHeaderLink()
