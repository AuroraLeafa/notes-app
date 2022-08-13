import React from "react";
import { showFormattedDate } from "../utils/index";
import { DeleteButton, ArchiveButton } from "./NoteButtons";


export default function NoteItem ({id, title, body, createdAt, onDelete, onArchive, textButton}) {
    return(
        <div className="note-item">
            <div className="note-item__content">
                <h3 className="note-item__title">{title}</h3>
                <p className="note-item__date">{showFormattedDate(createdAt)}</p>
                <p className="note-item__body">{body}</p>
            </div>
            <div className="note-item__action">
                <DeleteButton id={id} onDelete={onDelete}/>
                <ArchiveButton id={id} onArchive={onArchive} textButton={textButton}/>
            </div>
        </div>
    )
}