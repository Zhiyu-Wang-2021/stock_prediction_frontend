import React, {useState,createContext} from 'react';

export const AppContext = createContext({});

function UserProvider({children}) {
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    return (
        <AppContext.Provider value={{hasLoggedIn, setHasLoggedIn}}>
            {children}
        </AppContext.Provider>
    );
}

export default UserProvider;