const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.createUser = functions
    .region("australia-southeast1")
    .auth.user().onCreate((user) => {
        console.log("Creating user...");

        // Set user document
        const userRef = admin.firestore().collection("users").doc(user.uid);
        userRef.set({
            createdAt: new Date(user.metadata.creationTime),
            displayName: user.displayName,
            email: user.email,
        });

        // Update stats
        const statsRef = admin.firestore().collection("_var").doc("stats");
        statsRef.set({
            usersCreated: increment,
            users: increment
        }, { merge: true });

        console.log("User created!");
        return null;
    });

exports.deleteUser = functions
    .region("australia-southeast1")
    .auth.user().onDelete((user) => {
        console.log("Deleting user...");

        // Remove user document
        const userRef = admin.firestore().collection("users").doc(user.uid);
        userRef.delete();

        // Update stats
        const ref = admin.firestore().collection("_var").doc("stats");
        ref.set({ users: decrement }, { merge: true });

        console.log("User deleted!");
        return null;
    });
