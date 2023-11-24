import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();

    useEffect(() => {
      const isAuthenticated = Cookies.get('auth') === 'true';

      // If not authenticated, redirect to login page
      if (!isAuthenticated) {
        Router.push('/login');
      }
    }, [Router]);

    // If the authentication check has not completed, don't render anything
    // Alternatively, you can render a loading spinner or similar here
    if (Cookies.get('auth') === undefined) {
      return null;
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
