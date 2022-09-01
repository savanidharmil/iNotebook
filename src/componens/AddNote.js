import React,{useContext, useState} from 'react'
import NoteContext from '../context/notes/noteContext';

function Addnote(props) {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote]=useState({title:"", description:"",tag:""});
    
    const handleClick= (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success");
    }

    const onChange= (e) =>{
        setNote({...note, [e.target.name]:e.target.value}); 
    }
  return (
    <div>
      <h1>Add A Note</h1>
            <form className='my-3'>
            <div className="mb-3 row">
                    <label htmfor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmfor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmfor="description" className="col-sm-2 col-form-label"  >Tag</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                </div>
                <button type='button' className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
    </div>
  )
}

export default Addnote
