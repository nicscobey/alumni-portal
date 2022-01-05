import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory } from 'react-router-dom';
import BasicMenu from './MenuItem';
import {useAppState} from '../AppState'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';

export default function DesktopNav() {

  const {state, dispatch} = useAppState()
  const history = useHistory()

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar className="toolbar" sx={{ flexGrow: 1, backgroundColor: "black"}}>
            <div className="toolbar-left">
              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton> */}
              {/* <Typography variant="h6"> */}
                {/* APPNAME */}
                <img src="https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/9142/thumb_CMYK-Red_Small_GeneralAssembly-Cog.png" width="60px" alt="GA Logo" />

              {/* </Typography> */}

              {state.token ? <>
                <div>
                  <Link to="/my/home">
                    <Button color="inherit">Home</Button>
                  </Link>
                </div>
                <BasicMenu label="Career Center" items={[
                  {label: "Application Tracker",
                  link: "/my/apptracker"},
                  {label: "Job Board",
                  link: "/my/job-board"},
                ]}/>
                <BasicMenu label="Alumni & Community" items={[
                  {label: "Alumni Database",
                  link: "/my/alumni"},
                  {label: "Community Forum",
                  link: "/my/forum"},
                ]}/>
              </> : null}

            </div>
            <div>
              {state.token ? null : <div><Link to="/signup"><Button color="inherit">Sign Up</Button></Link>
              <Link to="/"><Button color="inherit">Log In</Button></Link></div>}
              {state.token ? <>
                <IconButton color="inherit"><EmailIcon /></IconButton>
                <IconButton color="inherit" onClick={()=> {
                dispatch({type: "logout"})
                history.push("/")
              }}><LogoutIcon /></IconButton>
              </> : null}
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}