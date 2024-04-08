import axios from 'axios'
import React from 'react'
import FileItem from './../FileItem/FileItem'

const FileList = ({ files, removeFile }) => {
    const deleteFileHandler = (_name) => {
        axios.delete(`https://3a03-2409-40d0-1039-b8a-a035-2b7f-b319-b98c.in.ngrok.io/teams/1`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }
    return (
        <ul className="file-list">
            {
                files &&
                // files.map(f => 
                    <FileItem
                    // key={f.name}
                    file={files}
                    deleteFile={deleteFileHandler} />
            }
        </ul>
    )
}

export default FileList
