package com.goldfrosch.consulting.domain.chat.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@Slf4j
@Component
@ServerEndpoint("/admin/chat")
public class AdminSocket {
    private static Session admin = null;
    @OnOpen
    public void handleOpen(Session userSession) {
        if (admin != null) {
            try {
                admin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        admin = userSession;
        for(String key : UserSocket.getUserKeys()) {
            visit(key);
        }
    }

    @OnMessage
    public void handleMessage(String message, Session userSession) throws IOException {
        String[] split = message.split("#####", 2);
        String key = split[0];
        String msg = split[1];
        UserSocket.sendMessage(key, msg);
    }

    @OnClose
    public void handleClose(Session userSession) {
        admin = null;
    }

    private static void send(String message) {
        if (admin != null) {
            try {
                admin.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static void visit(String key) {
        send("{\"status\":\"visit\", \"key\":\"" + key + "\"}");
    }
    public static void sendMessage(String key, String message) {
        send("{\"status\":\"message\", \"key\":\"" + key + "\", \"message\":\"" + message + "\"}");
        log.info(key);
    }
    public static void bye(String key) {
        send("{\"status\":\"bye\", \"key\":\"" + key + "\"}");
    }
}
