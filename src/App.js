import logo from './logo.svg';
import './App.css';
import UsersList from './components/UsersList/UsersList';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  return (<UsersList users={users} />);
}

export default App;
