import { useState, useEffect } from "react";
import {useAppState} from '../AppState'
import {useParams, useHistory} from 'react-router-dom'

const Auth = (props) => {

    // const {page} = useParams()
    // console.log(form)
    // console.log(props)

    console.log(props)

    const history = useHistory()

    const type = useParams().form
    // console.log(type)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [userData, setUserData] = useState(null)

    const {state, dispatch} = useAppState()

    useEffect(() => {
        if (userData) {
            console.log(userData)
            const {token, user} = userData
            dispatch({type: "auth", payload: {token, email: user.email}})
            window.localStorage.setItem("auth", JSON.stringify({token, email: user.email}))
            history.push("/my/home")
        }
    }, [userData])

    const actions = {
        signup: () => {
            return fetch(state.url + "/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        login: () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        }
    }

    // const actions = {
    //     signup: {  
    //         type: "signup",
    //         payload: formData
    //     }, 
    //     login: {
    //         type: "login",
    //         payload: formData
    //     }
    // }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // const handleSubmit = (event) => {
    //     event.prevent Default()
    //     // console.log(dispatch, actions)
    //     dispatch(actions[type])
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(dispatch, actions)
        actions[type]().then((data) => {
            setUserData(data)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <input type="submit" value={type} />
            </form>
        </div>
    )

    return <h1>hi</h1>

}

export default Auth