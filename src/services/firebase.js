import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
export const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export function SignIn() {
	signInWithPopup(auth, provider)
		.then((result) => {

		}).catch((error) => {
			//TODO Redirect to error page... or open error modal
		});
}
