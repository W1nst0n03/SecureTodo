import React, { useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrUser(user);
        })
        
        return unsubscribe;
    }, [])
    
    async function register(email, password, displayName) {
        try {
            // Create user then give them corresponding display name
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, { displayName: displayName});
            });
        } catch(err) {
            return err;
        }
    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        return auth.signOut();
    }

    async function passwordReset(email) {
        return sendPasswordResetEmail(auth, email);
    }

    const value = { 
        currUser,
        register,
        login,
        logout,
        passwordReset
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
