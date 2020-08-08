import React from 'react';
import './App.css';
import Navbars from './components/Navbar'
import Cards from './components/Cards'
import Autocomplete from './components/Autocomplete'
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";

import './components/index.css'
const API_KEY ="c7fcb4212b3dd249688a043361e8c60f "


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      city :undefined,
      country :[],
      icon:[],
      main:undefined,
      celsius:[],
      temp_max:[],
      temp_min:[],
      Dates:[],
      humidity:[],
      wind_speed:undefined,
      description :[],
      error:false,
    
    }
    // this.getWeather();
    this.weatherIcon = {
      thunderstorm : "wi-thunderstorm",
      Drizzle : "wi-sleet",
      Rain : "wi-storm-showers",
      Snow : "wi-snow",
      Atmosphere : "wi-fog",
      Clear : "wi-day-sunny",
      Clouds: "wi-cloud-fog"

    };
  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15)
    return cell
  }

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId >=200 && rangeId <= 232:
      this.setState({icon:icons.thunderstorm})
      break

      case rangeId >=300 && rangeId <= 321:
      this.setState({icon:icons.Drizzle});
      break

      case rangeId >=500 && rangeId <= 531:
      this.setState({icon:icons.Rain});
      break

      case rangeId >=600 && rangeId <= 622:
      this.setState({icon:icons.Snow});
      break
      
      case rangeId >=701 && rangeId <= 731:
      this.setState({icon:icons.Atmosphere});
      break

      case rangeId === 800:
      this.setState({icon:icons.Clear});
      break

      case rangeId >=801 && rangeId <= 804:
      this.setState({icon:icons.Clouds});
      break

      default:
        this.setState({icon:icons.Clouds});

    }
    
  }
   
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value
    if (city){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    const response = await api_call.json();
    console.log(response)

    console.log(this.get_WeatherIcon(this.weatherIcon, response.list[1].weather[0].id));
    for(let i=0; i<40; i+=8){
      let temp = this.state.celsius;
      let tempMax=this.state.temp_max;
      let tempMin = this.state.temp_min;
      let Humidity = this.state.humidity;
      let Description = this.state.description;
      let Icon = this.state.icon;
      let date = this.state.Dates;
      let Country = this.state.country;


      temp.push(this.calCelsius(response.list[0].main.temp));
      tempMax.push(this.calCelsius(response.list[i].main.temp_max));
      tempMin.push(this.calCelsius(response.list[i].main.temp_min));
      Humidity.push(response.list[i].main.humidity);
      date.push(response.list[i].dt_txt);
      Description.push(response.list[i].weather[0].description);
      Country.push(response.city.country)
      // Icon.push(this.get_WeatherIcon(this.weatherIcon, response.list[1].weather[0].id));
      
    	this.setState({
        celsius:temp,
        temp_max:tempMax,
        temp_min:tempMin,
        humidity:Humidity,
        description:Description,
        icon:Icon,
        Dates:date,
        country:Country,
        // weatherIcon:this.weatherIcon.thunderstorm
        

      });
 
    }
    this.setState({ 
      city: `${response.city.name}`,
      weatherIcon:this.weatherIcon.thunderstorm

    });
    this.get_WeatherIcon(this.weatherIcon, response.list[1].weather[0].id);
    }
    else{
      this.setState({error:true});
    }
  }

  render(){
    return (
      
      <div className="App">
      <Navbars/>
      <Autocomplete
      loadweather= {this.getWeather}
      error={this.state.error}
        suggestions={["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Bhiwandi", "Hyderabad",
        "Ahmedabad","Pune","Surat","Jaipur","Kanpur","Lucknow","nagpur","Pune","pune","surat",
        "jaipur","Jaipur","ahmedabad","Nagpur","bengaluru","Ghaziabad","Indore","Coimbtore","kochi","patna",
      "Patna","Khozikhode","Bhopal","Vadodara","agra","Vishakhapatanam","Varanasi","varanasi","Nashik","Vijayavada",
      "Ludhiana","Madurai","Jabalpur","Rajkot","Dhanbad","aurangabad"]}
  />
      {/* <Form loadweather= {this.getWeather}
      error={this.state.error}/> */}

      <Cards 
      city = {this.state.city} 
      country = {this.state.country}
      celsius = {this.state.celsius} 
      temp_min = {this.state.temp_min} 
      temp_max = {this.state.temp_max} 
      description ={this.state.description}
      Dates= {this.state.Dates}
      humidity = {this.state.humidity}
      icon = {this.state.icon}/>
    </div>
   
    )
  }
}
// function App() {
//   return (
    // <div className="App">
    //   <Navbars/>
    //   <Cards />
    //   <Weather />
    //   <h1>Weather app</h1>
    // </div>
//   );
// }

export default App; 
