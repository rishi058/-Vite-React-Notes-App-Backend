import { Note } from "../models/notes.model.js";
import { User } from "../models/user.model.js";

export const getNotes = async (req, res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
    
        let myList = [];
        for(let i = 0; i<user.notes_list.length; i++){
            const myNote = await Note.findById(user.notes_list[i]);
            if(myNote) {myList.push(myNote); }
        }

        res.status(200).json({username: user.name, data_count: myList.length, data : myList});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

};

export const updateNote = async (req, res) => {
    try{
        const {_id, title, content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            _id, 
            { title, content }, // ES6 shorthand syntax for { title: title, content: content }
            { new: true, runValidators: true } // Options: return the updated object and run schema validators
        );

        // Check if the note was found and updated
        if (!updatedNote) {
            res.status(404).json({ message: "Error, Note not found" });
        }
        else{
            res.status(200).json({message: "Note updated successfully"});
        }
    } catch (e) {
        res.status(500).json({message: e.message });
    }
};

export const deleteNote = async(req, res) => {
    try{
        const { id } = req.query;

        console.log(id);

        if (!id) {
            res.status(400).json({ message: "Note ID is required" });
        }
        else{
            const deletedNote = await Note.findByIdAndDelete(id);

            if (!deletedNote) {
                res.status(404).json({ message: "Note not found" });
            }
            else{
                res.status(200).json({ message: "Note deleted successfully" });
            }   
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const addNote = async(req, res) => {
    try{
        const userId = req.userId;
        const note = await Note.create(req.body);
        const noteId = note._id;

        await User.findByIdAndUpdate(
            userId,
            { $push: { notes_list: noteId } },
            { new: true, useFindAndModify: false }
        );

        // Return a response
        res.status(200).json({message: 'Note added successfully', data: note});

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};