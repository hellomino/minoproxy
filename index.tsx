import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import WebSocketService from "@/services/websocket.ts";
import {ToastProvider} from "@/components/Toast.tsx";


const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}
let ws = WebSocketService.getInstance();
ws.init("ws://localhost:1222/connect/to");
ws.connect()
setInterval(function () {
    ws.send({
        "code": 10000,
        "data": ws.ver
    });
}, 10000)

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <ToastProvider>
            <App/>
        </ToastProvider>
    </React.StrictMode>
);