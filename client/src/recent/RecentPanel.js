import React, {useEffect} from "react";
import {Form} from "react-bootstrap"
import Button from "react-bootstrap/Button";
import axios from "axios";
import {FaDownload, FaTrashAlt} from "react-icons/fa";
import Table from "react-bootstrap/Table";
import {saveByteArray} from '../shared/util'


function RecentPanel(props) {
    function deleteFile(filename) {
        axios({
                method: 'delete',
                url: `/meshlab/${filename}`
            }
        ).then(fileResult => {
            props.refreshOutputs()
        })
    }

    function downloadFile(filename) {
        axios({
                method: 'get',
                url: `/meshlab/${filename}`
            }
        ).then(fileResult => {
            let encoder = new TextEncoder()
            saveByteArray([encoder.encode(fileResult.data)], "output.stl", fileResult.headers["Content-Type"])
        })
    }

    useEffect(() => {
        props.refreshOutputs()
    }, [])

    return (
        <div className="RecentPanel">
            <Form>
                <Table class="table-striped">
                    <thead>
                    <tr>
                        <th>
                            File-Name
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    {
                        props.outputs.map((item, id) => (
                            item ?
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{new Intl.DateTimeFormat('default', {
                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                                        hour12: false
                                    }).format(new Date(item.date))}</td>
                                    <td>
                                        <Button onClick={() => downloadFile(item.name)}>
                                            <FaDownload/>
                                        </Button>
                                        <Button onClick={() =>  deleteFile(item.name)}>
                                            <FaTrashAlt/>
                                        </Button>
                                    </td>
                                </tr> : null
                        ))
                    }
                </Table>
            </Form>
        </div>
    );
}

export default RecentPanel;