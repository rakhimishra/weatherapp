import React from 'react'
import {Card , CardDeck} from 'react-bootstrap'

const Cards = (props)=> {
  const data = [0,1,2,3,4]
  const city =props.city
  console.log(props)
  console.log(props.icon)
    return (
      
      <CardDeck style={{backgroundColor:""}} className="cards mt-5 mx-2">
         {props.city?data.map(el =>
       <Card className = " cards">
       <Card.Body style={{ backgroundColor:"" ,
        boxShadow:"5px 10px 5px", borderRadius:"2px"}}>
      <Card.Title className="fs-4 ">{props.city} , {props.country[el]}</Card.Title>
        <h6>{props.Dates[el]}</h6>
        <Card.Text>
         <i className={`wi ${props.weatherIcon} display-1`}></i>
       
        </Card.Text>
        {props.celsius ? <h1 className="py-2"> {props.celsius[el]}&deg;<em>C</em></h1>:null}
          {minmaxTemp(props.temp_max[el],props.temp_min[el])}

        {props.humidity ? <h4>Humidity {props.humidity[el]}</h4> :null}
        <h4 className="py-3"><em>{props.description[el]}</em></h4>
      </Card.Body>
      
    </Card>):null}
    </CardDeck>
    )

  
}
function minmaxTemp(min,max){
  if (min && max){
    return (
      <h3>
          <span className="px-2">{min}&deg;</span>
          <span className="px-1">{max}&deg;</span>
      </h3>
  )
  }
  
}
export default Cards
