import './App.css';
import { useEffect, useState } from 'react';

function App() {
	return (
		<div className="app">
		</div>
	);
}

function UserList({ userList }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		setUsers(userList);
		console.log(userList);
	}, [userList]);

	return (
		<span>{users.toString()}</span>
	);
}

export default App;
