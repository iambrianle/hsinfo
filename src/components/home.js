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
    return <p>Loading...</p>
  }


  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <div>
        <Link to="/search">
          <button>Search</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <Link to="/change-password">
          <button>Change Password</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Phiên bản thử nghiệm 0.65, các tính đều hoạt động.</p>
      <p>- Lỗi 1: Còn một số chỗ chưa việt hóa</p>
      <p>- Lỗi 2: Trạng thái tải tải lên chưa hoạt động</p>
    </div>
  );
};

export default Home;