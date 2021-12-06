import Button from "../components/Button";
import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { TextField, Stack } from "@mui/material";
import GAButton from "../components/Button";

const Login = (props) => {

    let history = useHistory();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event)=> {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('logged in!');
        setForm({
            username: "",
            password: ""
        })
        history.push("/my/home")
    }

    return (
        <div className="login-page">
            <h2>LOGO</h2>
            
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="center-items">
                        <TextField label="Username" onChange={handleChange} type="text" name="username" value={form.username} />
                        <TextField label="Password" onChange={handleChange} type="password" name="password" value={form.password} />
                        <GAButton type="submit">Log In</GAButton>   
                    </Stack>
                </form>
                <p>Not registered? <Link to="/create-account" className="colored-link">Create an Account</Link></p>
        </div>
    )
}

export default Login;