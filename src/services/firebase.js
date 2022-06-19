import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator, doc, collection, query, where, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth, GithubAuthProvider, signInWithPopup, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCi74wfC4xwuoUY2OxOdYl-1SsmnitFyqs",
	authDomain: "squidcord-cd4f0.firebaseapp.com",
	projectId: "squidcord-cd4f0",
	storageBucket: "squidcord-cd4f0.appspot.com",
	messagingSenderId: "567143886178",
	appId: "1:567143886178:web:5d5ac1931d141722c7503b",
	measurementId: "G-JTEPT886B7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Init emulators
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");

const provider = new GithubAuthProvider();

export function SignIn() {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;

			VerifyUser(user)
				.then(res => !res && CreateUser(user));
				
		}).catch((error) => {
			//TODO Redirect to error page... or open error modal
		});
}

//TODO Cloud function
async function VerifyUser(user) {
	const ref = doc(db, "users", user.uid);
	const docSnap = await getDoc(ref);

	return docSnap.data();
}

async function CreateUser(user) {
	const ref = doc(db, "users", user.uid);
	const userDoc = await setDoc(ref, {
		
	});
}
