import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Representatives() {
  const [reps,setReps]=useState([])
  useEffect(()=>{
    async function fetchReps(){
      const repResponse = await fetch('http://localhost:8090/api/reps')
      if (repResponse.ok){
        const repData = await repResponse.json()
        setReps(repData)
      }
    }
    fetchReps()
  },[])
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee Number</th>
            <th>Sales Report</th>
          </tr>
        </thead>
        <tbody>
          {reps.map(rep => {
            const navlink = `${rep.employee_num}`
            return (
              <tr key = {rep.employee_num}>
                <td>{ rep.name }</td>
                <td>{ rep.employee_num }</td>
                <td><NavLink to={navlink}>Sales</NavLink></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default Representatives;