package com.carffeine.carffeine.station.infrastructure.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomApiKeySelector {

    private static final ThreadLocalRandom threadLocalRandom = ThreadLocalRandom.current();
    private static final int START_INDEX = 0;

    @Value("${api.service_key}")
    private List<String> serviceKeys;

    public String generateRandomKey() {
        int randomNumber = threadLocalRandom.nextInt(START_INDEX, serviceKeys.size());
        return serviceKeys.get(randomNumber);
    }
}
