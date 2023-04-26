import React, { useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
  const [searchTerms, setSearchTerms] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    dropdown1: "",
    dropdown2: "",
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerms({
      ...searchTerms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queriesRef = collection(db, 'queries');
    let querySnapshot = await getDocs(queriesRef);

    const results = querySnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((doc) => {
        return Object.entries(searchTerms).every(([key, value]) => {
          if (!value) return true;
          return (
            doc[key] &&
            doc[key].toString().toLowerCase() === value.toString().toLowerCase()
          );
        });
      });

    setSearchResults(results);
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="field1"
          placeholder="Thuộc Tính Văn Bản"
          value={searchTerms.field1}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field2"
          placeholder="Số Hiệu Văn Bản"
          value={searchTerms.field2}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field3"
          placeholder="Ngày Ban Hành (dd/mm/yyyy)"
          value={searchTerms.field3}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field4"
          placeholder="Tên Văn Bản"
          value={searchTerms.field4}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field5"
          placeholder="Cơ Quan Ban Hành"
          value={searchTerms.field5}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field6"
          placeholder="Cấp Ban Hành"
          value={searchTerms.field6}
          onChange={handleChange}
        />
        <input
          type="text"
          name="field7"
          placeholder="Cơ Quan Chủ Quản"
          value={searchTerms.field7}
          onChange={handleChange}
        />
        <select
          name="dropdown1"
          value={searchTerms.dropdown1}
          onChange={handleChange}
        >
          <option value="">Ghi Chú</option>
          <option value="Quy Chế">Quy Chế</option>
          <option value="Quy Trình">Quy Trình</option>
          <option value="Quy Định">Quy Định</option>
          <option value="Quy Tắc">Quy Tắc</option>
          <option value="Kế Hoạch">Kế Hoạch</option>
          <option value="Chỉ Thị">Chỉ Thị</option>
          <option value="Hướng Dẫn">Hướng Dẫn</option>
          <option value="Chiến Lược">Chiến Lược</option>
          <option value="Khác">Khác</option>
        </select>
        <select
          name="dropdown2"
          value={searchTerms.dropdown2}
          onChange={handleChange}
        >
          <option value="">Loại</option>
          <option value="M">M</option>
          <option value="T">T</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                {result.field1}, {result.field2}, {result.field3}, {result.field4}, {result.field5}, {result.field6}, {result.field7}, {result.dropdown1}, {result.dropdown2}, {result.file}
                <a href={result.file}>
                  <button>View file</button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;