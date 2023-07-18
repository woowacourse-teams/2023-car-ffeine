package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateUpdateRequest;
import com.carffeine.carffeine.service.chargerstation.dto.Item;
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
            System.out.println("page = " + page);
            updateChargerState(page);
            System.out.println("page = " + page + " end");
        }
    }

    private void updateChargerState(int pageNo) {
        ChargerStateUpdateRequest chargerStateUpdateRequest = chargerStateRequester.requestChargerStatusUpdateRequest(pageNo);
        List<Item> items = chargerStateUpdateRequest.items().item();
        chargerStatusCustomRepository.saveAll(items);
    }
}
