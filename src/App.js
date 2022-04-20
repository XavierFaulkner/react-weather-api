import React, {useState} from 'react';

const InputZip = ({onInput, onClick}) => {
  return (
    <>
      <div id="zipInfo">
        <form id="zipForm">
          <input id="zipcode" type="text" placeholder="enter zipcode" onInput={onInput}/>
          <button type="submit" onClick={onClick}>Submit</button>
        </form>
      </div>
    </>
  )
}

const Weather = ({json}) => {
  if(json == null) {
    return (
      <>
        <div id="weatherInfo">
          <h2>Please enter a zipcode above</h2>
        </div>
      </>
    );
  } else {
    let cod = json.cod;
    if(cod === "404" || cod === "400") {
      return (
        <div id="weatherInfo">
          <h2>Please enter a valid zipcode</h2>
        </div>
      );
    } else if(cod === 200) {
      let temp = json.main.temp;
    let date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    let time = new Date().toLocaleTimeString();
    let icon = json.weather[0].icon;
    let conditions = json.weather[0].description;
    let high = json.main.temp_max;
    let low =  json.main.temp_min;
    let city = json.name;
    let src = `http://openweathermap.org/img/w/${icon}.png`;
    let feelsLike = json.main.feels_like;
    let humidity = json.main.humidity;

    return (
      <>
        <div id="weatherInfo">
          <h2 id="date">{date}</h2>
          <h2>{time}</h2>
          <h2>City: {city}</h2>
          <img id="icon" src={src} width="100" alt="" />
          <h2 id="temp">Temperature(°F): {temp}</h2>
          <h2>Feels Like: {feelsLike}</h2>
          <h2>Humidity: {humidity}%</h2>
          <h2 id="conditions">Conditions: {conditions}</h2>
          <div className="holder">
              <h2 id="high">High: {high}</h2>
              <h2 id="low">Low: {low}</h2>
          </div>
        </div>
      </>
    );
    }
  }
}

const App = () => {

  const [json, setJson] = useState(null);
  const [zip, setZip] = useState(null);

  const updateZipcode = () => {
    const input = document.getElementById('zipcode');
    setZip(input.value);
  }

  function updateWeather() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&exclude={part}&appid=40515d80bc2d81aca49ef98a7a3e5afd&units=imperial`)
      .then((response) => response.json())
      .then((json) => {
          setJson(json);
      })
      .catch(() => console.log("oh no"))
  }

  return (
    <div id="container">
      <header>
        <h1>Open API Weather</h1>
      </header>
      <InputZip onInput={updateZipcode} onClick={(e) => {e.preventDefault(); updateWeather()}}/>
      <Weather json={json} />
    </div>
  );
};

export default App;
