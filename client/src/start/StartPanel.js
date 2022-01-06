import React, {useState} from "react";
import {Form} from "react-bootstrap"
import Button from "react-bootstrap/Button";
import Template from "../template/Template";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {saveByteArray} from '../shared/util'

function StartPanel({refresh}) {
    const [state, setState] = useState("")
    const [plyFile, setPlyFile] = useState({name: "", file: {}})
    const [template, setTemplate] = useState({name: ""})

    function setSelectedTemplate(item) {
        setState("")
        setTemplate(item)
    }

    function updateProgress(event) {
        var percentCompleted = Math.round((event.loaded * 100) / event.total)
        console.log(percentCompleted)
    }

    function startMeshlab(event) {
        event.preventDefault()

        let data = new FormData()
        data.append("template", template.name)
        data.append("file", plyFile.file)
        axios({
                method: 'post',
                url: '/meshlab',
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                onUploadProgress: updateProgress
            }
        ).then((result) => {
            axios({
                    method: 'get',
                    url: `/meshlab/${result.data.file}`
                }
            ).then(fileResult => {
                let encoder = new TextEncoder()
                saveByteArray([encoder.encode(fileResult.data)], "output.stl", fileResult.headers["Content-Type"])
                refresh()
            })
        })
    }

    return (
        <div className="StartTemplate">
            <Form>
                <Form.Group>
                    <Form.Label>.ply File</Form.Label>
                    <Form.Control type="file" value={plyFile.name}
                                  onChange={event => {
                                      if (event.target.files[0]) {
                                          const file = event.target.files[0]
                                          setPlyFile({
                                              name: event.target.value,
                                              file: file
                                          })
                                      }
                                  }}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Template</Form.Label>
                    <Form.Control type="text"
                                  onClick={() => {
                                      setState("templateModal")
                                  }}
                                  value={template.name}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={startMeshlab}>
                    Process
                </Button>
            </Form>
            <Modal show={state === "templateModal"} onHide={() => setState("")}>
                <Modal.Header closeButton>
                    Templates
                </Modal.Header>
                <Modal.Body>
                    <Template setSelectedTemplate={setSelectedTemplate}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StartPanel;