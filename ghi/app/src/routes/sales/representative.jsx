import React, { useState,useEffect, } from 'react'
import {useParams} from 'react-router-dom'

function Representative() {
  const [sales,setSales]=useState([])
  let {id}=useParams()
  useEffect(()=>{
    async function fetchSales(){
      const salesResponse = await fetch(`http://localhost:8090/api/reps/${id}`)
      if (salesResponse.ok){
        const salesData = await salesResponse.json()
        setSales(salesData)
      }
    }
    fetchSales()
  }, [id])
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Vehicle</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => {
            return (
              <tr key = {sale.id}>
                <td>{sale.customer.name}</td>
                <td>{sale.car.color} {sale.car.year} {sale.car.make} {sale.car.model}</td>
                <td>{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default Representative;