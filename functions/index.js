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

exports.createUser = functions.auth.user().onCreate(() => {
    console.log("+1");
    const increment = admin.firestore.FieldValue.increment(1);

    var ref = admin.firestore().collection("_var").doc("stats");
    ref.update({
        usersCreated: increment,
        users: increment
    });

    return null;
});

exports.deleteUser = functions.auth.user().onDelete(() => {
    console.log("-1");
    const decrement = admin.firestore.FieldValue.increment(-1);

    var ref = admin.firestore().collection("_var").doc("stats");
    ref.update({ users: decrement });

    return null;
});
