import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "admins", user.uid);
        const docSnap = await getDoc(docRef);
        setIsAdmin(docSnap.exists());
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return <p>Đang load... nếu quá lâu, click vào <a href="https://hsinfohs.web.app/login">đây</a> để đăng nhập lại</p>
  }


  return (
    <div>
      <h1>Xin Chào, {user.email}</h1>
      <div>
        <Link to="/search">
          <button>Tìm Kiếm Dữ Liệu</button>
        </Link>
        <Link to="/queries">
          <button>Tạo Dữ Liệu/ Dữ Liệu của tôi</button>
        </Link>
        <Link to="/change-password">
          <button>Đổi Mật Khẩu</button>
        </Link>
        <button onClick={handleLogout}>Đăng Xuất</button>
      </div>
    </div>
  );
};

export default Home;