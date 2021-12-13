import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useReducer } from "react";
import { BACKEND_URI } from "./App";


const GlobalContext = createContext(undefined);
const GlobalContextDispatch = createContext(undefined);
const initialState = {
    user: null,
    token: null
};

function GlobalReducer(state, action) {
    switch (action.type) {
        case "LOGIN": {
            const userDetails = jwtDecode(action.payload);
            return {
                ...state,
                user: { ...userDetails },
                token: action.payload
            };
        }
        case "LOGOUT":
            localStorage.clear();

            window.location.href = `${BACKEND_URI}/logout`
            return { ...state };

        case "UPDATE_USER":
            const userDetails = jwtDecode(action.payload);
            return {
                ...state,
                user: { ...state.user, ...userDetails },
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    return (
        <GlobalContext.Provider value={state}>
            <GlobalContextDispatch.Provider value={dispatch}>{children}</GlobalContextDispatch.Provider>
        </GlobalContext.Provider>
    );
}

export function useGlobalState() {
    const context = useContext(GlobalContext);

    if (context === undefined) {
        throw new Error("GlobalState must be used within a GlobalProvider");
    }

    return context;
}

export function useGlobalDispatch() {
    const context = useContext(GlobalContextDispatch);

    if (context === undefined) {
        throw new Error("GlobalDispatch must be used within a GlobalProvider");
    }

    return context;
}