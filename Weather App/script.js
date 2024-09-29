const apiKey = '4191dd25acee290361a8940f68aa176b';

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        
        if (data.cod === 200) {
            updateWeather(data);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateWeather(data) {
    const city = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherIcon = data.weather[0].icon;

    
    document.getElementById("city").textContent = city;
    document.getElementById("temp").textContent = `${temp}°C`;
    document.getElementById("humidity").textContent = `${humidity}%`;
    document.getElementById("wind").textContent = `${windSpeed} KM/hr`;
    document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
}


document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name");
    }
});


document.getElementById("city-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = document.getElementById("city-input").value;
        if (city) {
            fetchWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }
});
