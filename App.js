import { useState } from 'react';

function App() {
  const [licenseNo, setLicenseNo] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://chabahil.vercel.app/search?license_no=${licenseNo}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setName(data.name || 'Not found');
    } catch (err) {
      setError('Error fetching data');
      setName('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>License Search</h1>
      <input
        type="text"
        placeholder="Enter License No"
        value={licenseNo}
        onChange={(e) => setLicenseNo(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {name && <p>Name: {name}</p>}
    </div>
  );
}

export default App;