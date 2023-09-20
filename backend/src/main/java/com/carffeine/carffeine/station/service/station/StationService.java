package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.congestion.IdGenerator;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.infrastructure.repository.charger.ChargerStatusQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.charger.dto.ChargerStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class StationService {

    private final ChargerStatusQueryRepository chargerStatusQueryRepository;
    private final PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

    @Scheduled(cron = "* 0/1 * * * *")
    public void calculateCongestion() {
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek day = now.getDayOfWeek();
        RequestPeriod period = RequestPeriod.from(now.getHour());

        List<ChargerStatusResponse> chargerStatuses = chargerStatusQueryRepository.findAllChargerStatus();
        List<ChargerStatusResponse> usingChargers = new ArrayList<>();
        List<ChargerStatusResponse> notUsingChargers = new ArrayList<>();

        for (ChargerStatusResponse chargerStatus : chargerStatuses) {
            if (chargerStatus.chargerCondition() == ChargerCondition.CHARGING_IN_PROGRESS) {
                usingChargers.add(chargerStatus);
            } else {
                notUsingChargers.add(chargerStatus);
            }
        }

        List<String> usingChargerIds = usingChargers.stream()
                .map(it -> IdGenerator.generateId(day, period, it.stationId(), it.chargerId()))
                .toList();

        List<String> notUsingChargerIds = notUsingChargers.stream()
                .map(it -> IdGenerator.generateId(day, period, it.stationId(), it.chargerId()))
                .toList();


        List<PeriodicCongestion> congestions = createCongestions(chargerStatuses, day, period);

//        periodicCongestionCustomRepository.saveAllIfNotExist(congestions);
        periodicCongestionCustomRepository.updateNotUsingCountByIds(notUsingChargerIds);
//        periodicCongestionCustomRepository.updateUsingCountByIds(usingChargerIds);
    }

    private List<PeriodicCongestion> createCongestions(List<ChargerStatusResponse> chargerStatuses, DayOfWeek day, RequestPeriod period) {
        return chargerStatuses.stream()
                .map(it -> PeriodicCongestion.createDefault(day, period, it.stationId(), it.chargerId()))
                .toList();
    }
}
