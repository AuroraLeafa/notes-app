import React from "react";
import Swal from "sweetalert2";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      createdAt: +new Date(),
      archived: false,
      charsLeft: 50,
      maxChars: 50,
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onTitleLimit = this.onTitleLimit.bind(this);
  }

  onTitleLimit(e) {
    const charCount = e.target.value.length;
    const charLeft = 50 - charCount;
    this.setState({
      charsLeft: charLeft,
    });
  }

  onTitleChange(e) {
    this.setState(() => {
      return {
        title: e.target.value,
      };
    });
  }

  onBodyChange(e) {
    this.setState(() => {
      return {
        body: e.target.value,
      };
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.addNotes(this.state);

    Swal.fire("Berhasil!", "Catatan Baru Telah Ditambahkan!.", "success");
  }

  render() {
    return (
      <>
        <div className="note-input">
          <h2>Buat Catatan</h2>
          <form onSubmit={this.onSubmitHandler}>
            <p className="note-input__title__char-limit">
              Sisa Karakter: {this.state.charsLeft}
            </p>
            <input
              type="text"
              className="note-input__title"
              placeholder="Tuliskan Judul Catatan"
              maxLength={this.state.maxChars}
              onInput={this.onTitleLimit}
              onChange={this.onTitleChange}
              value={this.state.title}
              required
            ></input>
            <textarea
              type="text"
              className="note-input__body"
              placeholder="Tuliskan Isi Catatan"
              value={this.state.body}
              onChange={this.onBodyChange}
              required
            ></textarea>
            <button type="submit">Buat</button>
          </form>
        </div>
      </>
    );
  }
}
