import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Kun Tartibi xatosi:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#ff6584', fontFamily: 'monospace' }}>
          <h2>Xatolik yuz berdi:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString?.()}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
