import React, { Component, StyleSheet } from 'react'
import { Button, ButtonToolbar, Table, Row, Col, Form, Alert } from 'react-bootstrap'
import CadLancamento from './CadLancamento'
import api from '../services/api'
import { format, parse } from 'date-fns';
import './ListLancamento.css'
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
            contaId: null,
            categoriaId: null,
            contaDescricao: null,
            categoriaDescricao: null,
            dataInicioFiltro: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            dataFinalFiltro: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        }

        this.changeFiltroData = this.changeFiltroData.bind(this);
    }

    componentDidMount() {
        this.consultar()
    }

    consultar() {
        let dataInicial = format(new Date(this.state.dataInicioFiltro), 'dd-MM-yyyy')
        let dataFinal = format(new Date(this.state.dataFinalFiltro), 'dd-MM-yyyy')
        api.get(`lancamento?dini=${dataInicial}&dfin=${dataFinal}`)
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
            alert('Falha ao excluir lancamento! Verifique se o servidor está ativo ou se há relacionamentos.')
        })        
    }

    changeFiltroData(e){ 
        try {
            format(new Date(e.target.value), 'yyyy-MM-dd')                
        } catch (error) {
            alert('Data inválida!')
            e.target.value = format(new Date(this.state[e.target.name]), 'yyyy-MM-dd')
            return                
        }               
        let data = parse(e.target.value, 'yyyy-MM-dd', new Date(), 'pt-br') 
        this.setState({ [e.target.name]: data })
        this.consultar()      
    }

    render() {
        const { lancamentos } = this.state

        let cadLancamentoClose = () => {
            this.setState({ cadLancamentoShow: false })
            this.consultar()
        }

        return (
            <>
                <div className="painel-periodo">
                    Período: 
                    <input type="date" onBlur={this.changeFiltroData} name="dataInicioFiltro" className="edit-periodo"                       
                        defaultValue={format(new Date(this.state.dataInicioFiltro), 'yyyy-MM-dd')}/> a

                    <input type="date" onBlur={this.changeFiltroData} name="dataFinalFiltro" className="edit-periodo"
                        defaultValue={format(new Date(this.state.dataFinalFiltro), 'yyyy-MM-dd')}/>
                </div>

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
                    <tfoot>
                        <tr>
                            <td colspan="5"></td>
                            <th>Total</th>
                            <td>{                            
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                    lancamentos.filter(l => l.tipo == 'Receita').reduce((total, lanc, i) => total + lanc.valor, 0) -
                                    lancamentos.filter(l => l.tipo == 'Despesa').reduce((total, lanc, i) => total + lanc.valor, 0)
                                )                                                    
                            }</td>
                            <td></td>
                        </tr>
                    </tfoot>
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