import React, { Component } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import CadCategoria from './CadCategoria'
import api from '../services/api'

export default class ListCategoria extends Component {

    tree = []

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

    montarArvore(src, pai, nvl) {
        console.log('montar arvore pai '+pai)
    
        let childs = src.filter(c => c.paiId == pai)

        console.log(childs)

        childs.map(c => {
            c.descricaoTree = nvl + c.descricao
            this.tree.push(c)
            this.montarArvore(src, c.id, nvl + '.....')
        })        

        return this.tree
    }
       

    consultar() {
        api.get("categoria")
            .then(res => {
                this.tree = []
                this.montarArvore(res.data, null, '')
                console.log('Arvore criada: ')
                console.log(this.tree)
                this.setState({ categorias: this.tree })
            })
    }

    excluir(categoriaId) {
        if (!window.confirm('Confirma a exclusão da categoria?')) return

        api.delete(`categoria\\${categoriaId}`)

            .then(() => {
                this.consultar()
            },
                (error) => {
                    alert('Falha ao excluir categoria! Verifique se o servidor está ativo ou se há relacionamentos.')
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
                                <td>{categoria.descricaoTree}</td>
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