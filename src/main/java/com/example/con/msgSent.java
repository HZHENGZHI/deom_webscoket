package com.example.con;

import com.example.entity.websocketMsg;
import generator.domain.exp;
import generator.mapper.expMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpClient;

/**
 * @program: demowebscokt
 * @description:
 * @author: i am kkk
 * @create: 2022-05-04 11:26
 */
@RestController
public class msgSent {
    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;
    @Autowired
    private expMapper expMapper;
    @MessageMapping("/test")
    public void sentMesage(websocketMsg websocketMsg) throws InterruptedException {
        exp exp=new exp();
        exp.setId(1);
        exp.setLink(expMapper.selectLink().get(0).getLink());
        System.out.println(websocketMsg);
//        Thread.sleep(1000);
        simpMessageSendingOperations.convertAndSend(websocketMsg.getDestination(),exp);
    }
    @GetMapping("/gggg")
    public String kk()
    {
        return "123";
    }
}
