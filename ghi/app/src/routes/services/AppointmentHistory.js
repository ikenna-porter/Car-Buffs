import React from 'react'

class AppointmentsHistory extends React.Component {
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
            search_term: '',
        }
    }


    handleFormSubmission = async e => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${this.state.search_term}/`)

            if (response.ok) {
                const data = await response.json()
                console.log(data)

                // formats date by parsing JSON string 
                data.map(car => car["date"] = JSON.parse(car.date))

                //Parses time string and then slices the seconds off string
                data.map(car => car["time"] = JSON.parse(car.time))
                data.map(car => car["time"] = car.time.time.slice(0, 5))
                

                this.setState({data})
            }
        } catch (err) {
            alert('VIN does not exist.')
        }
    }


    handleInputChanges = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    
    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmission} >
                    <h2 className="my-4">Service Appointments</h2>
                    <div className="input-group my-3">
                        <input type="input" name="search_term" onChange={this.handleInputChanges} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="submit" className="btn btn-outline-primary">Search VIN</button>
                    </div>
                </form>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>VIN</th>
                          <th>Costumer Name</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Technician</th>
                          <th>Reason</th>
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
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
            </div>
          );
    }
}

export default AppointmentsHistory