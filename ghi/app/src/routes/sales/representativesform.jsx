import React from 'react';

class RepresentativesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        employee_num:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmployeeNumber = this.handleChangeEmployeeNumber.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const repUrl = 'http://localhost:8090/api/reps/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(repUrl, fetchConfig);
    if (response.ok) {
      this.setState({
        name:'',
        employee_num:''
      });
    }
  }

  handleChangeEmployeeNumber(event) {
    const value = event.target.value;
    this.setState({ employee_num: value });
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new representative</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChangeName} value = {this.state.name} required type = 'text' className="form-control" id="name" name="name"></input>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeEmployeeNumber} value = {this.state.employee_num} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RepresentativesForm;