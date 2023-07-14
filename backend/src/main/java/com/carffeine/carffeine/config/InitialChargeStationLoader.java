package com.carffeine.carffeine.config;

import com.carffeine.carffeine.service.chargerStation.ScrapperService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
@ConditionalOnProperty(name = "initialize-charge.enabled", havingValue = "true")
public class InitialChargeStationLoader implements ApplicationRunner {

    private final ScrapperService scrapperService;

    @Override
    public void run(ApplicationArguments args) {
        scrapperService.scrap();
    }
}
