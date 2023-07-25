import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX57JHNYeq0Ip7zUcc4oKNg4fk_-mVmZQ",
  authDomain: "chat-aa6df.firebaseapp.com",
  projectId: "chat-aa6df",
  storageBucket: "chat-aa6df.appspot.com",
  messagingSenderId: "494875232654",
  appId: "1:494875232654:web:8bfa01f5cbbb04f1f03cdf",
  measurementId: "G-SHQ6WFSBHW",
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
