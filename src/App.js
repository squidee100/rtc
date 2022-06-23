import './App.css';
import { useEffect, useState } from 'react';
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import * as FirebaseService from "./services/firebase";
import { timeSince } from "./utils/timesince";

function App() {
	return (
		<div className="app">
			<button onClick={FirebaseService.SignIn}>Sign In</button>
			<UserCardList firebase={FirebaseService} />
		</div>
	);
}

function UserCardList(props) {
	const [users, setUsers] = useState([]);

	const { firebase } = props;

	useEffect(() => {
		onSnapshot(query(collection(firebase.db, "users"), orderBy("createdAt", "desc")), (snapshot) => {
			if (snapshot.size) {
				let users = [];
				snapshot.forEach(doc => {
					users.push({ id: doc.id, data: doc.data() });
				});
				setUsers(users);
			} else {
				// it's empty
			}
		});
	}, [firebase]);

	return (
		<div id="user-list">
			<h2>Registered Users</h2>

			{users.length
				? users.map(user => <UserCard user={user.data} key={user.id} />)
				: <div className="card">
					<h3>No users!</h3>
					<span>Create an account...</span>
				</div>
			}
		</div>
	);
}

function UserCard(props) {
	const { user } = props;
	const cleanTime = () => { return timeSince(new Date(user.createdAt.seconds * 1000)); }
	const [time, setTime] = useState(cleanTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(cleanTime());
		}, 60 * 1000);
		return () => clearInterval(interval);
	});

	return (
		<div className="card">
			<h3>{user.username}</h3>
			<span>Account created <b>{time} ago</b>!</span>
		</div>
	);
}

export default App;
