import React, { Component } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import CadConta from './CadConta'

export default class ListConta extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contas: [],
            cadContaShow: false,
            edicao: false,
            id: null,
            descricao: null,
            numero: null,
            saldo: null
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

    componentDidUpdate() {
        this.consultar()
    }

    excluir(contaId) {
        if (!window.confirm('Confirma a exclusão da conta?')) return

        fetch('http://localhost:4000/conta/' + contaId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(null,
                (error) => {
                    alert('Falha ao excluir conta! Verifique se o servidor está ativo.')
                })
    }

    render() {
        const { contas } = this.state
        let cadContaClose = () => this.setState({ cadContaShow: false })

        return (
            <>
                <Table className="mt-04" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descricao</th>
                            <th>Número</th>
                            <th>Saldo</th>
                            <th>Opção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contas.map(conta =>
                            <tr key={conta.id}>
                                <td>{conta.id}</td>
                                <td>{conta.descricao}</td>
                                <td>{conta.numero}</td>
                                <td>{conta.saldo}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info'
                                            onClick={() => {
                                                this.setState({
                                                    cadContaShow: true,
                                                    edicao: true,
                                                    ...conta
                                                })
                                            }}
                                        >Editar</Button>
                                        <Button className='mr-2'
                                            onClick={() => this.excluir(conta.id)}
                                        >Excluir</Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => {
                            this.setState({
                                cadContaShow: true,
                                id: null,
                                descricao: null,
                                numero: null,
                                saldo: null,
                                edicao: false
                            })
                        }}>
                        Nova Conta
                    </Button>

                    <CadConta
                        show={this.state.cadContaShow}
                        onHide={cadContaClose}
                        {...this.state}
                    />
                </ButtonToolbar>
            </>
        )
    }
}