import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard'; // We will create this next

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If logged in, show the Dashboard. If not, show the Login page.
  return (
    <>
      {isLoggedIn ? (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;