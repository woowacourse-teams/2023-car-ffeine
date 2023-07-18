package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChargerStateUpdateService {

    private static final int MAX_PAGE_SIZE = 4;

    private final ChargerStateRequester chargerStateRequester;

    @Scheduled(cron = "0/10 * * * * *")
    public void update() {
        for (int page = 1; page <= MAX_PAGE_SIZE; page++) {
            updateChargerState(page);
        }
    }

    private void updateChargerState(int pageNo) {
        ChargerStateUpdateRequest chargerStateUpdateRequest = chargerStateRequester.requestChargerStatusUpdateRequest(pageNo);
        chargerStateUpdateRequest.items().item().get(0).

    }


}
