import React from 'react'

class TechnicianForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            employee_id: 0,
        }
    }

    handleSubmission = async e => {
        e.preventDefault()

        const data = {...this.state}
        const url = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "POST",
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }

        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                console.log(response)
            }
        }
        catch(err) {
            console.error(err)
        }

        this.setState({
            name: '',
            employee_id: 0,
        });
    
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a Technician</h1>
                  <form onSubmit={this.handleSubmission} id="create-automobile-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} required type = 'text' className="form-control" id="name" name="name" placeholder='Name'></input>
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChange} placeholder="Employee ID" required type="number" name="employee_id" id="employee_id" className="form-control" />
                      <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
          );
    }
}

export default TechnicianForm