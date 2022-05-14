package com.example.demowebscokt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="com")
@MapperScan("generator/mapper")
public class DemowebscoktApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemowebscoktApplication.class, args);
    }

}
