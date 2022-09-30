// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
setPersistence(auth, browserSessionPersistence);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
const storage = getStorage(firebaseapp);

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

//
export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth.email) return;
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
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error in creating: " + error.message);
    }
  }

  if (sessionStorage.getItem("UserDoc") == null) {
    const entry = await getDoc(userDocRef);
    sessionStorage.setItem(
      "UserDoc",
      JSON.stringify(entry._document.data.value.mapValue.fields)
    );
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const LoggedInUser = async () => {
  try {
    const data = JSON.parse(
      sessionStorage.getItem(
        `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
      )
    );
    return data;
  } catch (error) {
    console.log("error in loggedInUser: " + error.message);
    return null;
  }
};

export const signOutUser = () => {
  signOut(auth);
};
// ---------------------------------------
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.id.toLowercase());
    batch.set(docRef, obj);
  });
  await batch.commit();
  console.log("succesful batch commit");
};

// --------------------------------------
export const fetchQuestionsAndTutorials = async () => {
  const articleCollectionRef = collection(db, "Articles");
  const aq = query(articleCollectionRef);
  const articleSnaphsot = await getDocs(aq);
  const ArticleMap = articleSnaphsot.docs.reduce((acc, docSnapshot) => {
    const { ...items } = docSnapshot.data();
    console.log(docSnapshot);
    acc[docSnapshot.id] = items;
    acc[docSnapshot.id].date = new Date(acc[docSnapshot.id].date.seconds * 1000);
    return acc;
  }, {});

  const questionCollectionRef = collection(db, "Questions");
  const q = query(questionCollectionRef);
  const questionSnaphsot = await getDocs(q);
  console.log(questionSnaphsot);
  const QuestionMap = questionSnaphsot.docs.reduce((acc, docSnapshot) => {
    const { ...items } = docSnapshot.data();
    acc[docSnapshot.id] = items;
    acc[docSnapshot.id].date = new Date(acc[docSnapshot.id].date.seconds * 1000);
    return acc;
  }, {});
  return { questions: QuestionMap, articles: ArticleMap };
};

export const getUserData = async (ref) => {
  const snap = await getDoc(ref);
  return snap.data();
};
// ------------------------------------
export const uploadImage = async (img) => {
  if (img == null) return;
  const imageRef = ref(storage, `images/${uuidv4()}${img.name}`);
  await uploadBytes(imageRef, img);
  console.log("uploaded");
  return imageRef;
};
// ----------------------------------
export const uploadArticle = async (
  title,
  abstract,
  img,
  content,
  tags,
  author
) => {
  const imageRef = await uploadImage(img);
  const imgURL = await getDownloadURL(imageRef);
  console.log(imgURL);

  const ArticleObj = {
    date: new Date(),
    title: title,
    abstract: abstract,
    img: imgURL.toString(),
    content: content,
    tags: tags,
    author: author,
    rating: 0,
    rateCount: 0,
  };

  const docRef = await addDoc(collection(db, "Articles"), ArticleObj);

  return { ref: docRef, obj: ArticleObj };
};
// to update count / rating, we need count++, current + (new - current)/count= new rating

export const uploadQuestion = async (title, content, tags, author) => {
  const QuestionObj = {
    date: new Date(),
    title: title,
    content: content,
    tags: tags,
    author: author,
  };
  const docRef = await addDoc(collection(db, "Questions"), QuestionObj);
  return { ref: docRef, obj: QuestionObj };
};
