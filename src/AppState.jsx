import React, {useReducer, useContext} from 'react'

////// INITIAL STATE

const initialState = {
    url: "http://alumni-portal-back-end.herokuapp.com",
    // url: "http://localhost:3000",
    token: null,
    email: null, 
    user_id: null,
    first_name: null,
    last_name: null, 
    bio: null
}

///// REDUCER
// action = {type: "", payload: ---}
// const reducer = (state, action) => {

//     // console.log(state)
//     // console.log(action)

//     switch (action.type){
//         case "signup": 
//             fetch(state.url + "/users/", {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(action.payload)
//             })
//             .then(response => response.json())
//             .then(user => {
//                 console.log('no')
//                 return {
//                     ...state,
//                     token: user.token,
//                     email: user.email
//                 }
//             })
//         break
//         case "login": 
//         fetch(state.url + "/login/", {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(action.payload)
//         })
//         .then(response => response.json())
//         .then(user => {
//             console.log('hey')
//             return {
//                 ...state,
//                 token: user.token,
//                 email: user.email
//             }
//         })
//         break
//         default: 
//             console.log('hi')
//             return state 
//     }
// }

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth":
            newState = {...state, ...action.payload}
            return newState
        case "logout": 
            newState = {...state, token: null, email: null}
            window.localStorage.removeItem("auth")
            return newState
        default:
            return state
    }
}

////// AppContext

const AppContext = React.createContext(null)

export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    // console.log(dispatch) 

    return <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
}

////// useAppState Hook

export const useAppState = () => {
    return React.useContext(AppContext)
}