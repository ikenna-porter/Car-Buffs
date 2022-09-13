import React from 'react'

class VehicleModels extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            models: []
        }
    }

    componentDidMount = async () => {
        const response = await fetch("http://localhost:8100/api/models/")

        if (response.ok) {
            const data = await response.json();

            this.setState({
                ...this.state,
                ...data
            })
            console.log(this.state)
        }
    }

    render() {

        return (
            <div>
                <h2 className='m-3'>Vehicle Models</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5">Name</th>
                            <th scope="col" className="px-5">Manufacturer</th>
                            <th scope="col" className="px-5">Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.models.map( vehicle => {
                        return(
                            <tr key={vehicle.id}>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.manufacturer.name}</td>
                                <td>
                                    <img 
                                        src={vehicle.picture_url} 
                                        alt={vehicle.name}
                                        style={{width: "30%"}}
                                     />
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default VehicleModels