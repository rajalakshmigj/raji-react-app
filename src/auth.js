import {auth, PhoneAuthProvider} from "./firebase";
import { createUserWithEmailAndPassword,signInWithCredential, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, signInWithPhoneNumber} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithPhoneNumber = async  (phone) => {
    return signInWithPhoneNumber(auth, phone);
};

export const doSignInWithCredential = async (credential) => {
    return signInWithCredential(auth, credential); // Import signInWithCredential
};

// export const doSignInWithGoogle = async (email, password) => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     return result;
// };

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};