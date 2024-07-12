const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
  };
  
  let searchInputBox = document.getElementById('input-box');
  searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
      getWeatherReport(searchInputBox.value);
    }
  });
  
  function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
      .then(weather => {
        return weather.json();
      }).then(showWeatherReport);
  }
  
  function showWeatherReport(weather) {
    let city_code = weather.cod;
    if (city_code === '400') {
      swal("Empty Input", "Please enter any city", "error");
      reset();
    } else if (city_code === '404') {
      swal("Bad Input", "Entered city didn't match", "warning");
      reset();
    } else {
      let weather_body = document.getElementById('weather-body');
      weather_body.style.display = 'block';
      let todayDate = new Date();
      weather_body.innerHTML = `
        <div class="location-details">
          <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
          <div class="date" id="date">${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
          <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C</div>
          <div class="weather" id="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
          <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
          <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
          <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%<br>Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
        </div>
      `;
      changeBg(weather.weather[0].main);
      reset();
    }
  }
  
  function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
  }
  
  function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
  }
  
  function getIconClass(classarg) {
    switch (classarg) {
      case 'Rain': return 'fas fa-cloud-showers-heavy';
      case 'Clouds': return 'fas fa-cloud';
      case 'Clear': return 'fas fa-cloud-sun';
      case 'Snow': return 'fas fa-snowman';
      case 'Sunny': return 'fas fa-sun';
      case 'Mist': return 'fas fa-smog';
      case 'Thunderstorm': return 'fas fa-thunderstorm';
      case 'Drizzle': return 'fas fa-cloud-rain';
      default: return 'fas fa-cloud-sun';
    }
  }
  
  function changeBg(weather) {
    let body = document.body;
    switch (weather) {
      case 'Rain': body.style.backgroundColor = '#5f9ea0'; break;
      case 'Clouds': body.style.backgroundColor = '#d3d3d3'; break;
      case 'Clear': body.style.backgroundColor = '#87ceeb'; break;
      case 'Snow': body.style.backgroundColor = '#f0f8ff'; break;
      case 'Sunny': body.style.backgroundColor = '#ffeb3b'; break;
      case 'Thunderstorm': body.style.backgroundColor = '#b0c4de'; break;
      case 'Drizzle': body.style.backgroundColor = '#4682b4'; break;
      case 'Mist': case 'Haze': case 'Fog': body.style.backgroundColor = '#c0c0c0'; break;
      default: body.style.backgroundColor = '#6a11cb'; break;
    }
  }
  
  function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
  }
  
  function addZero(i) {
    return (i < 10) ? "0" + i : i;
  }
  