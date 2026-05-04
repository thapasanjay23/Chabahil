import { useState } from 'react';

function App() {
  const [licenseNo, setLicenseNo] = useState('');
  const [name, setName] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`https://your-vercel-backend-url/search?license_no=${licenseNo}`);
    const data = await res.json();
    setName(data.name || 'Not found');
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
      <button onClick={handleSearch}>Search</button>
      {name && <p>Name: {name}</p>}
    </div>
  );
}

export default App;