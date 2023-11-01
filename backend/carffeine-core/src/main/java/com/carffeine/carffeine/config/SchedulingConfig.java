package com.carffeine.carffeine.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

@ConditionalOnProperty(name = "scheduling.enabled", havingValue = "true")
@EnableScheduling
@Component
public class SchedulingConfig {
}
