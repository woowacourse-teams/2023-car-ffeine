package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.congestion.IdGenerator;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.infrastructure.repository.charger.ChargerStatusQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.charger.dto.ChargerStatusResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
@RequiredArgsConstructor
@Service
public class StationService {

    private final ChargerStatusQueryRepository chargerStatusQueryRepository;
    private final PeriodicCongestionCustomRepository periodicCongestionCustomRepository;
    private final AtomicBoolean isRunning = new AtomicBoolean(false);

    @Scheduled(cron = "0 0/10 * * * *")
    public void calculateCongestion() {
        if (isRunning.compareAndSet(false, true)) {
            LocalDateTime now = LocalDateTime.now();
            DayOfWeek day = now.getDayOfWeek();
            RequestPeriod period = RequestPeriod.from(now.getHour());
            log.info("calculate congestion. day: {}, period: {}", day, period);

            String stationId = null;
            String chargerId = null;
            long limit = 10000;
            long size = limit;

            while (limit == size) {
                List<ChargerStatusResponse> chargerStatuses = chargerStatusQueryRepository.findAllChargerStatus(stationId, chargerId, limit);
                List<ChargerStatusResponse> usingChargers = new ArrayList<>();
                List<ChargerStatusResponse> notUsingChargers = new ArrayList<>();

                addChargersByCondition(chargerStatuses, usingChargers, notUsingChargers);

                List<String> usingChargerIds = getCongestionIds(usingChargers, day, period);
                List<String> notUsingChargerIds = getCongestionIds(notUsingChargers, day, period);

                periodicCongestionCustomRepository.updateNotUsingCountByIds(notUsingChargerIds);
                periodicCongestionCustomRepository.updateUsingCountByIds(usingChargerIds);

                ChargerStatusResponse chargerStatusResponse = chargerStatuses.get(chargerStatuses.size() - 1);
                stationId = chargerStatusResponse.stationId();
                chargerId = chargerStatusResponse.chargerId();
                size = chargerStatuses.size();
            }
            log.info("finish congestion calculation. day: {}, period: {}", day, period);
            isRunning.set(false);
        }
    }

    private void addChargersByCondition(List<ChargerStatusResponse> chargerStatuses, List<ChargerStatusResponse> usingChargers, List<ChargerStatusResponse> notUsingChargers) {
        for (ChargerStatusResponse chargerStatus : chargerStatuses) {
            if (chargerStatus.chargerCondition() == ChargerCondition.CHARGING_IN_PROGRESS) {
                usingChargers.add(chargerStatus);
            } else {
                notUsingChargers.add(chargerStatus);
            }
        }
    }

    private List<String> getCongestionIds(List<ChargerStatusResponse> usingChargers, DayOfWeek day, RequestPeriod period) {
        return usingChargers.stream()
                .map(it -> IdGenerator.generateId(day, period, it.stationId(), it.chargerId()))
                .toList();
    }
}
