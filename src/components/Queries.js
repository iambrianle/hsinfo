import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { auth } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);
  const [info, setInfo] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    dropdown1: "",
    dropdown2: "",
    file: null,
  });

  const dropdown1Options = [
    "Quy Chế",
    "Quy Trình",
    "Quy Định",
    "Quy Tắc",
    "Kế Hoạch",
    "Chỉ Thị",
    "Hướng Dẫn ",
    "Chiến Lược",
    "Khác",
  ];

  const dropdown2Options = ["M", "T"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchQueries(user.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchQueries = async (uid) => {
    const q = query(collection(db, "queries"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const queriesData = [];
    querySnapshot.forEach((doc) => {
      queriesData.push({ id: doc.id, ...doc.data() });
    });
    setQueries(queriesData);
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setInfo({
      ...info,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queriesRef = collection(db, 'queries');
    const queryData = {
      uid: user.uid,
      field1: info.field1,
      field2: info.field2,
      field3: info.field3,
      field4: info.field4,
      field5: info.field5,
      field6: info.field6,
      field7: info.field7,
      dropdown1: info.dropdown1,
      dropdown2: info.dropdown2,
    };
    const newQueryDoc = doc(queriesRef);
    await setDoc(newQueryDoc, queryData);

    if (info.file) {
      const storageRef = ref(storage, 'files/' + newQueryDoc.id);

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, info.file);

      // Get the download URL and update the Firestore document
      const fileUrl = await getDownloadURL(storageRef);
      await updateDoc(newQueryDoc, { file: fileUrl });
    }

    // Fetch the updated queries
    fetchQueries(user.uid);
  };

  const handleDelete = async (queryId) => {
    const queryToDelete = doc(db, 'queries', queryId);
    await deleteDoc(queryToDelete);
    fetchQueries(user.uid);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Bạn phải đăng nhập để xem trang này.</p>;
  }

  return (
    <div>
      <h1>Dữ Liệu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="field1"
          placeholder="Thuộc Tính Văn Bản"
          value={info.field1}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field2"
          placeholder="Số Hiệu Văn Bản"
          value={info.field2}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field3"
          placeholder="Ngày Ban Hành (dd/mm/yyyy)"
          value={info.field3}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field4"
          placeholder="Tên Văn Bản"
          value={info.field4}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field5"
          placeholder="Cơ Quan Ban Hành"
          value={info.field5}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field6"
          placeholder="Cấp Ban Hành"
          value={info.field6}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field7"
          placeholder="Cơ Quan Chủ Quản"
          value={info.field7}
          onChange={handleChange}
        />
        <select
          name="dropdown1"
          value={info.dropdown1}
          onChange={handleChange}
        >
          <option value="">Ghi Chú</option>
          {dropdown1Options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          name="dropdown2"
          value={info.dropdown2}
          onChange={handleChange}
        >
          <option value="">Loại</option>
          {dropdown2Options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Save</button>
      </form>
      <h2>Dữ liệu của tôi:</h2>
      <ul>
        {queries.map((query) => (
          <li key={query.id}>
            {query.field1}, {query.field2}, {query.field3}, {query.field4}, {query.field5}, {query.field6}, {query.field7}, {query.dropdown1}, {query.dropdown2}, {query.file}
            <a href={query.file}>
              <button>Xem file</button>
            </a>
            <button onClick={() => handleDelete(query.id)}>Xóa dữ liệu!</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;