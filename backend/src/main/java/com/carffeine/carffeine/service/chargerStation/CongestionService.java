package com.carffeine.carffeine.service.chargerStation;

import com.carffeine.carffeine.domain.chargerStation.congestion.PeriodicCongestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CongestionService {
    private final PeriodicCongestionRepository periodicCongestionRepository;
}
