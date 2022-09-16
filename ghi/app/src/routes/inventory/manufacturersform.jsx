import React from 'react';

class ManufacturersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();
      this.setState({
        name:'',
      });
    }
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
            <h1>Create a new manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChangeName} required type = 'text' className="form-control" id="name" name="name"></input>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ManufacturersForm;