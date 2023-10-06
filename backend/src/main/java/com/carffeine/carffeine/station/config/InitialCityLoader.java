package com.carffeine.carffeine.station.config;

import com.carffeine.carffeine.station.service.city.CityRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
@ConditionalOnProperty(name = "initialize-city.enabled", havingValue = "true")
public class InitialCityLoader implements ApplicationRunner {

    private final CityRequestService cityRequestService;

    @Override
    public void run(ApplicationArguments args) {
        cityRequestService.requestCity();
    }
}
