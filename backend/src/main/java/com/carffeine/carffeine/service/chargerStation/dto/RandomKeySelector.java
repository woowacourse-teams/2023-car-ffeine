package com.carffeine.carffeine.service.chargerStation.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomKeySelector {

    private static final ThreadLocalRandom threadLocalRandom = ThreadLocalRandom.current();
    private static final int SERVICE_KEY_SIZE = 7;
    private static final int START_INDEX = 0;
    @Value("${api.service_key}")
    private List<String> serviceKeys;

    public String generateRandomKey() {
        int randomNumber = threadLocalRandom.nextInt(START_INDEX, SERVICE_KEY_SIZE);
        return serviceKeys.get(randomNumber);
    }
}
