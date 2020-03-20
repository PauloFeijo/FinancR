import React, { Component } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'


export default class ListConta extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contas: []
        }
    }

    componentDidMount() {
        this.consultar()
    }

    consultar() {
        fetch('http://localhost:4000/conta')
            .then(res => res.json())
            .then(data => {
                this.setState({ contas: data })
            })
    }

    render() {
        const { contas } = this.state

        return (
            <>
                <Table className="mt-04" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descricao</th>
                            <th>Número</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contas.map(conta =>
                            <tr key={conta.id}>
                                <td>{conta.id}</td>
                                <td>{conta.descricao}</td>
                                <td>{conta.numero}</td>
                                <td>{conta.saldo}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        )
    }
}