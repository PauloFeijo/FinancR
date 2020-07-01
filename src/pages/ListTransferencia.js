import React, { Component } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import CadTransferencia from './CadTransferencia'
import api from '../services/api'
import { format } from 'date-fns';

export default class ListTransferencia extends Component {

    constructor(props) {
        super(props)

        this.state = {
            transferencias: [],
            cadTransferenciaShow: false,
            edicao: false,
            id: null,
            valor: null,
            data: null,
            contaDebitoId: null,
            contaDebitoDescricao: null,
            contaCreditoId: null,
            contaCreditoDescricao: null          
        }
    }

    componentDidMount() {
        this.consultar()
    }

    consultar() {
        api.get("transferencia")
        .then(res => {
            this.setState({ transferencias: res.data })
        })
    }

    excluir(transfId) {
        if (!window.confirm('Confirma a exclusão da transferencia?')) return

        api.delete(`transferencia\\${transfId}`)
    
        .then(() => {
            this.consultar()
        },
        (error) => {
            alert('Falha ao excluir transferencia! Verifique se o servidor está ativo ou se há relacionamentos.')
        })        
    }

    render() {
        const { transferencias } = this.state

        let cadTransferenciaClose = () => {
            this.setState({ cadTransferenciaShow: false })
            this.consultar()
        }

        return (
            <>
                <Table className="mt-04" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Conta Débito</th>
                            <th>Conta Crédito</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Opção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transferencias.map(transferencia =>
                            <tr key={transferencia.id}>
                                <td>{transferencia.id}</td>
                                <td>{transferencia.contaDebito.descricao}</td>
                                <td>{transferencia.contaCredito.descricao}</td>
                                <td>{format(new Date(transferencia.data), 'dd/MM/yyyy HH:mm')}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transferencia.valor)}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info'
                                            onClick={() => {
                                                this.setState({
                                                    cadTransferenciaShow: true,
                                                    edicao: true,
                                                    ...transferencia,
                                                    contaDebitoDescricao: transferencia.contaDebito.descricao,
                                                    contaCreditoDescricao: transferencia.contaCredito.descricao
                                                })
                                            }}
                                        >Editar</Button>
                                        <Button className='mr-2' variant='danger'
                                            onClick={() => this.excluir(transferencia.id)}
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
                                cadTransferenciaShow: true,
                                id: null,
                                valor: 0,
                                data: new Date(),
                                contaCreditoId: null,
                                contaCreditoDescricao: null,
                                contaDebitoId: null,
                                contaDebitoDescricao: null,
                                edicao: false
                            })
                        }}>
                        Nova Transferência
                    </Button>

                    <CadTransferencia
                        show={this.state.cadTransferenciaShow}
                        onHide={cadTransferenciaClose}
                        {...this.state}
                    />
                </ButtonToolbar>
            </>
        )
    }    
}