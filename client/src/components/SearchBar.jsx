import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, lastSearched }) {
  const [city, setCity] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history.slice(0, 5));
  }, []);

  // Update city if lastSearched prop changes
  useEffect(() => {
    if (lastSearched) {
      setCity(lastSearched);
    }
  }, [lastSearched]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    // Add to search history if not already present
    if (!searchHistory.includes(city)) {
      const newHistory = [city, ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }

    onSearch(city);
  };

  const handleHistoryClick = (historicalCity) => {
    setCity(historicalCity);
    onSearch(historicalCity);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <div className="search-history-header">
            <h4>Recent Searches</h4>
            <button className="clear-history-button" onClick={clearHistory}>
              Clear
            </button>
          </div>
          <ul className="search-history-list">
            {searchHistory.map((item, index) => (
              <li key={index} onClick={() => handleHistoryClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;





// import React, { useState, useEffect } from 'react';
// import './SearchBar.css';

// function SearchBar({ onSearch, lastSearched }) {
//   const [city, setCity] = useState('');
//   const [searchHistory, setSearchHistory] = useState([]);

//   // Load search history from localStorage on component mount
//   useEffect(() => {
//     const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
//     setSearchHistory(history);
//   }, []);

//   // Update city if lastSearched prop changes
//   useEffect(() => {
//     if (lastSearched) {
//       setCity(lastSearched);
//     }
//   }, [lastSearched]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!city.trim()) return;
    
//     // Add to search history if not already present
//     if (!searchHistory.includes(city)) {
//       const newHistory = [city, ...searchHistory.slice(0, 4)];
//       setSearchHistory(newHistory);
//       localStorage.setItem('searchHistory', JSON.stringify(newHistory));
//     }
    
//     onSearch(city);
//   };

//   const handleHistoryClick = (historicalCity) => {
//     setCity(historicalCity);
//     onSearch(historicalCity);
//   };

//   return (
//     <div className="search-container">
//       <form onSubmit={handleSubmit} className="search-form">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name..."
//           className="search-input"
//         />
//         <button type="submit" className="search-button">
//           Search
//         </button>
//       </form>
      
//       {searchHistory.length > 0 && (
//         <div className="search-history">
//           <h4>Recent Searches</h4>
//           <ul>
//             {searchHistory.map((item, index) => (
//               <li key={index} onClick={() => handleHistoryClick(item)}>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;