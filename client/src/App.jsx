import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    fetchDogImage();
  }, []);

  const fetchDogImage = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/dog')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDogImage(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dog image:', error);
        setError('Error fetching dog image. Please try again later.');
        setLoading(false);
      });
  };

  const handleBuy = () => {
    if (dogImage) {
      setPurchasedItems([...purchasedItems, dogImage]);
      alert('Dog image purchased successfully!');
    } else {
      alert('No dog image to purchase. Fetch a new dog image first.');
    }
  };

  return (
    <div className="App">
      <h1>Random Dog Image</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="dog-container">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <>
            <img src={dogImage} alt="Dog" className="dog-image" />
            <br />
            <button className="buy-button" onClick={handleBuy} disabled={loading || !dogImage}>
              Buy Dog Image
            </button>
          </>
        )}
        <button className="fetch-button" onClick={fetchDogImage} disabled={loading}>
          Fetch New Dog
        </button>
      </div>
      <div className="purchased-items">
        <h2>Purchased Items</h2>
        {purchasedItems.length === 0 ? (
          <p>No items purchased yet.</p>
        ) : (
          <ul>
            {purchasedItems.map((item, index) => (
              <li key={index}>
                <img src={item} alt="Purchased Dog" className="purchased-dog-image" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
