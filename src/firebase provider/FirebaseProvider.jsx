import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase/firebase.init";

export const AuthContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCredential.user);
    return userCredential.user;
  };

  const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCredential.user);
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    setCurrentUser(userCredential.user);
    return userCredential.user;
  };

  const loginWithGithub = async () => {
    const userCredential = await signInWithPopup(auth, githubProvider);
    setCurrentUser(userCredential.user);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, createUser, loginUser, loginWithGoogle, loginWithGithub, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default FirebaseProvider;
