package com.carffeine.carffeine.service.chargerstation.dto;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomKeySelector {

    private static final ThreadLocalRandom threadLocalRandom = ThreadLocalRandom.current();
    //    private static final int SERVICE_KEY_SIZE = 7;
    private static final int START_INDEX = 0;
    //    @Value("${api.service_key}")
    private List<String> serviceKeys = List.of("MnKQUcu5JweRPvDeE0r2/yS22EzNc5bydXFJ7ztN/QG8mmRSsehjDK1NrdT8zVYx2jLbQTjR2xZMM7JYOujBYw==");

    public String generateRandomKey() {
        int randomNumber = threadLocalRandom.nextInt(START_INDEX, serviceKeys.size());
        return serviceKeys.get(randomNumber);
    }
}
