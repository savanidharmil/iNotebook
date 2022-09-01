import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000"; 
   const noteInitial = [];


   // Get all note 
   const getNotes = async () => {
    //API Call 
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: "GET",
        headers: {
            'content-type':'Application/json',
            'auth-token':localStorage.getItem("token")
        }
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
   }


   const [notes, setNotes] = useState(noteInitial)
   // Add a note 
   const addNote = async (title,description,tag) => {
    //API Call 
    const response = await fetch(`${host}/api/note/addnote`, {
        method: "Post",
        headers: {
            'content-type':'Application/json',
            'auth-token':localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
        console.log(json);
        setNotes(notes.concat(json));
        console.log("adding a new note");
   }

   // Delete a note
   const deleteNote = async (id) => {
        //API Call 
        console.log(`${host}/api/note/deletenote/${id}`);
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'content-type':'Application/json',
                'auth-token':localStorage.getItem("token")
            }
        });
        const json = response.json();
        console.log(json);

        const newNotes= notes.filter( (note) => {
            return note._id!==id;
        })
        setNotes(newNotes);
        console.log("Deleted Note"+id);
    }

   // Edit a note
    const editNote = async (id,title,description,tag) => {
        //API Call 
        console.log(title,description,tag);
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'content-type':'Application/json',
                'auth-token':localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to edit in client
        for(let index=0; index < newNotes.length; index++){
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;            
                break;
            }
        }
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes, addNote,deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;