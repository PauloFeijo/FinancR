import React, { Component } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import CadCategoria from './CadCategoria'
import api from '../services/api'

export default class ListCategoria extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categorias: [],
            cadCategoriaShow: false,
            edicao: false,
            id: null,
            descricao: null,
            tipo: null,
            paiId: null
        }
    }

    componentDidMount() {
        this.consultar()
    }

    consultar() {
        api.get("categoria")
            .then(res => {
                this.setState({ categorias: res.data })
            })
    }

    excluir(categoriaId) {
        if (!window.confirm('Confirma a exclusão da categoria?')) return

        api.delete(`categoria\\${categoriaId}`)

            .then(() => {
                this.consultar()
            },
                (error) => {
                    alert('Falha ao excluir categoria! Verifique se o servidor está ativo.')
                })
    }

    render() {
        const { categorias } = this.state

        let cadCategoriaClose = () => {
            this.setState({ cadCategoriaShow: false })
            this.consultar()
        }

        return (
            <>
                <Table className="mt-04" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descricao</th>
                            <th>Tipo</th>
                            <th>Opção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria =>
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.descricao}</td>
                                <td>{categoria.tipo}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info'
                                            onClick={() => {
                                                this.setState({
                                                    cadCategoriaShow: true,
                                                    edicao: true,
                                                    ...categoria
                                                })
                                            }}
                                        >Editar</Button>
                                        <Button className='mr-2' variant='danger'
                                            onClick={() => this.excluir(categoria.id)}
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
                                cadCategoriaShow: true,
                                id: null,
                                descricao: null,
                                tipo: null,
                                paiId: null,
                                edicao: false
                            })
                        }}>
                        Nova Categoria
                    </Button>
                </ButtonToolbar>

                <CadCategoria
                    show={this.state.cadCategoriaShow}
                    onHide={cadCategoriaClose}
                    {...this.state}
                />
            </>
        )
    }

}