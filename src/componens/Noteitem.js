import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import '../App.css';

function Noteitem(props) {
    const context=useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
    // console.log(note);
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <div className='d-flex align-item-center'>
                    <h5 className="card-title">{note.title} {note.tag}</h5>
                    <i className="fa fa-trash mx-2" aria-hidden="true" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success");}}></i>
                    <i className="fa fa-pencil-square-o mx-2" aria-hidden="true" onClick={()=>{updateNote(note)}}></i>                    
                </div>
                <p className="card-text">{note.description}</p> 
            </div>
        </div>
    </div>
  )
}

export default Noteitem
