import React, { useState,useEffect, } from 'react'

function Sales() {
  const [sales,setSales]=useState([])
  useEffect(()=>{
    async function fetchSales(){
      const salesResponse = await fetch(`http://localhost:8090/api/transactions`)
      if (salesResponse.ok){
        const salesData = await salesResponse.json()
        setSales(salesData)
      }
    }
    fetchSales()
  }, [])
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Sales Representative</th>
            <th>Vehicle</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => {
            return (
              <tr key = {sale.id}>
                <td>{sale.customer.name}</td>
                <td>{sale.rep.name}</td>
                <td>{sale.car.color} {sale.car.year} {sale.car.make} {sale.car.model}</td>
                <td>{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default Sales;