import React, { Component } from 'react'
import { Modal, Button, Form,  Row, Col } from 'react-bootstrap'
import Field from '../components/Field'
import Message from '../components/Message'
import api from '../services/api'
import { format, parse } from 'date-fns';
import FieldDropDownDataBind from '../components/FieldDropDownDataBind'

export default class CadLancamento extends Component {

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
      valor: event.target.valor.value,
      data: parse(event.target.data.value, 'dd/MM/yyyy HH:mm', new Date(), 'pt-br'),
      contaId: event.target.conta.value,
      categoriaId: event.target.categoria.value
    }

    let method = 'post'
    let resource = 'lancamento'
    if (this.props.edicao) {
      method = 'put'
      resource = `lancamento\\${this.props.id}`
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
              {this.props.edicao ? 'Editar lançamento' : 'Novo lançamento'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

              <Field size="4" name="id" label="Id" readOnly
                defaultValue={this.props.id} />  

              <FieldDropDownDataBind                
                size="12" name="conta" label="Conta" 
                resource="conta" value={this.props.contaId}  
              />    

              <FieldDropDownDataBind
                size="12" name="categoria" label="Categoria" 
                resource="categoria" value={this.props.categoriaId} 
              />                           

              <Field size="12" name="descricao" label="Descrição" required 
              defaultValue={this.props.descricao} />

              <Field size="4" name="data" label="Data" required
              defaultValue={format(new Date(this.props.data), 'dd/MM/yyyy HH:mm', 'pt-BR')} />

              <Field size="4" name="valor" label="Valor" required 
              defaultValue={this.props.valor} />

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