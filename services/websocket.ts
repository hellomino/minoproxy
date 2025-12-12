// WebSocketService.ts
import md5 from "crypto-js/md5";
import {HeartBeat} from "@/services/msgcode.ts";
import {decryptString, KKK} from "@/services/aes_gcm_web.ts";

type MessageHandler = (data: any) => void;

class WebSocketService {
    private static instance: WebSocketService;

    private socket: WebSocket | null = null;
    private url = "";

    private handlers: Record<number, MessageHandler> = {};
    private messageQueue: any[] = [];
    private reconnectDelay = 2000;
    private isManualClose = false;

    private isOnline = navigator.onLine;
    public ver = "1.0.0"

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private constructor() {
        window.addEventListener("online", () => {
            this.isOnline = true;
            this.reconnect();
        });

        window.addEventListener("offline", () => {
            this.isOnline = false;
        });
    }

    public init(url: string) {
        this.url = url;
    }

    private generateProtocol(): string[] {
        const randomStr = Math.random().toString(36).substring(2, 10);
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const signString = "XentaKillHGLFHkds11";

        const token = md5(randomStr + timestamp + signString).toString();
        return [randomStr, timestamp, token];
    }

    /** Connect WebSocket */
    public connect() {
        if (!this.url) {
            console.error("WebSocketService: URL not initialized.");
            return;
        }

        if (!this.isOnline) {
            return;
        }

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return;
        }

        const protocol = this.generateProtocol();
        this.isManualClose = false;

        this.socket = new WebSocket(this.url, protocol);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            this.flushQueue();
        };

        this.socket.onclose = () => {
            console.log("WebSocket closed");
            if (!this.isManualClose) {
                setTimeout(() => this.reconnect(), this.reconnectDelay);
            }
        };

        this.socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        this.socket.onmessage = (evt) => {
            this.handleMessage(evt.data).then(r => {
            });
        };
    }

    /** Reconnect */
    private reconnect() {
        if (!this.isOnline) return;
        console.log("Reconnect WebSocket ...");
        this.connect();
    }


    /** hand msg */
    private async handleMessage(raw: string) {
        try {
            const msg = JSON.parse(raw);
            const msgCode = msg.code;

            if (this.handlers[msgCode]) {
                if (msgCode >= 30000) {
                    this.handlers[msgCode](msg);
                } else {
                    const dataString = await decryptString(KKK, msg.data)
                    const data = JSON.parse(dataString)
                    this.handlers[msgCode](data);
                }
            } else {
                if (msgCode !== HeartBeat) {
                    console.warn("invalid msgCode: ", msgCode);
                }
            }
        } catch (e) {
            console.error("parse msg error：", raw);
        }
    }

    /** register */
    public on(msgCode: number, handler: MessageHandler) {
        this.handlers[msgCode] = handler;
    }

    /** rank */
    public send(data: any) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            this.messageQueue.push(data); // 排队
            return;
        }
        this.socket.send(JSON.stringify(data));
    }

    /** send */
    private flushQueue() {
        while (this.messageQueue.length > 0) {
            const msg = this.messageQueue.shift();
            this.send(msg);
        }
    }

    /** close */
    public close() {
        this.isManualClose = true;
        this.socket?.close();
    }
}

export default WebSocketService;
