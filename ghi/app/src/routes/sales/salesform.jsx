import React from 'react';

class SalesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        customer:'',
        price:'',
        rep:'',
        car:'',
        automobiles:[],
        customers:[],
        representatives:[]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRepresentative = this.handleChangeRepresentative.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.handleChangeAutomobile = this.handleChangeAutomobile.bind(this);
  }

  async componentDidMount() {
    const carsUrl = 'http://localhost:8090/api/cars/forsale'

    const carsResponse = await fetch(carsUrl)

    if (carsResponse.ok) {
      const carsData = await carsResponse.json()
      console.log(carsData.cars)
      this.setState({ automobiles: carsData })
    }

    const customersUrl = 'http://localhost:8090/api/customers'

    const customerResponse = await fetch(customersUrl)

    if (customerResponse.ok){
        const customerData = await customerResponse.json()
        console.log(customerData.customers)
        this.setState({ customers:customerData })
    }

    const representativesUrl = 'http://localhost:8090/api/reps'

    const representativesResponse = await fetch(representativesUrl)

    if (representativesResponse.ok){
        const representativesData = await representativesResponse.json()
        console.log(representativesData.reps)
        this.setState({representatives:representativesData})
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.automobiles;
    delete data.representatives
    delete data.customers


    const autoUrl = 'http://localhost:8090/api/transactions/'
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(autoUrl, fetchConfig)
    if (response.ok) {
      const newAutomobile = await response.json()
      console.log(newAutomobile)
      this.setState({
        customer:'',
        price:'',
        rep:'',
        car:'',
        automobiles:[],
        customers:[],
        representatives:[]
        
      });
    }
  }

  handleChangePrice(event) {
    const value = event.target.value
    this.setState({ price: value })
  }

  handleChangeRepresentative(event) {
    const value = event.target.value
    this.setState({ rep: value })
  }

  handleChangeAutomobile(event) {
    const value = event.target.value
    this.setState({ car: value })
  }

  handleChangeCustomer(event) {
    const value = event.target.value
    this.setState({ customer: value })
  }

  render() {

    if (this.state.automobiles===undefined||this.state.customers===undefined||this.state.representatives===undefined){
        return 'Loading...'
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-transaction-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePrice} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeAutomobile} required name="car" id="car" className="form-select">
                  <option value="">Choose a car</option>
                  {this.state.automobiles.map(automobile => {
                    return (
                      <option key={automobile.vin} value={automobile.vin}>{automobile.color} {automobile.year} {automobile.make} {automobile.model}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeCustomer} required name="customer" id="customer" className="form-select">
                  <option value="">Choose a customer</option>
                  {this.state.customers.map(customer => {
                    return (
                      <option key={customer.phone_number} value={customer.phone_number}>{customer.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeRepresentative} required name="representative" id="representative" className="form-select">
                  <option value="">Choose a model</option>
                  {this.state.representatives.map(rep => {
                    return (
                      <option key={rep.employee_num} value={rep.employee_num}>{rep.name}</option>
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

export default SalesForm