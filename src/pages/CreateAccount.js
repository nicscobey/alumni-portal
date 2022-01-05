import Button from "../components/Button";
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
// import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const CreateAccount = (props) => {
    console.log(props);

    const [form, setForm] = useState({
        email: "",
        // confirmUsername: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        program: "",
    });

    const [programs, setPrograms] = useState(null);



    ////////////

    const history = useHistory()

    const [userData, setUserData] = useState(null)

    const {state, dispatch} = useAppState()

    useEffect(() => {
        // if (userData && userData.error) {
        //     console.log(userData)
        //     alert('Invalid username or password')
        // }
        if (userData) {
            console.log(userData)
            // if (userData.error) {
            //     console.log('hey')
            // }
            const {token, user} = userData
            dispatch({type: "auth", payload: {token, email: user.email}})
            window.localStorage.setItem("auth", JSON.stringify({token, email: user.email}))
            history.push("/my/home")
        }
    }, [userData])

    const signup = async () => {
        console.log(form)
        console.log(JSON.stringify(form))
        // console.log(programs)
        console.log({email: form.email, password: form.password, firstname: form.firstname, lastname: form.lastname, program: form.program})
        console.log({email: form.email, password: form.password, firstname: form.firstname, lastname: form.lastname, program: form.program})
        return fetch(state.url + "/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: form.email, password: form.password, firstname: form.firstname, lastname: form.lastname, program: form.program})
        }).then((response) => response.json())
    }

    /////////////



    const handleChange = (event)=> {
        setForm({...form, [event.target.name]: event.target.value})
        // if (event.target.name === "selectProgram") {
        //     setForm({...form, [event.target.name]: event.target.value})
        // }
        console.log(form)
        console.log(event.target.name)
        console.log(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(event.target);
        // alert('created account!!');
        // setForm({
        //     username: "",
        //     confirmUsername: "",
        //     password: "",
        //     confirmPassword: ""
        // })

        // if (event.target.username.value !== event.target.confirmUsername.value) {
        //     // console.log(event.target.username.value, event.target.confirmUsername.value)
        //     alert('usernames must match!')
        // }

        //check if email already exists

        // const response = await fetch(state.url + "/users")
        // const data = await response.json()
        // console.log(response)
        // console.log(data)


        if (event.target.password.value !== event.target.confirmPassword.value) {
            alert('passwords must match!')
            // console.log(event.target.password.value, event.target.confirmPassword.value)
        }
        // else if (programs.length === 0) {
        //     alert('Please select at least 1 GA Program!')
        // }
        else {
            setForm({
                email: "",
                // confirmUsername: "",
                firstname: "",
                lastname: "",
                password: "",
                confirmPassword: "",
                program: "",
            })
            // props.history.push("/")
            signup().then((data) => {
                console.log(data)
                if (data.error === "User already exists") {
                    alert("User already exists!")
                }
                else {
                    // setUserData(data)
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
      
        // const handleChange = (event) => {
        //   const {
        //     target: { value },
        //   } = event;
        //   setPrograms(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        //   );

        //   console.log(programs)
        // };
      
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
            <img className="logo" src="https://ga-shop-production-herokuapp-com.global.ssl.fastly.net/assets/images/logo_1200_by_627_1QIVL.jpg" width="300px" />
            {/* <h2>LOGO</h2> */}
            <h3>Create Account</h3>
            <form className="flex-column" onSubmit={handleSubmit}>
                <Stack spacing={2} className="center-items">
                    <TextField required onChange={handleChange} type="text" name="firstname" label="First Name" value={form.firstname} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="lastname" label="Last Name" value={form.lastname} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="text" name="email" label="Email" value={form.email} className="fixed-width-input" />
                    {/* <TextField required onChange={handleChange} type="text" name="confirmUsername" label="Confirm username" value={form.confirmUsername} className="fixed-width-input" /> */}
                    <TextField required  onChange={handleChange} type="password" name="password" label="Password" value={form.password} className="fixed-width-input" />
                    <TextField required onChange={handleChange} type="password" name="confirmPassword" label="Confirm password" value={form.confirmPassword} className="fixed-width-input" />
                    <SelectGAProgram name="program"/>
                    <TextField required multiline onChange={handleChange} type="text" name="bio" value={form.bio} label="Enter a quick bio about yourself" className="fixed-width-input" />  
                    <GAButton type="submit">Create Account</GAButton>
                </Stack>
            </form>
            <p>Already have an account? <Link to="/" className="colored-link">Sign In</Link></p>
            {/* <GAButton>HELLO</GAButton> */}

        </div>
        </>
    )
}

export default CreateAccount;