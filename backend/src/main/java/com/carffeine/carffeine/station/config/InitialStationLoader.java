package com.carffeine.carffeine.station.config;

import com.carffeine.carffeine.station.service.station.ScrapperService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("prod")
@RequiredArgsConstructor
@Configuration
@ConditionalOnProperty(name = "initialize-charge.enabled", havingValue = "true")
public class InitialStationLoader implements ApplicationRunner {

    private final ScrapperService scrapperService;

    @Override
    public void run(ApplicationArguments args) {
        scrapperService.scrap();
    }
}
