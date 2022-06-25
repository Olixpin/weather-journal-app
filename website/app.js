/* Global Variables */
const buttonGenerate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const entryHolder = document.getElementById('entryHolder');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const baseURI = 'https://api.openweathermap.org/data/2.5/weather?zip=';

let weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${weekdays[d.getDay()]} ${
  d.getMonth() + 1
}.${d.getDate()}.${d.getFullYear()}`;

// const day = date.getDay();

// Personal API Key for OpenWeatherMap API
const apiKey = '57e962dcd0123d5ebc962528fcf7c66e&units=imperial';

// Function called by event listener
const performAction = e => {
  e.preventDefault();
  // Function to GET Web API Data
  const zipCode = zip.value;
  const query = baseURI + zipCode + '&APPID=' + apiKey;
  getWeather(query).then(data => {
    const info = curateData(data);
    postData('/add', info).then(data => {
      retrieveData('/all');
    });
  });
};

// Event listener to add function to existing HTML DOM element
buttonGenerate.addEventListener('click', performAction);

// /* Function to GET Web API Data*/
const getWeather = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      content.innerHTML = `<p>Feelings☺️: ${feelings.value}</p>`;
      temp.innerHTML = `<p>The current temperature☁️ in ${data.name} is ${data.main.temp}°C.</p>`;
      date.innerHTML = `<p>Today's date📅 ${newDate}</p>`;
      return data;
    } else {
      content.innerHTML = `<p>${data.message}</p>`;
      reset();
      console.log(data.message);
    }
  } catch (e) {
    console.log(e);
  }
};

// /* Function to GET Project Data */
const curateData = data => {
  try {
    if (data.message) {
      const info = data.message;
      console.log(info);
      return info;
    } else {
      const info = {
        date: newDate,
        feelings: feelings.value,
        temp: data.main.temp,
      };
      return info;
    }
  } catch {}
};

// /* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (e) {
    console.log(e);
  }
};

// /* Function to GET Project Data */
const retrieveData = async url => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

// Reset the values of the input fields
function reset() {
  feelings.value = '';
  temp.innerHTML = '';
  date.innerHTML = '';
}
