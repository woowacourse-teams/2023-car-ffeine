package com.carffeine.carffeine.infra.api;

import com.carffeine.carffeine.service.chargerstation.ChargeStationRequester;
import com.carffeine.carffeine.service.chargerstation.ChargerStateRequester;
import com.carffeine.carffeine.service.chargerstation.dto.ChargeStationRequest;
import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateUpdateRequest;
import com.carffeine.carffeine.service.chargerstation.dto.RandomKeySelector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@Slf4j
@Component
public class RestTemplateChargeStationRequester implements ChargeStationRequester, ChargerStateRequester {

    private static final String REQUEST_URL = "/getChargerInfo";
    private static final String REQUEST_STATE_URL = "/getChargerStatus";
    private static final int ROW_SIZE = 9999;
    private static final String DATA_TYPE = "JSON";
    private static final int ONE_SECOND = 1000;
    private static final int PERIOD = 10;

    private final RestTemplate restTemplate;
    private final RandomKeySelector randomKeySelector;

    @Override
    public ChargeStationRequest requestChargeStationRequest(int pageNo) {
        while (true) {
            try {
                ChargeStationRequest result = requestChargeStationRequestWithRetry(pageNo);
                if (result != null) {
                    return result;
                }
            } catch (Exception e) {
                log.warn("페이지 요청 실패, 재시도합니다. pageNo: {}", pageNo);
                waitForRetry();
            }
        }
    }

    @Override
    public ChargerStateUpdateRequest requestChargerStatusUpdate(int pageNo) {
        while (true) {
            try {
                ChargerStateUpdateRequest result = requestChargeStateUpdateRequestWithRetry(pageNo);
                if (result != null) {
                    return result;
                }
            } catch (Exception e) {
                log.warn("페이지 요청 실패, 재시도합니다. pageNo: {}", pageNo);
                waitForRetry();
            }
        }
    }

    private ChargeStationRequest requestChargeStationRequestWithRetry(int pageNo) {
        URI uri = requestWithDecodedKey(pageNo);
        ResponseEntity<ChargeStationRequest> exchange = restTemplate.exchange(new RequestEntity<>(null, HttpMethod.GET, uri), ChargeStationRequest.class);
        if (exchange.getHeaders().getContentType().getSubtype().equals("xml")) {
            return null;
        }
        return exchange.getBody();
    }

    private ChargerStateUpdateRequest requestChargeStateUpdateRequestWithRetry(int pageNo) {
        URI uri = requestStateWithDecodedKey(pageNo);
        ResponseEntity<ChargerStateUpdateRequest> exchange = restTemplate.exchange(new RequestEntity<>(null, HttpMethod.GET, uri), ChargerStateUpdateRequest.class);
        if (exchange.getHeaders().getContentType().getSubtype().equals("xml")) {
            return null;
        }
        return exchange.getBody();
    }

    private URI requestWithDecodedKey(int pageNo) {
        String serviceKey = randomKeySelector.generateRandomKey();
        return UriComponentsBuilder.fromUriString("https://apis.data.go.kr/B552584/EvCharger")
                .path(REQUEST_URL)
                .queryParam("serviceKey", serviceKey)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", ROW_SIZE)
                .queryParam("dataType", DATA_TYPE)
                .encode()
                .build()
                .toUri();
    }

    private URI requestStateWithDecodedKey(int pageNo) {
        String serviceKey = randomKeySelector.generateRandomKey();
        return UriComponentsBuilder.fromUriString("https://apis.data.go.kr/B552584/EvCharger")
                .path(REQUEST_STATE_URL)
                .queryParam("serviceKey", serviceKey)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", ROW_SIZE)
                .queryParam("dataType", DATA_TYPE)
                .queryParam("period", PERIOD)
                .encode()
                .build()
                .toUri();
    }

    private void waitForRetry() {
        try {
            Thread.sleep(ONE_SECOND);
        } catch (InterruptedException exception) {
            throw new RuntimeException("작업을 기다리는 도중에 문제가 발생했습니다", exception);
        }
    }
}
