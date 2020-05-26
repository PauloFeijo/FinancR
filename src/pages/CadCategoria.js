import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Field from '../components/Field'
import FieldDropDown from '../components/FieldDropDown'
import Message from '../components/Message'
import api from '../services/api'

export default class CadCategoria extends Component {

  constructor(props) {
    super(props)

    this.state = { messageVisible: false, message: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  messageClose = (event) => this.setState({ messageVisible: false })

  mensagem(msg) { this.setState({ messageVisible: true, message: msg }) }

  handleSubmit(event) {
    event.preventDefault()

    console.log(event.target.descricao.value)
    console.log(event.target.tipo.value)

    const data = {
      descricao: event.target.descricao.value,
      tipo: event.target.tipo.value
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

  render() {
    return (
      <div className="categoriainer">

        <Message
          opened={this.state.messageVisible}
          message={this.state.message}
          onClose={this.messageClose}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="categoriained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="categoriained-modal-title-vcenter">
              {this.props.edicao ? 'Editar categoria' : 'Nova categoria'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

              <Field size="4" name="id" label="Id" readOnly
                defaultValue={this.props.id} />

              <Field size="12" name="descricao" label="Descrição" required
                defaultValue={this.props.descricao} />

              <FieldDropDown size="4" name="tipo" label="Tipo" required
                options={["Receita", "Despesa"]}
                defaultValue={this.props.tipo}
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