package com.goldfrosch.consulting.domain.chat.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Slf4j
@Component
@ServerEndpoint("/user/chat")
public class UserSocket {
    private class User {
        Session session;
        String key;
    }

    private interface SearchExpression {
        boolean expression(User user);
    }

    //세션 유저 처리를 동기로 처리한다.
    private static List<User> sessionUsers = Collections.synchronizedList(new ArrayList<>());

    private static User searchUser(SearchExpression func) {
        Optional<User> op = sessionUsers.stream().filter(x -> func.expression(x)).findFirst();
        //결과값 혹은 null을 return
        return op.orElse(null);
    }

    private static User getUser(Session session) {
        return searchUser(user -> user.session == session);
    }

    private static User getUser(String key) {
        return searchUser(user -> user.key.equals(key));
    }

    @OnOpen
    public void handleOpen(Session userSession) {
        User user = new User();
        //접속한 유저의 랜덤 UUID 키 생성
        user.key = userSession.getQueryString();
        user.session = userSession;

        //sessionUser 리스트에 값 추가하기
        sessionUsers.add(user);
    }

    @OnMessage
    public void handleMessage(String message, Session userSession) {
        User user = getUser(userSession);
        if(user != null) {
            AdminSocket.sendMessage(user.key, message);
        }
    }

    public static void sendMessage(String key, String message) {
        User user = getUser(key);
        if (user != null) {
            try {
                user.session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @OnClose
    public void handleClose(Session userSession) {
        User user = getUser(userSession);
        if (user != null) {
            AdminSocket.bye(user.key);
            sessionUsers.remove(user);
        }
    }

    public static String[] getUserKeys() {
        String[] ret = new String[sessionUsers.size()];
        for (int i = 0; i < ret.length; i++) {
            ret[i] = sessionUsers.get(i).key;
        }
        return ret;
    }
}
