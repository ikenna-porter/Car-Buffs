import React, { useState,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

function Automobiles(){
    //const navigate = useNavigate()
    const [cars, updateCars]= useState()
    async function fetchData(){
        let resp = await fetch("http://localhost:8100/api/automobiles")
        let carsJson = await resp.json()
        updateCars(carsJson.autos)
        }
        
    useEffect(()=>{
        return function cleanup(){
            fetchData()
        }
    },[])

    if (cars === undefined) {
        return 'Loading...';
    }
    return(
            
        <div className = "card-group">
            {cars.map(car=>{
                return(
                    
                    <div className="card" key = {car.id}>
                        <img alt = "" src= { car.model.picture_url } className="card-img-top"/>
                        <div className="card-body">
                        <h5 className="card-title">Car</h5>
                        <p className= "card-text">Make: {car.model.manufacturer.name}</p>
                        <p className= "card-text">Model: {car.model.name}</p>
                        <p className= "card-text">Color: {car.color}</p>
                        </div>
                        <div className="card-footer">
                            Inquire at local dealer for price
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default Automobiles