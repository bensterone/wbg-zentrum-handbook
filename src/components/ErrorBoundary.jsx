import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // State aktualisieren, damit der nächste Render einen Fehler-Fallback zeigt
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Zusätzliche Fehlerdetails loggen (z.B. an externen Service)
    this.setState({ errorInfo });

    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI anzeigen
      return (
        <div style={{ padding: 20 }}>
          <h1>Etwas ist schiefgelaufen.</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }
    // Normal rendern, falls kein Fehler
    return this.props.children;
  }
}

export default ErrorBoundary;

