import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import api from '../services/api'

export default class FieldDropDownDataBind extends Component {

    state = {
        itens: [],
        selecionado: this.props.value,
        onSelecionar: this.props.onSelecionar
    };
      
    componentDidMount() {        
        api.get(this.props.resource)
        .then(res => {
            let itens = res.data.map(item => {
              return {...item}
            });
            this.setState({
              itens: [{id: '', descricao: '(Selecionar..)'}].concat(itens)
            });                    
          }).catch(error => {
            console.log(error);
          });
      }

      selecionar(e) {
        this.setState({selecionado: e.target.value})

        if (this.state.onSelecionar == undefined) return

        let itemSelecionado = this.state.itens.filter(c => c.id == e.target.value)[0]
        this.state.onSelecionar(itemSelecionado)
      }

    render() {
        return (
            <Row>
                <Col sm={this.props.size}>
                    <Form.Group controlId={this.props.name}>
                        <Form.Label>{this.props.label}</Form.Label>
                        <Form.Control as="select" 
                            {...this.props}
                            value={this.state.selecionado}
                            onChange={e => this.selecionar(e)}
                        >
                            {this.state.itens.map(item => 
                                <option 
                                    key={item.id} 
                                    value={item.id}>
                                    {item.descricao}
                                </option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        )
    }
}