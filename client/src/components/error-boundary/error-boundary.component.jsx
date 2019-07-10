import React from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  state = {
    hasErrored: false
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasErrored: true
    };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service

    console.log(error);
  }

  render() {
    return this.state.hasErrored ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl="https://i.imgur.com/qIufhof.png" />
        <ErrorImageText>Sorry this page is broken.</ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;
