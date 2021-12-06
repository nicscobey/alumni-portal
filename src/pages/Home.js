import Button from "../components/Button";
import GACard from "../components/Card";
import {Link} from 'react-router-dom'
import DesktopNav from "../components/DesktopNav";

const Profile = () => {
    return (
        <div className="">
            <DesktopNav />
            <h2>Career Center</h2>
                <GACard bgcolor="#F6F6F6" title="Application Tracker" description="Description of what this is. Description of what this is. Description of what this is. " path="/my/apptracker"/>
                <GACard bgcolor="#F6F6F6" title="Alumni Job Board" lastUpdated="DATE"  path="/my/job-board"/>
            <h2>Alumni & Community</h2>
                <GACard bgcolor="#F6F6F6" title="Alumni Database" description="Description of what this is. Description of what this is. Description of what this is. "  path="/my/alumni"/>
                <GACard bgcolor="#F6F6F6" title="Community Forum" lastUpdated="DATE"  path="/my/forum"/>
        </div>
    )
}

export default Profile;