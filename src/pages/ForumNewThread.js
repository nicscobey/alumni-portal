import Card from "../components/Card";
import DesktopNav from "../components/DesktopNav";
import ForumReply from "../components/ForumReply";
import Forum from "./Forum";
import GAButton from '../components/Button'
import ForumNewReply from "../components/ForumNewReply";
import { useState } from "react";
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from "dompurify";
import { Stack, TextField } from "@mui/material";
import ForumCloseModal from "../components/ForumCloseModal";
import { useAppState } from "../AppState";
import { useHistory } from "react-router-dom";



const JobBoard = (props) => {

    const [value, setValue] = useState('')
    const [showNewReply, setShowNewReply] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {state, dispatch} = useAppState()
    const {token, url} = state
    const history = useHistory()

    const [newForum, setNewForum] = useState({
        title: "",
        user_id: state.user_id, 
        firstname: state.first_name,
        lastname: state.last_name 
    })

    const [newForumreply, setNewForumreply] = useState({
        message: "",
        user_id: state.user_id, 
        forum_id: null
    })

    const handleChange = event => {
        const plainText = event.getCurrentContent().getPlainText() // for plain text
        const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
        // setValue(JSON.stringify(rteContent)) // store your rteContent to state
        console.log(event.getCurrentContent())
        console.log(rteContent)
        console.log(plainText)
        // console.log(plainText)
        setValue(draftToHtml(rteContent))
        // setValue(rteContent)
        // setValue(plainText)
        setNewForumreply({...newForumreply, message: draftToHtml(rteContent)})
        console.log(newForumreply)
    }

    const convertText = (str) => {
        const myHTML = str;
        const mySafeHTML = DOMPurify.sanitize(myHTML);
        return mySafeHTML
    }

    const updateTitle = (event) => {
        const newState = {...newForum, title: event.target.value}
        setNewForum(newState)
    }

    // const fetchData = async () => {
    //     console.log(newForum)
    //         console.log('submit form')
    //         console.log(state)
    //         console.log(url) 
    //         const response = await fetch(url + "/forums", {
    //             method: "post",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "bearer " + token,
    //             },
    //             body: JSON.stringify(newForum)
    //         }).then((response) => response.json())
    //         .then((forum) => {
    //             return forum.id
    //         })

    //         console.log(response) 
    //         // console.log(response.json())
    //         // return response.id
    // }

    const saveForumreply = props.saveForumreply
    // const saveForumreply = async (forum) => {
    //     console.log(newForumreply)

    //     console.log(url)
    //     console.log(url + "/replies")
    //     console.log(token)

    //     //Create first message as the first forumreply
    //     await fetch(url + "/replies", {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "bearer " + token,
    //         },
    //         // body: JSON.stringify(newForumreply)
    //         body: JSON.stringify({message: newForumreply.message, forum_id: forum.id, user_id: 4})
    //     })

    //     console.log({message: newForumreply.message, forum_id: forum.id, user_id: 4})
    //     console.log(state)
    //     console.log(newForumreply)
    // }

    const handleSubmit = async () => {
        if (newForum.title !== "") {
            // console.log(newForum)
            // console.log('submit form')
            // console.log(state)
            // console.log(url) 
            // const response = await fetch(url + "/forums", {
            //     method: "post",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: "bearer " + token,
            //     },
            //     body: JSON.stringify(newForum)
            // })

            // console.log(response)
            // console.log(response.json())


            console.log(newForum)
            console.log('submit form')
            console.log(state)
            console.log(url) 

            //Create new forum
            await fetch(url + "/forums", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token,
                },
                body: JSON.stringify(newForum)
            }).then((response) => response.json())
            .then((forum) => {
                console.log(forum.id)
                setNewForumreply({...newForumreply, forum_id: forum.id})
                // return forum.id
                saveForumreply(newForumreply.message, forum.id)
                history.push(`/my/forum/${forum.id}`)
            })

            // postForum()
            // console.log(postForum) 
            // console.log(newForumreply)

            const replyTest = {
                message: '<p>rock</p>\n',
                user_id: 2,
                forum_id: 1
            }
            // //Create first message as the first forumreply
            // await fetch(url + "/replies", {
            //     method: "post",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: "bearer " + token,
            //     },
            //     // body: JSON.stringify(newForumreply)
            //     body: JSON.stringify({...newForumreply, forum_id: forum.id})
            //     // body: JSON.stringify(replyTest)
            // })

            console.log(newForumreply)

            // let myData = await fetchData()
            // console.log(myData)
        }
        else {
            alert("Please choose a title")
        }
    }

    const redirect = () => {
        history.push("/my/forum")
      }

    // const toggleNewReply = () => {
    //     setShowNewReply(!showNewReply)
    //     console.log(showNewReply)
    // }

    // const NewThread = () => {
    //     return (
    //         <div className="flex-center-column">
    //             <ForumNewReply  handleChange={handleChange}/>
    //             <Stack direction="row" spacing={2}>
    //                 <GAButton>Post</GAButton>

    //                 <GAButton onClick={handleOpen}>Cancel</GAButton>
    //             </Stack>
                
    //             <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
    //         </div>
    //     )
    // }

    return (
        <div className="">
            <DesktopNav />
            <h2>Thread: is it possible to get the id already? probably not, since it's not saved. {props._id}</h2>
            <h2>New Thread</h2>
            <h2>Set a title</h2>
            <TextField label="Thread Title" onChange={updateTitle} value={newForum.title}></TextField>
            {/* <div className="flex-center-column">
                <ForumReply />
                <ForumReply />
            </div> */}
            {/* <NewThread/> */}


            <div className="flex-center-column">
                <ForumNewReply  handleChange={handleChange}/>
                <Stack direction="row" spacing={2}>
                    <GAButton onClick={handleSubmit}>Post</GAButton>

                    <GAButton onClick={handleOpen}>Cancel</GAButton>
                </Stack>
                
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
                {/* <h1>{value}</h1> */}
                {/* <div>{draftToHtml(value)}</div> */}
            </div>



            {/* <div className="flex-center-column">
                <ForumNewReply handleChange={handleChange}/>
                <div dangerouslySetInnerHTML={{ __html: convertText(value) }}/>
            </div> */}
            {open ? <ForumCloseModal open={open} handleOpen={handleOpen} handleClose={handleClose} action={redirect} /> : null }
        </div>
    )
}

export default JobBoard;