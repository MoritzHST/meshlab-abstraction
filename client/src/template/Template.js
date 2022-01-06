import React, {useEffect, useRef, useState} from "react";
import Table from "react-bootstrap/Table";
import {FaPlus, FaTrashAlt, FaCheck} from "react-icons/fa"
import Button from "react-bootstrap/Button";
import axios from "axios";


function uploadFile(event, callback) {
    let files = event.target.files;

    let uploadFile = files[0];

    let reader = new FileReader();

    let sendFile = {};
    // Auslesen der Datei-Metadaten
    sendFile.name = uploadFile.name;
    sendFile.date = uploadFile.lastModified;
    sendFile.size = uploadFile.size;
    sendFile.type = uploadFile.type;

    // Wenn der Dateiinhalt ausgelesen wurde...
    reader.onload = function (theFileData) {
        sendFile.fileData = theFileData.target.result;

        axios.post("/templates", sendFile)
            .then(() => {
                callback()
            })
    }
    reader.readAsDataURL(uploadFile);
}


function Template(props) {
    const [templates, setTemplates] = useState([])
    let upload = useRef();

    function refreshTemplates() {
        axios.get("/templates")
            .then((result) => {
                setTemplates(result.data)
            })
    }

    function selectTemplate(item) {
        props.setSelectedTemplate(item)
    }

    function deleteTemplate(item) {
        axios.delete(`/templates/${item.name}`)
            .then((result) => {
                refreshTemplates()
            })
    }

    useEffect(() => {
        refreshTemplates()
    }, [])

    return (
        <div className="Template">
            <Table>
                <thead>
                <tr>
                    <th>
                        Template-Name
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                {
                    templates.map((item, id) => (
                        item ?
                            <tr>
                                <td>{item.name}</td>
                                <td>
                                    <Button onClick={() => selectTemplate(item)}>
                                        <FaCheck/>
                                    </Button>
                                    <Button onClick={() => deleteTemplate(item)}>
                                        <FaTrashAlt/>
                                    </Button>
                                </td>
                            </tr> : null
                    ))
                }
            </Table>
            <input type="file"
                   ref={(input) => {
                       upload = input;
                   }}
                   style={{display: 'none'}}
                   onChange={event => uploadFile(event, () => {
                       refreshTemplates()
                   })}/>
            <Button onClick={() => upload.click()}>
                <FaPlus/>
            </Button>
        </div>
    );
}

export default Template;