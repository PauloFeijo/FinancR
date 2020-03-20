import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export default class Message extends Component {

    render() {
        return (
            <Snackbar
                {...this.props}
                open={this.props.opened}
                autoHideDuration={2000}
                message={<span id="message-id">{this.props.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        arial-label="Close"
                        color="inherit"
                        onClick={this.props.onClose}
                    >x</IconButton>
                ]}
            />

        )
    }
}     