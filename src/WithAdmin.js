import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const withAdmin = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const adminUID = "pF0ZQtyt35ZZybtVwpKweyKcHQ63";
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

    return <p>Access Denied. You must be an admin to view this page.</p>;
  };
};

export default withAdmin;