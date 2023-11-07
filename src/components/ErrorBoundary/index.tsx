import type { ErrorInfo } from 'react'
import React from 'react'

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Handle the error or log it
    // You can display a fallback UI or perform any necessary actions
    // For example, you can show an error message or redirect the user to a different page
    console.error(error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI when an error occurs
      return <div>Something went wrong.</div>
    }

    // Render the children components
    return this.props.children
  }
}

export default ErrorBoundary
