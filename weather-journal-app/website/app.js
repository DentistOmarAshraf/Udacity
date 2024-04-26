/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ae98b0ecdde76f2f432a34ca9dcbe8ed&units=imperial'
document.getElementById('generate').addEventListener('click', callBack)

function callBack() {
    const newCity = document.getElementById('zip').value + ',us'
    getAllTogather(baseURL, newCity, apiKey)
}
// fetch data from wether api
const getAllTogather = async (url, city, key) => {
    const response = await fetch(url + city + key)
    console.log(response)
    try {
        const data = await response.json();
        const feeling = document.querySelector('#feelings').value;
        data['feel'] = feeling
        console.log(data);
        // add data through POST request to app end point
        postData('/weather', data);
        //then retrive it through GET request
        retrieveData()
    } catch (error) {
        console.log('error', error)
    }
}

// function to 'POST' data to app end Point 
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await request.json();
        return newData
    } catch (error) {
        console.log('error', error);
    }
}

// function to 'GET' data and show it on browser
const retrieveData = async (url) => {
    const request = await fetch('/getweather');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('cityName').innerHTML = allData.cityName
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('feel').innerHTML='Feels Like :  '+allData.feels_like +' degrees'
       let x =allData.date *1000 // UNIX time convert
        let d = new Date(x);
        document.getElementById('date').innerHTML = 'Date:  ' + (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
