import React, { Component } from 'react'
import AddButton from '../AddButton/AddButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder} from '../notes-helpers'
import './NotePageNav.css'

class NotePageNav extends Component{
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;
    
    render() {
        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return(
        <div className='NotePageNav'>
            <AddButton
                tag='button'
                role='link'
                onClick={() => this.props.history.goBack()}
                className='NotePageNav_back-button'
            >
                <br />
                Back
            </AddButton>
            {folder && (
                <h3 className='NotePageNav_folder-name'>
                    {folder.name}
                </h3>
            )}
        </div>
    )
}
}

export default NotePageNav