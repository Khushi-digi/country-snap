const btn = document.querySelector('.input_box button');
const input = document.querySelector('input');
const boxes = document.querySelector('.container #box');

btn.addEventListener("click", () => {
    const input_value = input.value.trim(); // Trim whitespace from input

    if (!input_value) {
        alert("Please enter a country name.");
        return;
    }

    fetchData(input_value)
 
});

let fetchData=(input_value)=>{
    const url = `https://restcountries.com/v3.1/name/${input_value}?fullText=true`;
    input.value = ""; // Clear input field

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                const countryData = data[0];
                console.log(countryData)

                // Extracting languages
                const languagesArr = Object.values(countryData.languages);
                if (languagesArr.length > 3) {
                    languagesArr = languagesArr.slice(0, 3);
                }
                // Extracting currencies
                const currenciesArr = Object.keys(countryData.currencies).map(currencyCode => countryData.currencies[currencyCode].name);
                if (currenciesArr.length > 3) {
                    currenciesArr = currenciesArr.slice(0, 3);
                }
                // Constructing HTML
                const html = `
                <div class="country-dets">
                <div class="left">
                    <h1>${countryData.name.common}</h1>
                    <img src="${countryData.flags.svg}" alt="">
                    
                    <button class="mapBtn"><a href="https://www.google.com/maps/search/${countryData.name.common}">Map</a></button>
                </div>
                <div class="right">
                <table border="1">
                <tr>
                  <td><b>Capital:</b></td>
                  <td>${countryData.capital[0]}</td>
                </tr>
                <tr>
                  <td><b>Continents:</b></td>
                  <td>${countryData.continents[0]}</td>
                </tr>
                <tr>
                  <td><b>Population:</b></td>
                  <td>${countryData.population}</td>
                </tr>
                <tr>
                  <td><b>Currency:</b></td>
                  <td>${currenciesArr}</td>
                </tr>
                <tr>
                  <td><b>Languages:</b></td>
                  <td>${languagesArr}</td>
                </tr>
                <tr>
                  <td><b>Another Name:</b></td>
                  <td>${countryData.altSpellings[1]==undefined?"-":countryData.altSpellings[1]}</td>
                </tr>
              </table>
              
                    <a class="more" href="https://en.wikipedia.org/wiki/${countryData.name.common}">more...</a>
                </div>
                <div class="ctarms">
                <h3>Coat Of Arms</h3>
                <img class="coatOfArms" src="${countryData.coatOfArms.png}"/>
            </div>
            </div>
                `;
                boxes.innerHTML = html;
            } else {
                alert("No data found for the entered country.");
            }
        })
        .catch(error => {
            console.error("Error:", error.message);
            alert("Error fetching data. Please try again later.");
        });
}

window.onload=()=>{
   let myc="India"
    fetchData(myc);
}