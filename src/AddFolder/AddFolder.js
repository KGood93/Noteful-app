import React from 'react'
import './AddFolder.css'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'

class AddFolder extends React.Component {
    static contextType = ApiContext;

    static defaultProps = {
        history: {
            push: () => {}
        }
    }
    
    handleSubmit = event => {
        event.preventDefault();
        const folderName = {
            name: event.target['FolderName'].value
        }
        console.log('Name: ', folderName);

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(folderName)
           })
           .then(res => {
               if (!res.ok) {
                   return res.json().then(event => Promise.reject(event))
               }
               return res.json()
           })
           .then(folder => {
               this.context.addFolder(folder)
               this.props.history.push(`/folder/${folder.id}`)
           })
           .catch(error => {
               console.error({ error })
           })
    }
    
    render() {
        return (
            <section className='AddFolder'>
            <h2>Add Folder</h2>
            <NotefulForm className='FolderAddition' onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="FolderName">Folder Name</label>
                    <input 
                        type="text"
                        className="folder__control"
                        name="FolderName"
                        id="FolderName" />
                </div>
                <div className="addition_button">
                    <button type="submit">
                        Add Folder
                    </button>
                </div>
            </NotefulForm>
            </section>
        )
    }
}

export default AddFolder