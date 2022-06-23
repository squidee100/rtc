import logo from './logo.svg';
import './App.css';
import * as FirebaseService from "./services/firebase";
import { useEffect, useState } from 'react';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>

				<button onClick={FirebaseService.SignIn}>Sign In</button>
				<UserList userList={FirebaseService.userList} />
			</header>
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
