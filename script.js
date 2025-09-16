document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.querySelector('.weather-container');
    weatherContainer.innerHTML = '<h1>Погода</h1><p>Загрузка данных...</p>';


    setTimeout(() => {
        weatherContainer.innerHTML = `
            <h1>Погода в Минске</h1>
            <p>Температура: 15°C</p>
            <p>Влажность: 70%</p>
            <p>Ветер: 5 м/с</p>
        `;
    }, 2000); 
});
