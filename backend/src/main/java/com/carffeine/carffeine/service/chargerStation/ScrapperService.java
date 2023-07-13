package com.carffeine.carffeine.service.chargerStation;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRequester;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.CustomChargeStationRepository;
import com.carffeine.carffeine.domain.chargerStation.charger.Charger;
import com.carffeine.carffeine.domain.chargerStation.charger.CustomChargerRepository;
import com.carffeine.carffeine.service.chargerStation.dto.ChargeStationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RequiredArgsConstructor
@Service
@Slf4j
public class ScrapperService {

    private static final int THREAD_COUNT = 8;
    private static final int MAX_PAGE_SIZE = 24;

    private final CustomChargeStationRepository customChargeStationRepository;
    private final ChargeStationRequester chargeStationRequester;
    private final CustomChargerRepository customChargerRepository;

    public void scrap() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);
        List<Callable<Void>> tasks = new ArrayList<>();
        for (int i = 1; i <= MAX_PAGE_SIZE; i++) {
            int page = i;
            executorService.submit(() -> scrapPage(page));
        }
        executorService.invokeAll(tasks);
        executorService.shutdown();
    }

    private void scrapPage(int page) {
        try {
            ChargeStationRequest chargeStationRequest = chargeStationRequester.requestChargeStationRequest(page);
            List<ChargeStation> chargeStations = chargeStationRequest.toStations();
            List<Charger> chargers = chargeStationRequest.toChargers();
            if (page != MAX_PAGE_SIZE && chargers.size() < 5000) {
                log.error("공공데이터 API 의 사이즈가 이상해요 page: {}, size: {}", page, chargers.size());
            }
            customChargeStationRepository.saveAll(new HashSet<>(chargeStations));
            customChargerRepository.saveAll(chargers);
            log.info("page: {}, size: {} 저장 완료", page, chargers.size());
        } catch (Exception e) {
            log.error("page: {}", page, e);
        }
    }
}
