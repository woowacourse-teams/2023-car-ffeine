package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class ChargeStationPeriodicUpdateService {

    private final ChargerStationUpdateService chargerStationUpdateService;
    private final ChargeStationRequester chargeStationRequester;

    @Scheduled(cron = "0 0 2 * * ?")
    public void updatePeriodicStations() {
        List<ChargeStation> chargeStations = IntStream.rangeClosed(1, 24)
                .mapToObj(it -> chargeStationRequester.requestChargeStationRequest(it).toStations())
                .flatMap(List::stream)
                .toList();
        chargerStationUpdateService.updateStations(chargeStations);
    }
}
