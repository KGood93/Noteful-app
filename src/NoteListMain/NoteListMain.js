import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import AddButton from '../AddButton/AddButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder} from '../notes-helpers'
import './NoteListMain.css'

class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    
    static contextType = ApiContext

    render() {
        const { folderId } = this.props.match.params
        const {notes = [] } = this.context
        //const notesForFolder = getNotesForFolder(notes, folderId)
        return(
        <section className='NoteListMain'>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>
                        <Note 
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                        />
                    </li>    
                )}
            </ul>
            <div className='NoteListMain_ButtonContainer'>
                <AddButton
                    tag={Link}
                    to='/add-note'
                    type='button'
                    className='NoteListMain_AddNoteButton'
                >
                    <br/>
                    Note
                </AddButton>
            </div>
        </section>
    ) 
}
}

export default NoteListMain