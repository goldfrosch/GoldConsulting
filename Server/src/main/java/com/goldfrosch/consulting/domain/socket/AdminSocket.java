package com.goldfrosch.consulting.domain.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONObject;

@Slf4j
@Component
@ServerEndpoint("/chat/admin")
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
        JSONObject adminMessage = new JSONObject(message);
        String key = adminMessage.getString("key");
        String msg = adminMessage.getString("message");

        UserSocket.sendMessage(key, msg);
    }

    @OnClose
    public void handleClose(Session userSession) {
        log.info("테스트 종료");
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
        String msg = "{\"status\":\"MESSAGE\", \"key\":\"" + key + "\",\"time\":\"" + LocalDateTime.now() +  "\",\"message\":\"" + message + "\"}";
        send(msg);
        log.info(msg);
    }

    public static void bye(String key) {
        send("{\"status\":\"LEAVE\", \"key\":\"" + key + "\"}");
    }
}
