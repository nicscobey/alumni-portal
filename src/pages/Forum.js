import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";
import ForumTable from "../components/ForumTable";
import GAButton from '../components/Button'
import { Link } from "react-router-dom";
import { useAppState } from "../AppState";


const Forum = () => {

    return (
        <div className="">
            <DesktopNav />
            <h2>Forum</h2>  
            <Link to="/my/forum/new"><GAButton>Start a New Post</GAButton></Link>
            <ForumTable />  
        </div>
    )
}

export default Forum;