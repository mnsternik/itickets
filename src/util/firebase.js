import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBSL7PJYhMc0quTgzwDhg0h9Z3hhUX37h4",
    authDomain: "iticket-fd059.firebaseapp.com",
    databaseURL: "https://iticket-fd059-default-rtdb.firebaseio.com",
    projectId: "iticket-fd059",
    storageBucket: "iticket-fd059.appspot.com",
    messagingSenderId: "872168891840",
    appId: "1:872168891840:web:d38af9b0aeab7751d29425"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);