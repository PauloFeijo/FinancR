import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Field from '../components/Field'
import FieldDropDown from '../components/FieldDropDown'
import FieldDropDownDataBind from '../components/FieldDropDownDataBind'
import Message from '../components/Message'
import api from '../services/api'

export default class CadCategoria extends Component {

  state = {
    messageVisible: false, 
    message: ''
  };

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSelecionarCategoria = this.onSelecionarCategoria.bind(this)
  }

  messageClose = (event) => this.setState({ messageVisible: false })

  mensagem(msg) { this.setState({ messageVisible: true, message: msg }) }

  handleSubmit(event) {
    event.preventDefault()

    const data = {
      descricao: event.target.descricao.value,
      tipo: event.target.tipo.value,
      paiId: event.target.paiId.value
    }

    let method = 'post'
    let resource = 'categoria'
    if (this.props.edicao) {
      method = 'put'
      resource = `categoria\\${this.props.id}`
    }

    api[method](resource, data)
      .then(() => {
        this.mensagem('Salvo com sucesso!')
        this.props.onHide()
      },
        (error) => {
          this.mensagem('Falha ao salvar! Verifique se o servidor está ativo.')
        })
  }

  onSelecionarCategoria(cat){
    this.setState({tipo: cat.tipo})
  }

  render() {
    return (
      <div className="container">

        <Message
          opened={this.state.messageVisible}
          message={this.state.message}
          onClose={this.messageClose}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.edicao ? 'Editar categoria' : 'Nova categoria'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

              <Field size="4" name="id" label="Id" readOnly
                defaultValue={this.props.id} />

              <Field size="12" name="descricao" label="Descrição" required
                defaultValue={this.props.descricao} />

              <FieldDropDownDataBind
                size="12" name="paiId" label="Pai" 
                resource="categoria" value={this.props.paiId} 
                onSelecionar={this.onSelecionarCategoria}
              />                     

              <FieldDropDown size="4" name="tipo" label="Tipo" required
                options={["Receita", "Despesa"]}
                defaultValue={this.props.tipo}
                value={this.state.tipo}
              />

              <Form.Group>
                <Button variant="primary" type="submit"> Salvar </Button>
              </Form.Group>

            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" 
              onClick={this.props.onHide}>Cancelar</Button>
          </Modal.Footer>

        </Modal>
      </div>
    )
  }
}