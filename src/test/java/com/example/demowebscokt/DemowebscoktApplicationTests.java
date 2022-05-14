package com.example.demowebscokt;

import generator.domain.exp;
import generator.mapper.expMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class DemowebscoktApplicationTests {
    @Autowired
    expMapper mapper;
    @Test
    void contextLoads() {
        List<exp> exps = mapper.selectLink();
        System.out.println(exps);

    }

}
