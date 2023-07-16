package com.carffeine.carffeine.service.chargerStation.dto;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class RandomKeySelector {

    private static final ThreadLocalRandom threadLocalRandom = ThreadLocalRandom.current();
    @Value("${api.service_key}")
    private static List<String> serviceKeys;

    public static String generateRandomKey() {
        int randomNumber = threadLocalRandom.nextInt(0, 7);
        return serviceKeys.get(randomNumber);
    }
}
