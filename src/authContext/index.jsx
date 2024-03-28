import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

 function Authprovider ( {children }){
    const [currentUser, setCurrentUser ] = useState(null);
    const [userLoggedIn, setUserLoggedIn ] = useState(false);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        .catch(error => {
            console.error("Error initializing user:", error);
            setLoading(false);
        });

    return () => {
        unsubscribe()
            .catch(error => console.error("Error unsubscribing from auth state changes:", error));
    };
    }, [])

    async function initializeUser(user){
        try {
        if(user) {
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
    } catch (error) {
        console.error("Error initializing user:", error);
    } finally {
        setLoading(false);
    }
    }

    const value = {
        currentUser, 
        userLoggedIn,
        loading
    }
    
    return(
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    )

}

export default Authprovider;
