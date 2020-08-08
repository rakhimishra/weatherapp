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
    
  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15)
    return cell
  }


  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value
    if (city){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    const response = await api_call.json();
    console.log(response)


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
      Icon.push(response.list[i].weather[0].icon)
      
      
    	this.setState({
        celsius:temp,
        temp_max:tempMax,
        temp_min:tempMin,
        humidity:Humidity,
        description:Description,
        icon:Icon,
        Dates:date,
        country:Country,

      });
 
    }
    this.setState({ 
      city: `${response.city.name}`,
    });

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
        "Ludhiana","Madurai","Jabalpur","Rajkot","Dhanbad","aurangabad","London","Moscow","Paris","Jabalpur",
        "Vasai-Vihar","Allahabad","Meerut","Thiruvananthpuram","Srinagar","Asansol",
      "Rajkot","Faridabad","Noida","Guwahati","Jalandhar","Siliguri"]}
  />

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
export default App; 
