import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getFavouriteCountries } from '../store/favouritesSlice';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoEHznZ1yGPDimK0JVzFdw3JgjlXiNY24",
  authDomain: "countries-react23s-dedc6.firebaseapp.com",
  projectId: "countries-react23s-dedc6",
  storageBucket: "countries-react23s-dedc6.appspot.com",
  messagingSenderId: "537534789073",
  appId: "1:537534789073:web:01e751aa33f4bd90ff9cf0"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// get access to the project authentication
const auth = getAuth(app);
// get access to the project database
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    console.log(email);
    console.log(password);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const logout = () => {
  auth.signOut();
  location.reload();
};

export const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { name });
  } catch (err) {
    console.error('Unable to  add favourite country to the database: ', err);
  }
};

export const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error('Unable to  remove favourite from the database');
      return;
    }
    const query = query(collection(db, `users/${uid}/favourites`), where('name', '==', name));
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (err) {
    console.error('Unable to  remove favourite country from the database: ', err);
  }
};

export const clearFavouritesFromFirebase = async (uid) => {
  try {
    const query = query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (err) {
    console.error('Unable to remove favourites from the database: ', err);
  }
};

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const query = await getDocs(collection(db, `users/${user.uid}/favourites`));
    const favourites = query.docs.map((doc) => doc.data().name);
    dispatch(getFavouriteCountries(favourites));
  }
};

export { auth, db, registerWithEmailAndPassword };
