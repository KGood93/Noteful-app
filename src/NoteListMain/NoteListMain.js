import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import AddButton from '../AddButton/AddButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'

class NoteListMain extends React.Component {
  static contextType = ApiContext
  
  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <ErrorBoundary>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
            </ErrorBoundary>
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
          <br />
          Add Note
        </AddButton>
      </div>
    </section>
  )
  }
}

NoteListMain.defaultProps = {
  match: {
    params: {}
  }
}

NoteListMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
}

export default NoteListMain