document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const weatherInfo = document.getElementById('weather-info');

    const apiKey = 'abc252d7251b9e71445c2511d7221cb9'; 

    function getWeatherIcon(weatherCondition) {
        const iconMap = {
            'ясно': '☀️',
            'пасмурно': '☁️',
            'переменная облачность': '⛅',
            'дождь': '🌧️',
            'небольшой дождь': '🌦️',
            'гроза': '⛈️',
            'снег': '❄️',
            'туман': '🌫️',
            'мгла': '🌫️',
            'дымка': '🌫️',
            'слабый дождь': '🌧️'
        };
        return iconMap[weatherCondition.toLowerCase()] || '❓';
    }

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city === '') {
            weatherInfo.innerHTML = '<p>Пожалуйста, введите название города.</p>';
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
        weatherInfo.innerHTML = '<p>Загрузка данных...</p>';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const temp = data.main.temp;
                    const description = data.weather[0].description;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
                    const weatherIcon = getWeatherIcon(description);

                    weatherInfo.innerHTML = `
                        <h2>Погода в ${city}</h2>
                        <div style="font-size: 3rem;">${weatherIcon}</div>
                        <p>Температура: ${temp}°C</p>
                        <p>Состояние: ${description}</p>
                        <p>Влажность: ${humidity}%</p>
                        <p>Ветер: ${windSpeed} м/с</p>
                    `;
                } else {
                    weatherInfo.innerHTML = '<p>Не удалось найти такой город.</p>';
                }
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
                weatherInfo.innerHTML = '<p>Произошла ошибка. Пожалуйста, попробуйте позже.</p>';
            });
    });
});
