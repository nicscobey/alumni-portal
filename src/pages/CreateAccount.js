import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import GAButton from "../components/Button";
import { TextField, Stack, Select } from "@mui/material";
import DesktopNav from "../components/DesktopNav";
import {useAppState} from '../AppState'
import {useParams, useHistory} from 'react-router-dom'
import SelectGAProgram from '../components/SelectProgram'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';

const CreateAccount = (props) => {

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        program: "",
    });

    const history = useHistory()
    const [userData, setUserData] = useState(null)
    const {state, dispatch} = useAppState()

    useEffect(() => {
        if (userData) {
            const {token, user} = userData
            dispatch({type: "auth", payload: {token, email: user.email}})
            window.localStorage.setItem("auth", JSON.stringify({token, email: user.email}))
            history.push("/my/home")
        }
    }, [userData])

    const signup = async () => {
        return fetch(state.url + "/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: form.email, password: form.password, firstname: form.firstname, lastname: form.lastname, program: form.program})
        }).then((response) => response.json())
    }

    const handleChange = (event)=> {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (event.target.password.value !== event.target.confirmPassword.value) {
            alert('passwords must match!')
        }
        else {
            setForm({
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                confirmPassword: "",
                program: "",
            })
            signup().then((data) => {
                console.log(data)
                if (data.error === "User already exists") {
                    alert("User already exists!")
                }
                else {
                    props.history.push("/")
                }
            })
        }
    }

    function SelectGAProgram() {

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        };

        const GAprograms = [
        'Data Analytics',
        'Data Science',
        'Digital Marketing', 
        'Product Management', 
        'Software Engineering',
        'User Experience Design'
        ];
      
        return (
          <div>
            <FormControl sx={{ width: 500, textAlign: "left" }}>
              <InputLabel id="demo-multiple-checkbox-label">Program</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                name="program"
                value={form.program}
                onChange={handleChange}
                input={<OutlinedInput label="Program" />}
                // renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {GAprograms.map((program) => (
                  <MenuItem key={program} value={program}>
                    {/* <Checkbox checked={programs.indexOf(program) > -1} /> */}
                    <ListItemText primary={program} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );
      }

    return (
        <>
        <DesktopNav />
        <div className="create-account-page">
            <img alt="GA Logo" className="logo" src="https://ga-shop-production-herokuapp-com.global.ssl.fastly.net/assets/images/logo_1200_by_627_1QIVL.jpg" width="300px" />
            <h3>Create Account</h3>
            <form className="flex-column" onSubmit={handleSubmit}>
                <Stack spacing={2} className="center-items">
                    <TextField required onChange={handleChange} type="text" name="firstname" label="First Name" value={form.firstname} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="lastname" label="Last Name" value={form.lastname} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="email" label="Email" value={form.email} className="fixed-width-input" />
                    <TextField required  onChange={handleChange} type="password" name="password" label="Password" value={form.password} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="password" name="confirmPassword" label="Confirm password" value={form.confirmPassword} className="fixed-width-input" />
                    <SelectGAProgram name="program"/>
                    <TextField required multiline onChange={handleChange} type="text" name="bio" value={form.bio} label="Enter a quick bio about yourself" className="fixed-width-input" />  
                    <GAButton type="submit">Create Account</GAButton>
                </Stack>
            </form>
            <p>Already have an account? <Link to="/" className="colored-link">Sign In</Link></p>
        </div>
        </>
    )
}

export default CreateAccount;