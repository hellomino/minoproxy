// WebSocketService.ts
import md5 from "crypto-js/md5";

type MessageHandler = (data: any) => void;

class WebSocketService {
    private static instance: WebSocketService;

    private socket: WebSocket | null = null;
    private url = "";

    private handlers: Record<number, MessageHandler> = {};
    private messageQueue: any[] = []; // 排队发送
    private reconnectDelay = 2000;
    private isManualClose = false;

    private isOnline = navigator.onLine;

    /** 单例模式：外部只能通过 getInstance 获取 */
    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private constructor() {
        // 监听浏览器网络情况
        window.addEventListener("online", () => {
            console.log("网络恢复 online");
            this.isOnline = true;
            this.reconnect();
        });

        window.addEventListener("offline", () => {
            console.warn("网络断开 offline");
            this.isOnline = false;
        });
    }

    /** 初始化 WebSocket 地址 */
    public init(url: string) {
        this.url = url;
    }

    /** 生成 Sec-WebSocket-Protocol */
    private generateProtocol(): string {
        const randomStr = Math.random().toString(36).substring(2, 10);
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const signString = "my_sign_string";

        const token = md5(randomStr + timestamp + signString).toString();
        return `${randomStr},${timestamp},${token}`;
    }

    /** 连接 WebSocket */
    public connect() {
        if (!this.url) {
            console.error("WebSocketService: URL 未初始化");
            return;
        }

        if (!this.isOnline) {
            console.warn("网络离线，等待重新连接");
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
            this.handleMessage(evt.data);
        };
    }

    /** 自动重连 */
    private reconnect() {
        if (!this.isOnline) return;
        console.log("尝试 WebSocket 重连...");
        this.connect();
    }

    /** 处理收到的消息 */
    private handleMessage(raw: string) {
        try {
            const msg = JSON.parse(raw);
            const msgCode = msg.msgCode;

            if (this.handlers[msgCode]) {
                this.handlers[msgCode](msg);
            } else {
                console.warn("未处理的 msgCode: ", msgCode);
            }
        } catch (e) {
            console.error("消息解析失败：", raw);
        }
    }

    /** 注册消息码处理 */
    public on(msgCode: number, handler: MessageHandler) {
        this.handlers[msgCode] = handler;
    }

    /** 自动排队发送 */
    public send(data: any) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            this.messageQueue.push(data); // 排队
            return;
        }
        this.socket.send(JSON.stringify(data));
    }

    /** 发送队列中的消息 */
    private flushQueue() {
        while (this.messageQueue.length > 0) {
            const msg = this.messageQueue.shift();
            this.send(msg);
        }
    }

    /** 手动关闭 */
    public close() {
        this.isManualClose = true;
        this.socket?.close();
    }
}

export default WebSocketService;
