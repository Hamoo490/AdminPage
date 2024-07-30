
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc, orderBy, query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
    getDatabase, set, push, onValue, update, ref
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDW5Xtwl8J6LHE_UpJAS2WzkZtvBGwEAKw",
    authDomain: "excel-sheet-61f15.firebaseapp.com",
    projectId: "excel-sheet-61f15",
    storageBucket: "excel-sheet-61f15.appspot.com",
    messagingSenderId: "1057656406817",
    appId: "1:1057656406817:web:d440a1fe30919c1ede3460",
    measurementId: "G-64PGEB9FPW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export {
    app, db, update, getDoc, deleteDoc,
    database, set, push, onValue, collection, 
    addDoc, getDocs, setDoc, doc, updateDoc, orderBy, query
};