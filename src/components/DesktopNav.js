import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import BasicMenu from './MenuItem';

export default function DesktopNav() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
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
            </div>
            <div>
              <Button color="inherit">Login</Button>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}