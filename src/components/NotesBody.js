import React from "react";
import AddNote from "./AddNote";
import NoteList from "./NoteList";
import Header from "./Header";
import Swal from "sweetalert2"
import { getInitialData } from "../utils/index";

export default class NotesBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
    };

    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.onAddNoteEvent = this.onAddNoteEvent.bind(this);
    this.onArchiveEvent = this.onArchiveEvent.bind(this);
  }

  onDeleteEvent(id) {
    Swal.fire({
      title: 'Apa Anda Yakin Ingin Menghapus Note ini?',
      text: "Note yang terhapus tidak dapat dikembalikan",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({notes});
        Swal.fire(
          'Deleted!',
          'Note Berhasil Terhapus.',
          'success'
          )
      }
  })
    
  }

  onAddNoteEvent({ title, body, createdAt, archived }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt,
            archived,
          },
        ],
      };
    });
  }

  onArchiveEvent(id){
    const note = this.state.notes.filter((note) => note.id === id);
    note[0].archived = note[0].archived !== true;

    const notes = this.state.notes.map(note => note);
    this.setState({notes});
    Swal.fire('Berhasil!', 'Note Telah Dipindahkan!', 'success')
  }


  render() {
    return (
      <>
      <Header/>
        <div className="note-app__body">
          <AddNote addNotes={this.onAddNoteEvent}/>
          <h2>Active Notes</h2>
          {
            this.state.notes.filter(note => note.archived === false).length === 0 ?
            <p className="notes-list__empty-message">Tidak ada catatan</p>
            : <NoteList notes={this.state.notes.filter(note => note.archived === false)}
            onDelete={this.onDeleteEvent}
            onArchive={this.onArchiveEvent}
            textButton="Arsipkan" />
          }

          <h2>Archive</h2>
          {
            this.state.notes.filter(note => note.archived === true).length === 0 ?
            <p className="notes-list__empty-message">Tidak Ada Catatan</p>
            : <NoteList notes={this.state.notes.filter(note => note.archived === true)}
            onDelete={this.onDeleteEvent}
            onArchive={this.onArchiveEvent}
            textButton="Pindahkan"/>
          }
        </div>
      </>
    );
  }
}
