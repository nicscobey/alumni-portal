import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";


const JobBoard = (props) => {
    return (
        <div className="">
            <DesktopNav />
            <h2>Forum Post {props._id}</h2>
        </div>
    )
}

export default JobBoard;