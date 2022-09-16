import React from 'react'

class AppointmentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            automobile: '',
            vehicle_owner: '',
            date: '',
            time: '',
            technician: '',
            service: '',
            services: [],
            technicians: [],
        }
    }

    async componentDidMount() {
        const servicesResponse = await fetch("http://localhost:8080/api/services/")
        const techniciansResponse = await fetch("http://localhost:8080/api/technicians/")

        if (servicesResponse.ok && techniciansResponse.ok) {
            const servicesData = await servicesResponse.json()
            const techniciansData = await techniciansResponse.json()

            this.setState({
                ...this.state,
                ...servicesData,
                ...techniciansData
            })
        }
    }

    handleSubmission = async e => {
        e.preventDefault()

        //Create copy of the state, store it in data variable and delete unncessary properties that don't match with database's appointment properties
        const data = {...this.state}
        delete data.services
        delete data.technicians

        //Post to appropriate API
        const url = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(url, fetchConfig)

        //If post made successfully, clear state
        if (response.ok) {
            console.log('success')
            this.setState({
                automobile: '',
                vehicle_owner: '',
                date: '',
                time: '',
                technician: '',
                service: '',
            })
        }
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h2 className="mb-3">Create an Appointment</h2>
                  <form onSubmit={this.handleSubmission} id="create-transaction-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="VIN" value={this.state.automobile} required type="text" name="automobile" id="automobile" className="form-control" />
                      <label htmlFor="automobile">VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="Vehicle Owner" value={this.state.vehicle_owner} required type="text" name="vehicle_owner" id="vehicle_owner" className="form-control" />
                      <label htmlFor="vehicle_owner">Vehicle Owner</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="Date" value={this.state.date} required type="date" name="date" id="date" className="form-control" />
                      <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="Time" value={this.state.time} required type="time" name="time" id="time" className="form-control" />
                      <label htmlFor="time">Time</label>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleChange} required value='' name="technician" id="technician" className="form-select">
                        <option value="">Choose a Technician</option>
                        {this.state.technicians.map(technician => {
                          return (
                            <option key={technician.employee_id} value={technician.employee_id}>
                                {technician.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleChange} value ='' required name="service" id="service" className="form-select">
                        <option value="">Reason for Appointment</option>
                        {this.state.services.map(service => {
                          return (
                            <option key={service.name} value={service.name}>{service.name}</option>
                          )
                        })}
                      </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
          );
    }
}

export default AppointmentForm