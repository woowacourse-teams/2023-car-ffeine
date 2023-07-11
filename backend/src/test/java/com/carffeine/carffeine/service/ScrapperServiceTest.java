package com.carffeine.carffeine.service;

import com.carffeine.carffeine.service.chargerStation.ScrapperService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ScrapperServiceTest {

    @Autowired
    private ScrapperService scrapperService;

    @Test
    void save_api_data() {
        long startTime = System.currentTimeMillis();
        scrapperService.scrap();
        long endTime = System.currentTimeMillis();
        System.out.println(endTime - startTime);
    }
}
