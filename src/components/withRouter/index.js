import React from 'react';
import { useParams } from 'react-router';

export default function withRouter(WrappedComponent) {
  return function wrapper(props) {
    const params = useParams();
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };
}
