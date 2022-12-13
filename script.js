const populationButton=document.getElementById('population');
const languageButton =document.getElementById('language');
const container=document.getElementById('container');
const languageContainer=document.getElementById('languageContainer')
populationButton.addEventListener('click',function(){
    const contryVsPopulation = sortedPopulationData();
    const totalPopulation=getTotalPoplation();
    let html='';
    for(let i=0;i<contryVsPopulation.length;i++){
        html += `<div class="country">
    <p class="countryName">${contryVsPopulation[i].name}</p>
    <div class="populationContainer">
    <div class="population" style="width: ${(contryVsPopulation[i].population / totalPopulation) * 100}%"></div>
   </div>
    <p class="populationNumbers">${contryVsPopulation[i].population}</p>
</div>`
    }
    container.innerHTML=html;
    container.style.display='block';
    languageContainer.style.display='none'
})
languageButton.addEventListener('click',function(){
    container.style.display='none';
    languageContainer.style.display='block'
    const languageVsNumberOfCountries = sortedLanguageVsNumberOfCountriesData()
    console.log(languageVsNumberOfCountries)
    let html = ''
    for (let language in languageVsNumberOfCountries) {
        html += `<div class="analytics-row">
        <span class="first_column">${language}</span>
        <div class="bar_container">
          <div class="bar" style="width: ${(languageVsNumberOfCountries[language] / countries_data.length) * 100}%"></div>
        </div>
        <span>${languageVsNumberOfCountries[language]}</span>
      </div>`
    }
    languageContainer.innerHTML = html


})
function sortedPopulationData() {
    const countriesDataCopy = [...countries_data]
    return countriesDataCopy.sort((a, b) => {
        return b.population - a.population
    }).slice(0, 10).map((country) => {
        return {
            name: country.name,
            population: country.population
        }
    })
}

function getTotalPoplation() {
    return countries_data.reduce((start, country) => {
        return start + country.population
    }, 0)
}
function sortedLanguageVsNumberOfCountriesData() {
    const languagesVsNumberOfCountries = {}

    for (let i = 0; i < countries_data.length; i++) {
        const country = countries_data[i]
        const languages = country.languages
        for (let j = 0; j < languages.length; j++) {
            const language = languages[j]
            if (languagesVsNumberOfCountries[language]) {
                languagesVsNumberOfCountries[language] += 1
            } else {
                languagesVsNumberOfCountries[language] = 1
            }
        }
    }
    const newLanguagesVsNumberOfCountries = {}
    const languages = Object.keys(languagesVsNumberOfCountries);
    const numberOfCountries = Object.values(languagesVsNumberOfCountries);
    for (let i = 0; i < 10; i++) {
        let maxIndex = 0
        for (let j = 0; j < numberOfCountries.length; j++) {
            if (numberOfCountries[j] && numberOfCountries[j] >= numberOfCountries[maxIndex]) {
                maxIndex = j
            }
        }
        newLanguagesVsNumberOfCountries[languages[maxIndex]] = numberOfCountries[maxIndex]
        numberOfCountries[maxIndex] = undefined
    }
    return newLanguagesVsNumberOfCountries
}