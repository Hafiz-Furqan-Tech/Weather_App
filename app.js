const apiKey = "773f2f69ab42d96490f2dc78e019ed67";
const img = document.querySelector(".images img");

async function checkWeather() {
  try {
    const city = document.querySelector("input").value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.querySelector(".temp h1").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".temp p").innerHTML = data.name;
    document.querySelector(".humidity p").innerHTML = `${data.main.humidity}%<br>Humidity`;
    document.querySelector(".wind p").innerHTML = `${data.wind.speed} km/h<br>Wind Speed`;

    switch (data.weather[0].main) {
      case "Clouds":
        img.src = "images/clouds.png";
        break;
      case "Rain":
        img.src = "images/rain.png";
        break;
      case "Mist":
      case "Haze":
      case "Smoke":
        img.src = "images/mist.png";
        break;
      case "Drizzle":
        img.src = "images/drizzle.png";
        break;
      case "Clear":
        img.src = "images/clear.png";
        break;
      case "Snow":
        img.src = "images/snow.png";
        break;
      default:
        img.src = "images/default.png"; // Default image for unknown weather conditions
    }
  } catch (error) {
    alert(`An error occurred: ${error.message}. Please try again.`);
  }
}

document.querySelector(".search button").addEventListener("click", checkWeather);

document.querySelector("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkWeather();
  }
});
