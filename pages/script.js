addEventListener('load', async () => {
    const id = new URLSearchParams(window.location.search).get('planet')
    const name = new URLSearchParams(window.location.search).get('name')

    document.getElementById('page-title').innerHTML = `Planeta ${name} | Censo Galáctico`

    if (!id || !name) {
        window.location.href = '/#planets'
    }

    const planet = getLocalPlanet(name) || await getPlanet(id)

    renderPlanetInfo(planet)
    findResidents(planet.residents)
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

function findResidents(residentsUrls) {

    if (residentsUrls.length === 0) {
        const residentsContainer = document.getElementById('residents-container')

        residentsContainer.innerHTML += '<p>Nenhum cidadão famoso para monstrar</p>'

        return
    }

    document.getElementById('table-legend').style.display = 'flex'

    renderTable(residentsUrls)
}

function renderTable(residentsUrls) {
    const tableBody = document.getElementById('residents-table-body')

    residentsUrls.forEach(async (residentUrl) => {

        const resident = await getResident(residentUrl)

        const row = document.createElement('tr')

        const nameCell = document.createElement('td')
        nameCell.textContent = resident.name

        const birth = resident.birth_year !== 'unknown' ? resident.birth_year : 'Desconhecido'
        const birthYearCell = document.createElement('td')
        birthYearCell.textContent = birth

        row.appendChild(nameCell);
        row.appendChild(birthYearCell)

        tableBody.appendChild(row)
    })

    document.getElementById('residents-table').style.display = 'block'
}

async function getResident(url) {
    const resident = await fetch(url)

    if (!resident.ok) {
        throw new Error('Resident not found')
    }

    const data = await resident.json()
    return data
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

    backButton.addEventListener('click', () => {

        backButton.removeAttribute('href')

        if (isLocalhost) {
            window.location.href = '/#planets'
        } else {
            window.location.href = '/galactic-census/#planets'
        }
    })
}

initializeHeaderLink()
