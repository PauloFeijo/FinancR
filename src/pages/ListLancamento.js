import React, { Component } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import CadLancamento from './CadLancamento'
import api from '../services/api'
import { format } from 'date-fns';

export default class ListLancamento extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lancamentos: [],
            cadLancamentoShow: false,
            edicao: false,
            id: null,
            descricao: null,
            tipo: null,
            valor: null,
            data: null,
            conta: null,
            categoria: null
        }
    }

    componentDidMount() {
        this.consultar()
    }

    consultar() {
        api.get("lancamento")
        .then(res => {
            this.setState({ lancamentos: res.data })
        })
    }

    excluir(lancId) {
        if (!window.confirm('Confirma a exclusão da lancamento?')) return

        api.delete(`lancamento\\${lancId}`)
    
        .then(() => {
            this.consultar()
        },
        (error) => {
            alert('Falha ao excluir lancamento! Verifique se o servidor está ativo.')
        })        
    }

    render() {
        const { lancamentos } = this.state

        let cadLancamentoClose = () => {
            this.setState({ cadLancamentoShow: false })
            this.consultar()
        }

        return (
            <>
                <Table className="mt-04" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Conta</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Opção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lancamentos.map(lancamento =>
                            <tr key={lancamento.id}>
                                <td>{lancamento.id}</td>
                                <td>{lancamento.tipo}</td>
                                <td>{lancamento.categoria.descricao}</td>
                                <td>{lancamento.conta.descricao}</td>
                                <td>{lancamento.descricao}</td>
                                <td>{format(new Date(lancamento.data), 'dd/MM/yyyy HH:mm')}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lancamento.valor)}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info'
                                            onClick={() => {
                                                this.setState({
                                                    cadLancamentoShow: true,
                                                    edicao: true,
                                                    ...lancamento,
                                                    contaDescricao: lancamento.conta.descricao,
                                                    categoriaDescricao: lancamento.categoria.descricao
                                                })
                                            }}
                                        >Editar</Button>
                                        <Button className='mr-2' variant='danger'
                                            onClick={() => this.excluir(lancamento.id)}
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
                                cadLancamentoShow: true,
                                id: null,
                                descricao: null,
                                tipo: null,
                                valor: 0,
                                data: new Date(),
                                contaId: null,
                                categoriaId: null, 
                                contaDescricao: null,
                                categoriaDescricao: null,
                                edicao: false
                            })
                        }}>
                        Novo Lançamento
                    </Button>

                    <CadLancamento
                        show={this.state.cadLancamentoShow}
                        onHide={cadLancamentoClose}
                        {...this.state}
                    />
                </ButtonToolbar>
            </>
        )
    }    
}