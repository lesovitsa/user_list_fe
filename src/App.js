import logo from './logo.svg';
import './App.css';
import UsersList from './components/UsersList/UsersList';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/users/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrPage(data.page);
        setUsers(data.users);
      });
  }, []);

  return (<UsersList users={users} setUsers={setUsers} currPage={currPage} setCurrPage={setCurrPage} />);
}

export default App;
