import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

export default class FieldDropDown extends Component {
    render() {
        return (
            <Row>
                <Col sm={this.props.size}>
                    <Form.Group controlId={this.props.name}>
                        <Form.Label>{this.props.label}</Form.Label>
                        <Form.Control as="select" {...this.props}>
                            {this.props.options.map(option => <option>{option}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        )
    }
}