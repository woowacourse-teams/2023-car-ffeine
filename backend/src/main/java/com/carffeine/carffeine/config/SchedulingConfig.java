package com.carffeine.carffeine.config;

import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

@Profile("prod")
@EnableScheduling
@Component
public class SchedulingConfig {
}
