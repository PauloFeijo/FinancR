import React, { Component } from 'react'
import { Row, Col, Form, } from 'react-bootstrap'

export default class Field extends Component {
    render() {
        return (
            <Row>
                <Col sm={this.props.size}>
                    <Form.Group controlId={this.props.name}>
                        <Form.Label>{this.props.label}</Form.Label>
                        <Form.Control
                            type="text"
                            {...this.props}
                            placeholder={this.props.label}
                        />
                    </Form.Group>
                </Col>
            </Row>
        )
    }
}