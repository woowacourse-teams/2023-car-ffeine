package com.carffeine.carffeine.station.service.charger;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusCustomRepository;
import com.carffeine.carffeine.station.service.charger.dto.ChargerStateRequest;
import com.carffeine.carffeine.station.service.charger.dto.ChargerStateUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChargerStateUpdateService {

    private static final int MAX_PAGE_SIZE = 4;

    private final ChargerStateRequester chargerStateRequester;
    private final ChargerStatusCustomRepository chargerStatusCustomRepository;

    @Scheduled(cron = "0 0/7 * * * *")
    public void update() {
        for (int page = 1; page <= MAX_PAGE_SIZE; page++) {
            updateChargerState(page);
        }
    }

    private void updateChargerState(int pageNo) {
        ChargerStateUpdateRequest chargerStateUpdateRequest = chargerStateRequester.requestChargerStatusUpdate(pageNo);
        List<ChargerStateRequest> chargerStateRequests = chargerStateUpdateRequest.items().item();
        List<ChargerStatus> chargerStatuses = chargerStateRequests.stream()
                .map(ChargerStateRequest::toChargerStatus)
                .toList();
        chargerStatusCustomRepository.saveAll(chargerStatuses);
    }
}
