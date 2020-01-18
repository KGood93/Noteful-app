import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import ApiContext from './ApiContext';
import config from './config';
import './App.css';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            folders: []
        };
    }
    

    componentDidMount() {
        this.fetchNotes();
        const url = `${config.API_ENDPOINT}/folders`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                else {
                    throw new Error('Something went wrong')
                }
            })
            .then(data => {
                this.setState({folders: data})
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })     
    }

    fetchNotes() {
        const notesUrl = `${config.API_ENDPOINT}/notes`
        const notesOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(notesUrl, notesOptions)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                else {
                    throw new Error('something went wrong')
                }
            })
            .then(data => {
                this.setState({notes: data})
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }

    handleAddFolder = folder =>  {
        this.setState({
            folders: [
                ...this.state.folders,
                folder
            ]
        })
    }

    handleAddNote = note => {
        this.setState({
            notes: [
                ...this.state.notes,
                note
            ]
        })
    }

    handleDeleteNote = noteId => {
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: "DELETE"
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error;
                })
            }
        })
        .then(() => {
            this.setState({
                notes: this.state.notes.filter(note => note.id !== noteId)
            })
        })
        .catch(error => {
            console.error(error)
        })
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folders/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/notes/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
                <Route path="/notes/:folderId" component={NoteListNav} />
                <Route
                    path="/folders"
                    component={NoteListNav}
                />

            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folders/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/notes/:noteId"
                    component={NotePageMain}
                />
                <Route 
                    path="/add-folder"
                    component={AddFolder}
                />
                <Route 
                    path="/add-note"
                    component={AddNote}
                />
                <Route 
                    path="/notes/:folderId"
                    component={NoteListMain}
                />

            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            deleteNote: this.handleDeleteNote
        };

        return (
            <ApiContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </ApiContext.Provider>
        );
    }
}

export default App;