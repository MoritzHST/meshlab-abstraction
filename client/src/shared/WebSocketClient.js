import socketIOClient from "socket.io-client";
let client

class WebSocketClient {
    constructor() {
        console.log("new client")
        const url = `http://${window.location.hostname}:${process.env.WSPORT || 8999}`
        this._socket = socketIOClient(url, {
            cors: {
                origin: "*"
            },
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Access-Token': this.getAccessToken()
                    }
                }
            }
        })
    }

    getAccessToken() {
        return this._accessToken
    }

    setAccessToken(accessToken) {
        this._accessToken = accessToken
    }

    socket(){
        return this._socket
    }
}

client = new WebSocketClient()
export default client