import React from 'react'

class VehicleModelsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            name: '',
            picture_url: '',
            manufacturer_id: '',
        };
    }

    componentDidMount = async e => {
        const response = await fetch("http://localhost:8100/api/manufacturers/");

        if (response.ok) {
            const data = await response.json()
            this.setState({
                ...this.state,
                ...data
            })
        }

    }

    handleFormChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmission = async e => {
        e.preventDefault();

        const url = "http://localhost:8100/api/models/";
        const data = {...this.state}
        delete data.manufacturers

        console.log(this.state)

        const fetchConfig = {
            method: "POST",
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            this.setState({
                name: '',
                picture_url: '',
                manufacturer_id: '',
                // manufacturers: []
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmission}>
                <h2 className="m-5">Create a Vehicle Model</h2>
                <div className="form-group m-3">
                    <input type="text" onChange={this.handleFormChange} value={this.state.name} className="form-control" id="name" name="name" placeholder="Name" />
                </div>
                <div className="form-group m-3">
                    <input type="url" onChange={this.handleFormChange} value={this.state.picture_url} className="form-control" id="picture_url" name="picture_url" placeholder="Picture URL" />
                </div>
                <div className="form-group m-3">
                    <select className="form-control" onChange={this.handleFormChange} value='' id="manufacturer_id" name="manufacturer_id" placeholder="Choose a manufacturer">
                        <option>Choose a manufacturer</option>
                        {this.state.manufacturers.map( manufacturer => {
                            return (
                                <option key={manufacturer.id} value={parseInt(manufacturer.id)}>{manufacturer.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary m-3">Create</button>
            </form>
        )
    }
}

export default VehicleModelsForm