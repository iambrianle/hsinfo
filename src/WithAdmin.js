import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const withAdmin = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const adminUID = "dikT4YxrkkUqaZVXSKYjQXo2X6h2";
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

    return <p>Truy cập bị từ chối. Bạn phải là quản trị viên để xem trang này. Nhấp <a href="https://hsinfohs.web.app/home">vào đây</a> nếu bạn đã tạo một tài khoản mới.
    </p>;
  };
};

export default withAdmin;