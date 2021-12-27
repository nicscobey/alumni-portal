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
              <Typography variant="h6">
                APPNAME
              </Typography>

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
              {state.token ? null : <div><Link to="/auth/signup"><Button color="inherit">Sign Up</Button></Link>
              <Link to="/auth/login"><Button color="inherit">Log In</Button></Link></div>}
              {state.token ? <Button onClick={()=> {
                dispatch({type: "logout"})
                history.push("/auth/login")
              }}>Log Out</Button> : null}
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}