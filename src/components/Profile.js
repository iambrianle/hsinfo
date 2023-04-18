import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    name: '',
    username: '',
    file: null,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchProfileInfo(user.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileInfo = async (uid) => {
    const docRef = firebase.firestore().collection('users').doc(uid);
    const doc = await docRef.get();
    if (doc.exists) {
      setInfo(doc.data());
    } else {
      setInfo({
        name: '',
        username: '',
        file: null,
      });
    }
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
    const docRef = firebase.firestore().collection('users').doc(user.uid);
    await docRef.set(info);

    if (info.file) {
      const storageRef = firebase.storage().ref('files/' + user.uid);
      const uploadTask = storageRef.put(info.file);
      uploadTask.on(
        'state_changed',
        null,
        (error) => console.error(error),
        () => {
          storageRef.getDownloadURL().then(async (url) => {
            await docRef.update({ file: url });
          });
        }
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={info.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={info.username}
          onChange={handleChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;