////Firebase
import { initializeApp } from "firebase/app";
import { getDatabase,} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDExD48FkQXTPknLHBinnU8EaQEZKxK7vE",
  authDomain: "qsat-db.firebaseapp.com",
  databaseURL: "https://qsat-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qsat-db",
  storageBucket: "qsat-db.firebasestorage.app",
  messagingSenderId: "84227044871",
  appId: "1:84227044871:web:7cbb1b0ca996e41c9f1ca2",
  measurementId: "G-15N7Q273LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

export const database = getDatabase(app);