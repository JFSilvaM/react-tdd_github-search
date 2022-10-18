import {Button, Typography} from '@mui/material'
import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {hasError: false}
  }

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  handleReloadClick = () => window.location.reload()

  render() {
    const {children} = this.props
    const {hasError} = this.state

    if (hasError) {
      return (
        <>
          <Typography variant="h4">There is an unexpected error</Typography>
          <Button
            type="button"
            onClick={this.handleReloadClick}
            variant="contained"
            color="primary"
          >
            Reload
          </Button>
        </>
      )
    }

    return children
  }
}

export default ErrorBoundary
