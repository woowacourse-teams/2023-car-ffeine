package com.carffeine.carffeine.station.service.congestion;

import com.carffeine.carffeine.station.controller.congestion.dto.CongestionInfoResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.StatisticsResponse;
import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerRepository;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.station.domain.station.DayConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CongestionService {

    private static final int PERIOD_SIZE = 24;
    private static final double DEFAULT_CONGESTION_VALUE = -1;
    private static final int PERCENTAGE = 100;

    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerRepository chargerRepository;

    @Transactional(readOnly = true)
    public StatisticsResponse showCongestionStatistics(String stationId, String day) {
        DayOfWeek dayOfWeek = DayConverter.from(day);

        List<PeriodicCongestion> congestions = periodicCongestionRepository.findAllByStationIdAndDayOfWeek(stationId, dayOfWeek);
        List<Charger> chargers = chargerRepository.findAllByStationId(stationId);

        List<CongestionInfoResponse> quickSpeedResponse = calculateCongestions(congestions, chargers, true);
        List<CongestionInfoResponse> standardSpeedResponse = calculateCongestions(congestions, chargers, false);

        return new StatisticsResponse(stationId, new CongestionResponse(standardSpeedResponse, quickSpeedResponse));
    }

    private List<CongestionInfoResponse> calculateCongestions(List<PeriodicCongestion> congestions, List<Charger> chargers, boolean isQuick) {
        List<String> chargerIds = getChargerIds(chargers, isQuick);
        List<PeriodicCongestion> collectedCongestions = filterCollectedCongestions(congestions, chargerIds);

        List<CongestionInfoResponse> calculatedCongestions = new ArrayList<>();

        for (int period = 0; period < PERIOD_SIZE; period++) {
            int section = period * PERCENTAGE;
            double congestion = getCongestionBySection(collectedCongestions, section);
            calculatedCongestions.add(new CongestionInfoResponse(period, congestion));
        }

        return calculatedCongestions;
    }

    private List<String> getChargerIds(List<Charger> chargers, boolean isQuick) {
        return chargers.stream()
                .filter(charger -> charger.isQuick() == isQuick)
                .map(Charger::getChargerId)
                .toList();
    }

    private List<PeriodicCongestion> filterCollectedCongestions(List<PeriodicCongestion> congestions, List<String> chargerIds) {
        return congestions.stream()
                .filter(congestion -> chargerIds.contains(congestion.getChargerId()))
                .toList();
    }

    private double getCongestionBySection(List<PeriodicCongestion> collectedCongestions, int section) {
        return collectedCongestions.stream()
                .filter(it -> it.isSameStartTime(section))
                .mapToDouble(PeriodicCongestion::getCongestion)
                .average()
                .orElse(DEFAULT_CONGESTION_VALUE);
    }
}
