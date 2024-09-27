addEventListener('load', async () => {
    const url = 'https://swapi.dev/api/planets/?format=json'
    const planets  = []

    async function getPlanets(url) {
        const response = await fetch(url)

        const data = await response.json()

        if (data.next) {
            url = data.next
            await getPlanets(url)
        }

        planets.push(...data.results)
    }

    await getPlanets(url)

    planets.forEach(planet => {
        console.log(planet.name)
    })

})