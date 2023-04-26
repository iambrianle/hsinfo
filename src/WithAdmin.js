import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const withAdmin = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const adminUID = "hAf3x999JMQnHDN93VL8hUf32g02";
    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.uid === adminUID) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [auth]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (isAdmin) {
      return <WrappedComponent {...props} />;
    }

    return <p>Access Denied. You must be an admin to view this page, Click <a href="https://hsinfohs.web.app/home">here</a> if you created a new account.
    </p>;
  };
};

export default withAdmin;