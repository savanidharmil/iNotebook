const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');

//Rout:1 Get all the notes using: GET "/api/auth/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);           
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

//Rout:2 Add a new notes using: POST "/api/auth/addnotes". login required
router.post('/addnote', fetchuser , [
    body('title','Enter a valid title').isLength({ min: 3 }), 
    body('description','description must be atleast 5 charactors').isLength({ min: 5 }),], async (req, res)=>{
    try {
            
        const {title,description, tag } = req.body
        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag,user:req.user.id
        })
        console.log(note);
        const savedNote = await note.save();

        res.json(savedNote);
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

//Rout:3 Update an existing Note using: PUT "/api/auth/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
        // create new note object
        // console.log(req.body);
        const newNote = {}
        if(req.body.title){newNote.title = req.body.title};
        if(req.body.description){newNote.description = req.body.description};
        if(req.body.tag){newNote.tag = req.body.tag};

        // Find the note to be updated and update it 
        let note= await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")}

        //Allow Updation only if user owns this note
        if(note.user.toString() !== req.user.id){
            return  res.status(401).send("Not Allowed");
        }

        note= await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server  = "+error.message);
    }
})

//Rout:3 Delete an existing Note using: DELETEDelete/api/auth/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description,tag} = req.body;

        // Find the note to be deleted and deleted it 
        let note= await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")}

        //Allow Deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return  res.status(401).send("Not Allowed");
        }

        note= await Note.findByIdAndDelete(req.params.id);
        res.json({success:"Note hase been Deleted",note:note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
module.exports=router