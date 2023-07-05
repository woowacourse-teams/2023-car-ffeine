package com.carffeine.carffeine.service;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.ChargeStationRepository;
import com.carffeine.carffeine.domain.Charger;
import com.carffeine.carffeine.dto.ChargeStationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ScrapperService {

    private static final String REQUEST_URL = "/getChargerInfo";
    private static final String SERVICE_KEY = "A";
    private static final int ROW_SIZE = 100;
    private static final String DATA_TYPE = "JSON";

    private final RestTemplate restTemplate;
    private final ChargeStationRepository chargeStationRepository;

    @Transactional
    public void scrap() {
        URI uri = UriComponentsBuilder.fromUriString("https://apis.data.go.kr/B552584/EvCharger")
                .path(REQUEST_URL)
                .queryParam("serviceKey", SERVICE_KEY)
                .queryParam("pageNo", 1)
                .queryParam("numOfRows", ROW_SIZE)
                .queryParam("dataType", DATA_TYPE)
                .build()
                .toUri();

        ChargeStationRequest chargeStationRequest = restTemplate.getForObject(uri, ChargeStationRequest.class);
        List<ChargeStation> chargeStations = Objects.requireNonNull(chargeStationRequest)
                .items()
                .toDomains();

        Map<String, List<Charger>> chargersByStationId = new HashMap<>();
        Map<String, ChargeStation> chargeStationByStationId = new HashMap<>();

        for (ChargeStation chargeStation : chargeStations) {
            String chargeStationId = chargeStation.getStationId();
            chargeStationByStationId.put(chargeStationId, chargeStation);

            List<Charger> chargers = chargersByStationId.getOrDefault(chargeStationId, new ArrayList<>());

            chargers.add(chargeStation.getChargers().get(0));
            chargersByStationId.put(chargeStationId, chargers);
        }

        List<ChargeStation> chargeStationsToSave = new ArrayList<>();

        for (String stationId : chargersByStationId.keySet()) {
            ChargeStation chargeStation = chargeStationByStationId.get(stationId);
            chargeStation.setChargers(chargersByStationId.get(stationId));
            chargeStationsToSave.add(chargeStation);
        }

        for (ChargeStation chargeStation : chargeStationsToSave) {
            chargeStationRepository.save(chargeStation);
        }
    }
}
