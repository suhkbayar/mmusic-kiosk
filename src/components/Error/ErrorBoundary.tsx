import React from 'react';

interface Props {
  children: React.ReactNode;
  onError?: () => void; // Accept a callback to execute on error
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(); // Run the provided error-handling function
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-20 text-red-600">
          <h1>⚠️ Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
