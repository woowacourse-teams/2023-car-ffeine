package com.carffeine.carffeine.station.service.charger;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusCustomRepository;
import com.carffeine.carffeine.station.service.charger.dto.ChargerStateRequest;
import com.carffeine.carffeine.station.service.charger.dto.ChargerStateUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChargerStateUpdateService {

    private static final int MAX_PAGE_SIZE = 8;
    private static final int THREAD_COUNT = 4;

    private final ChargerStateRequester chargerStateRequester;
    private final ChargerStatusCustomRepository chargerStatusCustomRepository;

    @Scheduled(cron = "0 0/7 * * * *")
    public void update() {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);
        for (int page = 1; page <= MAX_PAGE_SIZE; page++) {
            int pageNo = page;
            executorService.submit(() -> updateChargerState(pageNo));
        }
        executorService.shutdown();
        log.info("finish update charger state");
    }

    private void updateChargerState(int pageNo) {
        ChargerStateUpdateRequest chargerStateUpdateRequest = chargerStateRequester.requestChargerStatusUpdate(pageNo);
        List<ChargerStateRequest> chargerStateRequests = chargerStateUpdateRequest.items().item();
        List<ChargerStatus> chargerStatuses = chargerStateRequests.stream()
                .map(ChargerStateRequest::toChargerStatus)
                .toList();
        chargerStatusCustomRepository.updateAll(chargerStatuses);
        log.info("update charger state. pageNo: {}, size: {}", pageNo, chargerStateRequests.size());
    }
}
