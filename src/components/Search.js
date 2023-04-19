import React, { useState } from 'react';
import { collection } from "firebase/firestore";
import { query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryText = searchTerm.trim();
    const usersRef = collection(db, 'users');
  
    const firstNameQuery = query(usersRef, where('firstNameLowerCase', '==', queryText.toLowerCase()));
    const lastNameQuery = query(usersRef, where('lastNameLowerCase', '==', queryText.toLowerCase()));
    const usernameQuery = query(usersRef, where('username', '==', queryText.toLowerCase()));
  
    const firstNameResults = await getDocs(firstNameQuery);
    const lastNameResults = await getDocs(lastNameQuery);
    const usernameResults = await getDocs(usernameQuery);
  
    const results = [
      ...firstNameResults.docs,
      ...lastNameResults.docs,
      ...usernameResults.docs,
    ].map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by name or username"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3>{result.firstName} {result.lastName}</h3>
                <p>Username: {result.username}</p>
                <p>Age: {result.age}</p>
                <p>Country: {result.country}</p>
                <p>Phone Number: {result.phoneNumber}</p>
                <p>Email: {result.email}</p>
                <p>Bio: {result.bio}</p>
                {result.file && (
                  <p>
                    File:{' '}
                    <a
                      href={result.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;