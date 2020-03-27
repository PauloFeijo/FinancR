import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Field from '../components/Field'
import Message from '../components/Message'
import api from '../services/api'

export default class CadConta extends Component {

  constructor(props) {
    super(props)

    this.state = { messageVisible: false, message: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  messageClose = (event) => this.setState({ messageVisible: false })

  mensagem(msg) { this.setState({ messageVisible: true, message: msg }) }

  handleSubmit(event) {
    event.preventDefault()

    const data = {
      descricao: event.target.descricao.value,
      numero: event.target.numero.value
    }

    let method = 'post'
    let resource = 'conta'
    if (this.props.edicao) {
      method = 'put'
      resource = `conta\\${this.props.id}`
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
              {this.props.edicao ? 'Editar conta' : 'Nova conta'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

              <Field size="4" name="id" label="Id" readOnly
                defaultValue={this.props.id} />

              <Field size="12" name="descricao" label="Descrição" required 
              defaultValue={this.props.descricao} />

              <Field size="4" name="numero" label="Número" 
              defaultValue={this.props.numero} />

              <Field size="4" name="saldo" label="Saldo" readOnly 
              defaultValue={this.props.saldo} />

              <Form.Group>
                <Button variant="primary" type="submit"> Salvar </Button>
              </Form.Group>

            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide}>Cancelar</Button>
          </Modal.Footer>

        </Modal>
      </div>
    )
  }
}