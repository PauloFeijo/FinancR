import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, ModalBody } from 'react-bootstrap'
import Field from './Field'
import Message from './Message'

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

    fetch('http://localhost:4000/conta', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descricao: event.target.descricao.value,
        numero: event.target.numero.value,
      })
    })
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
            <Modal.Title id="contained-modal-title-vcenter">Cadastro de Conta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

              <Field size="4" name="id" label="Id" readOnly />
              <Field size="12" name="descricao" label="Descrição" required />
              <Field size="4" name="numero" label="Número" />
              <Field size="4" name="saldo" label="Saldo" readOnly />

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