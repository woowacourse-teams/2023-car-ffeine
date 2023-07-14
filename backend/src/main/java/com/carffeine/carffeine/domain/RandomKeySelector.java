package com.carffeine.carffeine.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomKeySelector {
    private static final ThreadLocalRandom RANDOM = ThreadLocalRandom.current();

    @Value("${api.service_key}")
    private List<String> serviceKeys;

    public String getRandomKey() {
        int randomIndex = RANDOM.nextInt(serviceKeys.size() - 1);
        return serviceKeys.get(randomIndex);
    }
}
