document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.querySelector('.weather-container');
    const city = 'Минск'; 
    const apiKey = 'abc252d7251b9e71445c2511d7221cb9'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    weatherContainer.innerHTML = '<h1>Погода</h1><p>Загрузка данных...</p>';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                weatherContainer.innerHTML = `
                    <h1>Погода в ${city}</h1>
                    <p>Температура: ${temp}°C</p>
                    <p>Состояние: ${description}</p>
                    <p>Влажность: ${humidity}%</p>
                    <p>Ветер: ${windSpeed} м/с</p>
                `;
            } else {
                weatherContainer.innerHTML = '<h1>Ошибка</h1><p>Не удалось получить данные о погоде.</p>';
            }
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            weatherContainer.innerHTML = '<h1>Ошибка</h1><p>Произошла ошибка. Пожалуйста, попробуйте позже.</p>';
        });
});
