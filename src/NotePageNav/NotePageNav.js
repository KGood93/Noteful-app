import React from 'react'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'
import PropTypes from 'prop-types'

class NotePageNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
    <div className='NotePageNav'>
        <button
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <br />
        Back
      </button>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
  }
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  },
  match: {
    params: {}
  }
}

NotePageNav.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.object
  })
}

export default NotePageNav