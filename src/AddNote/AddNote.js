import React from 'react'
import './AddNote.css'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

class AddNote extends React.Component {
    static contextType = ApiContext;

    static defaultProps = {
        history: {
            push: () => {}
        }
    }
    
    handleSubmit = event => {
        event.preventDefault();
        const note = {
            name: event.target['noteName'].value,
            content: event.target['noteContent'].value,
            folder: event.target['folderSelect'].value
        }
        console.log('Note: ', note);

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(note)
           })
           .then(res => {
               if (!res.ok) {
                   return res.json().then(event => Promise.reject(event))
               }
               return res.json()
           })
           .then(note => {
               this.context.AddNote(note)
               this.props.history.push(`/folder/${note.folder}`)
           })
           .catch(error => {
               console.error({ error })
           })
    }
    
    render() {
        const { folders=[] } = this.context;
        return (
            <section className='AddNote'>
            <h2>Add Note</h2>
            <NotefulForm className='NoteAddition' onSubmit={this.handleSubmit}>
                <div className="Note-name">
                    <label htmlFor="NoteName">Name</label>
                    <input 
                        type="text"
                        className="Note__control"
                        name="noteName"
                        id="noteName" />
                </div>
                <div className="Note-content">
                    <label htmlFor="NoteContent">Content</label>
                    <textarea 
                        name="noteContent"
                        id="noteContent">
                    </textarea>
                </div>
                <div className="folder-Select">
                    <label htmlFor="SelectFolder">Select Folder</label>
                    <select name="folderSelect" id="folderSelect">
                        <option value={null}>...</option>
                        {folders.map(folder => 
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                        )}
                    </select>
                </div>
                <div className="addition_button">
                    <button type="submit">
                        Add Note
                    </button>
                </div>
            </NotefulForm>
            </section>
        )
    }
}

export default AddNote