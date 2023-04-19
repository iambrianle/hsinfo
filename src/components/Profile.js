import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection } from "firebase/firestore";
import { ref } from "firebase/storage";
import { auth } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';




const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    country: "",
    phoneNumber: "",
    email: "",
    bio: "",
    file: null,
  });


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    const userRef = doc(db, 'users', uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      setInfo(userData.data());
    } else {
      setInfo({
        firstName: "",
        lastName: "",
        username: "",
        age: "",
        country: "",
        phoneNumber: "",
        email: "",
        bio: "",
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
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      firstName: info.firstName,
      lastName: info.lastName,
      firstNameLowerCase: info.firstName.toLowerCase(),
      lastNameLowerCase: info.lastName.toLowerCase(),
      username: info.username,
      age: info.age,
      country: info.country,
      phoneNumber: info.phoneNumber,
      email: info.email,
      bio: info.bio,
    };
    await setDoc(userRef, userData);

    if (info.file) {
      const storageRef = ref(storage, 'files/' + user.uid);

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, info.file);

      // Get the download URL and update the Firestore document
      const fileUrl = await getDownloadURL(storageRef);
      await updateDoc(userRef, { file: fileUrl });
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
          name="firstName"
          placeholder="First Name"
          value={info.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={info.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={info.username}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={info.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={info.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={info.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={info.email}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={info.bio}
          onChange={handleChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;