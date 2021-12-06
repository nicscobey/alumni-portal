import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";
import ForumTable from "../components/ForumTable";
import GAButton from '../components/Button'

const Forum = () => {
    return (
        <div className="">
            <DesktopNav />
            <h2>Forum</h2>  
            <GAButton>Start a New Post</GAButton>
            <ForumTable />  
        </div>
    )
}

export default Forum;