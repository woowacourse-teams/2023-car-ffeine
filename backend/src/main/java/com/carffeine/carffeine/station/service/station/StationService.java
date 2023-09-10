package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class StationService {

    private final ChargerStatusRepository chargerStatusRepository;
    private final PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

    @Scheduled(cron = "* * 0/1 * * *")
    public void calculateCongestion() {
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek day = now.getDayOfWeek();
        RequestPeriod period = RequestPeriod.from(now.getHour());

        List<ChargerStatus> chargerStatuses = chargerStatusRepository.findAll();
        List<PeriodicCongestion> congestions = createCongestions(chargerStatuses, day, period);
        List<ChargerStatus> usingChargers = findUsingChargers(chargerStatuses);

        periodicCongestionCustomRepository.saveAllIfNotExist(congestions);
        periodicCongestionCustomRepository.updateTotalCountByPeriod(day, period);
        periodicCongestionCustomRepository.updateUsingCount(day, period, usingChargers);
    }

    private List<PeriodicCongestion> createCongestions(List<ChargerStatus> chargerStatuses, DayOfWeek day, RequestPeriod period) {
        return chargerStatuses.stream()
                .map(it -> PeriodicCongestion.createDefault(day, period, it.getStationId(), it.getChargerId()))
                .toList();
    }

    private List<ChargerStatus> findUsingChargers(List<ChargerStatus> chargerStatuses) {
        return chargerStatuses.stream()
                .filter(ChargerStatus::isUsing)
                .toList();
    }
}
