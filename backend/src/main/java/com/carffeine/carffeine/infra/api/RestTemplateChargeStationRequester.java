package com.carffeine.carffeine.infra.api;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRequester;
import com.carffeine.carffeine.service.chargerStation.dto.ChargeStationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
public class RestTemplateChargeStationRequester implements ChargeStationRequester {

    private static final String REQUEST_URL = "/getChargerInfo";
    private static final int ROW_SIZE = 9999;
    private static final String DATA_TYPE = "JSON";
    private static final int ONE_SECOND = 1000;
    private final RestTemplate restTemplate;

    @Value("${api.service_key}")
    private String serviceKey;

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

    private ChargeStationRequest requestChargeStationRequestWithRetry(int pageNo) {
        URI uri = requestWithDecodedKey(pageNo);
        ResponseEntity<ChargeStationRequest> exchange = restTemplate.exchange(new RequestEntity<>(null, HttpMethod.GET, uri), ChargeStationRequest.class);
        if (exchange.getHeaders().getContentType().getSubtype().equals("xml")) {
            return null;
        }
        return exchange.getBody();
    }

    private URI requestWithDecodedKey(int pageNo) {
        return UriComponentsBuilder.fromUriString("https://apis.data.go.kr/B552584/EvCharger")
                .path(REQUEST_URL)
                .queryParam("serviceKey", serviceKey)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", ROW_SIZE)
                .queryParam("dataType", DATA_TYPE)
                .build()
                .toUri();
    }

    private void waitForRetry() {
        try {
            Thread.sleep(ONE_SECOND);
        } catch (InterruptedException exception) {
            throw new RuntimeException(exception);
        }
    }
}
