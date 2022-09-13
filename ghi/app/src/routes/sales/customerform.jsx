import React from 'react';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        address:'',
        phone_number:'',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const autoUrl = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(autoUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();
      console.log(newAutomobile);
      this.setState({
        name:'',
        address:'',
        phone_number:'',
      });
    }
  }

  handleChangeAddress(event) {
    const value = event.target.value;
    this.setState({ address: value });
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangePhoneNumber(event) {
    const value = event.target.value;
    this.setState({ phone_number: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new customer</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChangeName} required type = 'text' className="form-control" id="name" name="name"></input>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeAddress} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePhoneNumber} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm;