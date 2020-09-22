const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// to check db to make sure the alias is unique

exports.checkAlias = functions.https.onCall((data, context) => {
  // on call means we can call it from front end. then when we do call it, when it fires,
  // we get a data property and the context, for user auth
  const ref = admin.firestore().collection('users').doc(data.slug);
  return ref.get().then(doc => {
    return {  unique: !doc.exists}
  }).catch(err => {
    throw new functions.https.HttpsError('failed to connect')
  })

})