import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";
import ForumReply from "../components/ForumReply";
import Forum from "./Forum";
import GAButton from '../components/Button'
import ForumNewReply from "../components/ForumNewReply";


const JobBoard = (props) => {
    return (
        <div className="">
            <DesktopNav />
            <h2>Thread: {props._id}</h2>
            <GAButton>Reply to this Forum</GAButton>
            <div className="flex-center-column">
                <ForumReply />
                <ForumReply />
            </div>
            <div className="flex-center-column">
                <ForumNewReply />
            </div>
        </div>
    )
}

export default JobBoard;