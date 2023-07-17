package com.carffeine.carffeine.service.chargerStation;

import com.carffeine.carffeine.controller.chargerStation.dto.CongestionInfoResponse;
import com.carffeine.carffeine.controller.chargerStation.dto.CongestionResponse;
import com.carffeine.carffeine.controller.chargerStation.dto.StatisticsResponse;
import com.carffeine.carffeine.domain.chargerStation.charger.ChargerRepository;
import com.carffeine.carffeine.domain.chargerStation.congestion.PeriodicCongestion;
import com.carffeine.carffeine.domain.chargerStation.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.domain.chargerStation.congestion.RequestPeriod;
import com.carffeine.carffeine.domain.chargestation.charger.Charger;
import com.carffeine.carffeine.service.chargerStation.dto.StatisticsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class CongestionService {
    private static final int PERIOD_SIZE = 24;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerRepository chargerRepository;

    public StatisticsResponse calculateCongestion(StatisticsRequest statisticsRequest) {
        String stationId = statisticsRequest.stationId();

        List<PeriodicCongestion> congestions = periodicCongestionRepository.findAllByStationId(stationId);
        List<Charger> chargers = chargerRepository.findAllByStationId(stationId);

        Map<String, List<CongestionInfoResponse>> quickSpeedResponse = calculateQuick(congestions, chargers);
        Map<String, List<CongestionInfoResponse>> standardSpeedResponse = calculateStandard(congestions, chargers);

        return new StatisticsResponse(stationId, new CongestionResponse(quickSpeedResponse, standardSpeedResponse));
    }

    private Map<String, List<CongestionInfoResponse>> calculateQuick(List<PeriodicCongestion> congestions, List<Charger> chargers) {
        List<String> quickChargerIds = chargers.stream()
                .filter(it -> it.getCapacity().intValue() >= 50)
                .map(Charger::getChargerId)
                .toList();

        return calculateDailyCongestion(congestions, quickChargerIds);
    }

    private Map<String, List<CongestionInfoResponse>> calculateStandard(List<PeriodicCongestion> congestions, List<Charger> chargers) {
        List<String> standardChargerIds = chargers.stream()
                .filter(it -> it.getCapacity().intValue() < 50)
                .map(Charger::getChargerId)
                .toList();

        return calculateDailyCongestion(congestions, standardChargerIds);
    }

    private Map<String, List<CongestionInfoResponse>> calculateDailyCongestion(List<PeriodicCongestion> congestions, List<String> chargerIds) {
        List<PeriodicCongestion> congestionsByCharger = congestions.stream()
                .filter(it -> chargerIds.contains(it.getChargerId()))
                .toList();

        Map<String, List<CongestionInfoResponse>> dailyCongestion = new HashMap<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            List<CongestionInfoResponse> responses = calculateTimelyCongestion(congestionsByCharger, day);
            String weekDay = day.name().substring(0, 3);
            dailyCongestion.put(weekDay, responses);
        }

        return dailyCongestion;
    }

    private List<CongestionInfoResponse> calculateTimelyCongestion(List<PeriodicCongestion> congestionsByCharger, DayOfWeek day) {
        List<CongestionInfoResponse> timelyCongestion = new ArrayList<>();
        for (int i = 0; i < PERIOD_SIZE; i++) {
            RequestPeriod from = RequestPeriod.from(i);
            double totalCongestion = getTotalCongestion(congestionsByCharger, day, from);

            timelyCongestion.add(new CongestionInfoResponse(i, totalCongestion));
        }

        return timelyCongestion;
    }

    private double getTotalCongestion(List<PeriodicCongestion> congestionsByCharger, DayOfWeek day, RequestPeriod from) {
        List<Double> congestions = congestionsByCharger.stream()
                .filter(it -> it.getDayOfWeek() == day)
                .filter(it -> it.getStartTime() == from)
                .map(PeriodicCongestion::getCongestion)
                .toList();

        if (congestions.isEmpty()) {
            return -1;
        }

        double totalCongestion = congestions.stream()
                .mapToDouble(Double::doubleValue)
                .sum();

        return totalCongestion / congestions.size() * 100;
    }
}
