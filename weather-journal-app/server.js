// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
const path = require('path')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
port = 4040;
const server = app.listen(port, () => { console.log(`running at localHost ${port}`) })


app.get('/getweather', (req, res) => {
    res.send(projectData)
})
app.post('/weather', (req, res) => {
    let data = req.body;
    projectData['cityName'] = data.name;
    projectData['temp'] = data.main.temp;
    projectData['feels_like'] = data.main.feels_like;
    projectData['temp_min'] = data.main.temp_min;
    projectData['temp_max'] = data.main.temp_max;
    projectData['date'] = data.dt;
    projectData['timeZone'] = data.timezone;
    projectData['feel'] = data.feel;
    projectData['wind'] = data.wind;
    console.log(projectData)
})
// process.exitCode = 1
// process.on('beforeExit', () => {
//     console.log('Process beforeExit event with code: ', code);
//   });
  
//   process.on('exit', () => {
//     console.log('Process exit event with code: ', code);
//   });
  
//   console.log('This message is displayed first.');
  
//   console.log(process.argv)
//   console.log(path.resolve('website'))
