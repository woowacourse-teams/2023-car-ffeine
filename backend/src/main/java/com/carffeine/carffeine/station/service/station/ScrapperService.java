package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusCustomRepository;
import com.carffeine.carffeine.station.domain.charger.CustomChargerRepository;
import com.carffeine.carffeine.station.domain.station.CustomStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.service.station.dto.StationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RequiredArgsConstructor
@Service
@Slf4j
public class ScrapperService {

    private static final int THREAD_COUNT = 8;
    private static final int MAX_PAGE_SIZE = 24;
    private static final int MIN_SIZE = 5000;

    private final CustomStationRepository customStationRepository;
    private final StationRequester stationRequester;
    private final CustomChargerRepository customChargerRepository;
    private final ChargerStatusCustomRepository chargerStatusCustomRepository;

    public void scrap() {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);
        for (int i = 1; i <= MAX_PAGE_SIZE; i++) {
            int page = i;
            executorService.submit(() -> scrapPage(page));
        }
        executorService.shutdown();
    }

    private void scrapPage(int page) {
        try {
            StationRequest stationRequest = stationRequester.requestChargeStationRequest(page);
            List<Station> stations = stationRequest.toStations();
            List<Charger> chargers = stationRequest.toChargers();
            List<ChargerStatus> chargerStatuses = chargers.stream()
                    .map(Charger::getChargerStatus)
                    .toList();
            if (page != MAX_PAGE_SIZE && chargers.size() < MIN_SIZE) {
                log.error("공공데이터 API 의 사이즈가 이상해요 page: {}, size: {}", page, chargers.size());
            }
            customStationRepository.saveAll(new HashSet<>(stations));
            customChargerRepository.saveAll(chargers);
            chargerStatusCustomRepository.saveAll(chargerStatuses);
            log.info("page: {}, size: {} 저장 완료", page, chargers.size());
        } catch (Exception e) {
            log.error("page: {}", page, e);
        }
    }
}
