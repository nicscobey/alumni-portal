import DesktopNav from "../components/DesktopNav";
import ForumTable from "../components/ForumTable";
import GAButton from '../components/Button'
import { Link } from "react-router-dom";


const Forum = () => {

    return (
        <div className="">
            <DesktopNav />
            <h2>Community Forum</h2>  
            <h3>Welcome to our GA community forum! Ask a question or read and respond to an existing thread.</h3>
            <Link to="/my/forum/new"><GAButton>Start a New Post</GAButton></Link>
            <ForumTable />  
        </div>
    )
}

export default Forum;