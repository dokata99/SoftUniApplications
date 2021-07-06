function attachEvents() {
    let locationSubmitButton = document.querySelector('#submit')

    locationSubmitButton.addEventListener('click', weatherHandler)

    let conditions = {
        Sunny: () => '☀',
        "Partly sunny": () => '⛅',
        Overcast: () => '☁',
        Rain: () => '☂'
    }
    let forecastDiv = document.querySelector('#forecast')



    async function weatherHandler() {
        let currentForecastContainer = document.querySelector('#current');
        await Array.from(currentForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el
        })

        let upcomingForecastContainer = document.querySelector('#upcoming');
        await Array.from(upcomingForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el
        })


        try {

            let locationNameInput = document.querySelector('#location')
            let locationName = locationNameInput.value
            let responseData = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
            let locations = await responseData.json()
            let location = await Array.from(locations).filter(x => x.name === locationName)


            let locationCode = location[0].code

            let weatherForecaster = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`)
            let weatherForecast = await weatherForecaster.json()

            let currentDiv = document.querySelector('#current')

            let createdCurrentWeather = createCurrentWeatherForecast(weatherForecast)

            currentDiv.appendChild(createdCurrentWeather)
            forecastDiv.style.display = 'block'

            let upcomingForecaster = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)

            let upcomingForecast = await upcomingForecaster.json()

            let upcomingDiv = document.createElement('div')
            upcomingDiv.classList.add('forecast-info')

            Array.from(upcomingForecast.forecast).forEach(day => {
                let mainSpan = document.createElement('span')
                mainSpan.classList.add('upcoming')

                let upcomingSymbolSpan = document.createElement('span')
                upcomingSymbolSpan.classList.add('symbol')
                upcomingSymbolSpan.textContent = conditions[day.condition]()

                let upcomingTempSpan = document.createElement('span')
                upcomingTempSpan.classList.add('forecast-data')
                upcomingTempSpan.textContent = `${day.low}°/${day.high}°`

                let upcomingConditionSpan = document.createElement('span')
                upcomingConditionSpan.classList.add('forecast-data')
                upcomingConditionSpan.textContent = day.condition

                mainSpan.appendChild(upcomingSymbolSpan)
                mainSpan.appendChild(upcomingTempSpan)
                mainSpan.appendChild(upcomingConditionSpan)

                upcomingDiv.appendChild(mainSpan)
            })

            let upcomingMainDiv = document.querySelector('#upcoming');
            upcomingMainDiv.appendChild(upcomingDiv)

        } catch (err) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('label');
            errorDiv.textContent = 'Error';
            currentForecastContainer.appendChild(errorDiv);
        }

    }

    function createCurrentWeatherForecast(weatherForecast) {
        let conditionDiv = document.createElement('div')
        conditionDiv.classList.add('forecast')

        let spanConditionSymbol = document.createElement('span')
        spanConditionSymbol.classList.add('condition', 'symbol')
        spanConditionSymbol.textContent = conditions[weatherForecast.forecast.condition]()

        let conditionSpan = document.createElement('span')
        conditionSpan.classList.add('condition')

        let conditionLocationSpan = document.createElement('span')
        conditionLocationSpan.classList.add('forecast-data')
        conditionLocationSpan.textContent = weatherForecast.name


        let conditionTempSpan = document.createElement('span')
        conditionTempSpan.classList.add('forecast-data')
        conditionTempSpan.textContent = `${weatherForecast.forecast.high}°/${weatherForecast.forecast.low}°`


        let conditionNameSpan = document.createElement('span')
        conditionNameSpan.classList.add('forecast-data')
        conditionNameSpan.textContent = weatherForecast.forecast.condition

        conditionSpan.appendChild(conditionLocationSpan)
        conditionSpan.appendChild(conditionTempSpan)
        conditionSpan.appendChild(conditionNameSpan)


        conditionDiv.appendChild(spanConditionSymbol)
        conditionDiv.appendChild(conditionSpan)

        return conditionDiv
    }

}

attachEvents();