import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDOeewSrryiTQwQgZPKSZYyfGxM9BxcW6g",
  authDomain: "amzn-clone-yazeed-alkhalaf.firebaseapp.com",
  databaseURL: "https://amzn-clone-yazeed-alkhalaf.firebaseio.com",
  projectId: "amzn-clone-yazeed-alkhalaf",
  storageBucket: "amzn-clone-yazeed-alkhalaf.appspot.com",
  messagingSenderId: "864228083597",
  appId: "1:864228083597:web:15169f7181bc4ec3731fc4",
  measurementId: "G-KC8GFE08VP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
