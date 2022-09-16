// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV8NYxgMZkep9WQXc14grf5IpKsyR9Wtk",
  authDomain: "deakinatdev.firebaseapp.com",
  projectId: "deakinatdev",
  storageBucket: "deakinatdev.appspot.com",
  messagingSenderId: "115328968760",
  appId: "1:115328968760:web:7d15e631b2ed6d4496decd",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const signIn = (email,password) => signInWithEmailAndPassword(auth,email,password);

export const createUserDocFromAuth = async (userAuth,additionalInfo={}) => {
    if(!userAuth.email) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log("error in creating: " + error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email,password);
}
