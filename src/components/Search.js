import React, { useState } from 'react';
import firebase from '../firebase';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    const usersRef = firebase.firestore().collection('users');

    const nameResults = await usersRef
      .where('name', '==', query)
      .get();
    const usernameResults = await usersRef
      .where('username', '==', query)
      .get();

    const results = [...nameResults.docs, ...usernameResults.docs].map(doc => {
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
                <h3>{result.name}</h3>
                <p>Username: {result.username}</p>
                {result.file && (
                  <p>
                    File:{' '}
                    <a href={result.file} target="_blank" rel="noopener noreferrer">
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