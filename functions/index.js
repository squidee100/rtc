const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.auth.user().onCreate((user) => {
    console.log("Creating user...");

    // Set database document
    var userRef = admin.firestore().collection("users").doc(user.uid);
    userRef.set({
        createdAt: user.metadata.creationTime,
        displayName: user.providerData[0].screenName, 
        email: user.email,
    });
    
    // Update stats
    const increment = admin.firestore.FieldValue.increment(1);

    var statsRef = admin.firestore().collection("_var").doc("stats");
    statsRef.set({
        usersCreated: increment,
        users: increment
    }, { merge: true });

    console.log("User created!");
    return null;
});

exports.deleteUser = functions.auth.user().onDelete(() => {
    console.log("Deleting user...");

    // Remove database document
    
    // Update stats
    const decrement = admin.firestore.FieldValue.increment(-1);

    var ref = admin.firestore().collection("_var").doc("stats");
    ref.set({ users: decrement }, { merge: true });

    console.log("User deleted!");
    return null;
});
