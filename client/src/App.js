import './App.css';
import {Suspense, useState} from "react";
import AlertBox from "./shared/AlertBox";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "react-bootstrap/Navbar";
import StartPanel from "./start/StartPanel";
import axios from "axios";
import RecentPanel from "./recent/RecentPanel";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";


function App() {
    const [state] = useState("start")
    const [error, setError] = useState(0)
    const [outputs, setOutputs] = useState([])

    function refreshOutputs() {
        axios.get("/meshlab")
            .then((result) => {
                setOutputs(result.data)
            })
    }


    axios.defaults.headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    };
    axios.interceptors.response.use(null, error => {
        setError(error || error.response.data.error)
    });

    return (
        <div className="App">
            <Suspense fallback={(<div>Loading</div>)}>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Hochschule Stralsund</Navbar.Brand>
                </Navbar>
                {error && !error.isEmpty() ? <AlertBox errorMsg={error}/> : null}

                <Jumbotron className={"AppBody"}>
                    <Row className="justify-content-around d-flex">
                        {state === "start" ?
                            <Card style={{width: '36rem'}}>
                                <Card.Title>Process Pointcloud</Card.Title>
                                <Card.Body>
                                    <StartPanel refresh={refreshOutputs}/>
                                </Card.Body>
                            </Card> : null}
                        <Card style={{width: '48rem'}}>
                            <Card.Title>All Outputs</Card.Title>
                            <Card.Body>
                                <RecentPanel outputs={outputs} refreshOutputs={refreshOutputs}/>
                            </Card.Body>
                        </Card>
                    </Row>
                </Jumbotron>
            </Suspense>
        </div>
    );
}

export default App;
