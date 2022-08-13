import React from "react";

const ArchiveButton = ({id, onArchive, textButton}) => {
    return <button className="note-item__archive-button" onClick={ () => onArchive(id)}>{textButton}</button>
}

const DeleteButton = ({id, onDelete}) => {
    return <button className="note-item__delete-button" onClick={ () => onDelete(id)}>Delete</button>
}

export {ArchiveButton, DeleteButton};