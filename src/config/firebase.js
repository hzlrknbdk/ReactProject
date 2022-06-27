import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";

const firebaseConfig = {
 
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

const booksRef = collection(db, "library");
const specialListRef = collection(db, "myspeciallibrary");

export const signUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateCurrentUser(auth, { displayName: name });
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password).then((data) => {
    console.log({ data: data._tokenResponse.idToken });
  });
};

export const updateFavorite = async (isFavorite, id) => {
  const favDoc = doc(db, "library", id);
  const updateField = { isFavorite: !isFavorite };
  await updateDoc(favDoc, updateField);
};

export const updateCart = async (isCart, id) => {
  const cartDoc = doc(db, "library", id);
  const updateField = { isCart: !isCart };
  await updateDoc(cartDoc, updateField);
};

export const updateBookCount = async (count, id, type) => {
  const cartDoc = doc(db, "library", id);
  let updateField = {};

  if (type === "inc") {
    updateField = { count: ++count };
  } else if (type === "desc") {
    updateField = { count: count === 1 ? 1 : --count };
  } else if (type === "none") {
    updateField = { count: 0 };
  } else if (type === "firstadd") {
    updateField = { count: 1 };
  }
  await updateDoc(cartDoc, updateField);
};

export const updateSpecialBook = async (product, id) => {
  const specialBook = doc(db, "myspeciallibrary", id);
  const updateField = {
    name: product.name,
    author: product.author,
    publisher: product.publisher,
    id: product.id,
  };
  await updateDoc(specialBook, updateField);
};

export const deleteUser = async (id) => {
  const userDoc = doc(db, "myspeciallibrary", id);
  await deleteDoc(userDoc);
};

export const useProductsListener = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return onSnapshot(booksRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
      });

      setProducts(docs);
    });
  }, []);

  return products;
};

export const useSpecialListListener = () => {
  const [specialList, setSpecialList] = useState([]);

  useEffect(() => {
    return onSnapshot(specialListRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
      });

      setSpecialList(docs);
    });
  }, []);

  return specialList;
};

export const createSpecialLibrary = async (formValues) => {
  await addDoc(specialListRef, formValues)
    .then((resp) => console.log(resp))
    .catch((err) => console.error(err))
    .finally(() => console.log("terminado"));
};
