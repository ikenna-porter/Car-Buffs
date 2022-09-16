import React from 'react'

class Manufacturers extends React.Component {
    constructor() {
        super()
        this.state = {
            manufacturers: []
        }
    }

    componentDidMount = async e => {
        const response = await fetch("http://localhost:8100/api/manufacturers/");

        if (response.ok) {
            const data = await response.json();
            this.setState({
                ...this.state,
                ...data
            })
        }
    }

    render() {
        return (
            <div>
                <h2 className='m-3'>Manufacturers</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.manufacturers.map( manufacturer => {
                        return(
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Manufacturers