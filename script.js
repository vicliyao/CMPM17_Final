const express = require('express');
const request = require("request");
const cors = require('cors');
const app = express();
app.use(cors());



const API_KEY = "7OlEKeJ4zbqZGYvVYOrD4rMlLgWdCU5j";

app.get('/weather/basec', (req, res) => {
  console.log("welcome to the root!");
    //////////////////////////////
  // Get the Strings of inputs
  
  var url = `https://api.apilayer.com/currency_data/convert?base=USD&symbols=EUR,GBP,JPY&amount=5&date=2018-01-01' \
  --header 'apikey:${API_KEY}`;  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log('Error occured:',error)
	   
		// Printing status code
		console.log(response.statusCode);
		
        
		// Printing TEMP
        const data = JSON.parse(body);
        console.log('API Response:', data);
        
        
	});
});


// Extra credit: 5 Day
app.get('/5day/:lat/:lon', (req, res) => {
    console.log("5-day forecast(In Fahrenheit)");
    var lat = req.params.lat;
    var lon = req.params.lon;
    
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    
      request(url, (error, response, body)=>{
          
          // Printing the error if occurred
          if(error) console.log(error)
         
          // Printing status code
          console.log('StatusCode:',response.statusCode);
          
          // Calculate Average TEMP for each day
          const data = JSON.parse(body);
          const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          const forecast = [];
          let todaysDate = new Date().getDay()
          
          for (let i=0;i<5;i++){
            let tempSum = 0
            let count = 0
            for (let dataPoint of data.list){
              const date = new Date(dataPoint.dt*1000)
              if (date.getDay() == todaysDate){
                count++;
                tempSum += dataPoint.main.temp;
              }
            }
            const day={"dayName": week[todaysDate], "temp": Math.round(tempSum / count) }
            forecast.push(day)
            todaysDate = (todaysDate + 1) % 7
          }
          res.send({forecast})

          
      });
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});