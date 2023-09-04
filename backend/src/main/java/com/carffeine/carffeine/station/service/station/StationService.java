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
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        RequestPeriod period = RequestPeriod.from(now.getHour());
        List<ChargerStatus> chargerStatuses = chargerStatusRepository.findAll();
        List<PeriodicCongestion> congestions = chargerStatuses.stream()
                .map(it -> PeriodicCongestion.of(dayOfWeek, period, 0, 0, it.getStationId(), it.getChargerId()))
                .toList();
        List<ChargerStatus> usingChargers = chargerStatuses.stream()
                .filter(ChargerStatus::isUsing)
                .toList();
        periodicCongestionCustomRepository.saveAll(congestions);
        periodicCongestionCustomRepository.updateUsingCount(dayOfWeek, period, usingChargers);
        periodicCongestionCustomRepository.updateTotalCountByPeriod(dayOfWeek, period);
    }
}
