import React from 'react'

class Appointments extends React.Component {
    constructor() {
        super()
        this.state = {
            automobile: '',
            vehicle_owner: '',
            date: '',
            time: '',
            technician: '',
            service: '',
            data: [],
            // automobiles: [],
            // technicians: [],
            // services: []
        }
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:8080/api/appointments/")

        if (response.ok) {
            const data = await response.json()
            
            //formats date by parsing JSON string 
            data.map(car => car["date"] = JSON.parse(car.date))

            //Parses time string and then slices the seconds off string
            data.map(car => car["time"] = JSON.parse(car.time))
            data.map(car => car["time"] = car.time.time.slice(0, 5))

            for (const car of data) {
              if (car.automobile.vip) {
                car.automobile.vip = "Yes"
              } else {
                car.automobile.vip = "No"
              }
            }
            
            console.log(data)
            this.setState({data})
        }
    }

    handleDeletion = async (auto) => {
      console.log(auto.id)
      const url = `http://localhost:8080/api/appointments/${auto.automobile.vin}`
      const fetchCongif = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(auto)
      }

      const response = await fetch(url, fetchCongif)

      if (response.ok) {
        window.location.reload();
      }
    }

    render() {
        return (
            <div>
                <h2 className="my-4">Service Appointments</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>VIN</th>
                      <th>Costumer Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Technician</th>
                      <th>Reason</th>
                      <th>VIP</th>
                      <th>Cancel/Finished</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(auto => {
                      return (
                        <tr key = {this.state.data.indexOf(auto)}>
                          <td>{ auto.automobile.vin }</td>
                          <td>{ auto.vehicle_owner }</td>
                          <td>{ auto.date.date }</td>
                          <td>{ auto.time }</td>
                          <td>{ auto.technician.name }</td>
                          <td>{ auto.service.name }</td>
                          <td>{ auto.automobile.vip}</td>
                          <td>
                            <button onClick={e => this.handleDeletion(auto)} type="button" className="mx-1 btn btn-primary btn-sm btn-danger">Cancel</button>
                            <button onClick={e => this.handleDeletion(auto)} type="button" className="btn btn-secondary btn-sm btn-success">Finished</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
          );
    }
}

export default Appointments