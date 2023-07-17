package com.carffeine.carffeine.service.chargerStation;

import com.carffeine.carffeine.domain.chargerStation.congestion.IdGenerator;
import com.carffeine.carffeine.domain.chargerStation.congestion.PeriodicCongestion;
import com.carffeine.carffeine.domain.chargerStation.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.domain.chargerStation.congestion.RequestPeriod;
import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargestation.Latitude;
import com.carffeine.carffeine.domain.chargestation.Longitude;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationException;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationExceptionType;
import com.carffeine.carffeine.service.chargerStation.dto.ChargersForCongestionRequest;
import com.carffeine.carffeine.service.chargerStation.dto.Item;
import com.carffeine.carffeine.service.chargerstation.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ChargerStationService {

    private static final String REQUEST_URL = "/getChargerStatus";
    private static final int ROW_SIZE = 100;
    private static final String DATA_TYPE = "JSON";
    private static final String USING = "3";
    private final ChargeStationRepository chargeStationRepository;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final RestTemplate restTemplate;
    @Value("${api.service_key}")
    private String SERVICE_KEY;

    @Transactional(readOnly = true)
    public List<ChargeStation> findByCoordinate(CoordinateRequest request) {
        Latitude originLatitude = Latitude.from(request.latitude());
        BigDecimal deltaLatitude = request.latitudeDelta();
        Latitude minLatitude = originLatitude.calculateMinLatitudeByDelta(deltaLatitude);
        Latitude maxLatitude = originLatitude.calculateMaxLatitudeByDelta(deltaLatitude);

        Longitude originLongitude = Longitude.from(request.longitude());
        BigDecimal deltaLongitude = request.latitudeDelta();
        Longitude minLongitude = originLongitude.calculateMinLongitudeByDelta(deltaLongitude);
        Longitude maxLongitude = originLongitude.calculateMaxLongitudeByDelta(deltaLongitude);

        return chargeStationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);
    }

    @Transactional(readOnly = true)
    public ChargeStation findStationById(String stationId) {
        return chargeStationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new ChargeStationException(ChargeStationExceptionType.NOT_FOUND_ID));
    }

    public void calculateCongestion() {
        URI uri = UriComponentsBuilder.fromUriString("https://apis.data.go.kr/B552584/EvCharger")
                .path(REQUEST_URL)
                .queryParam("serviceKey", SERVICE_KEY)
                .queryParam("pageNo", 1)
                .queryParam("numOfRows", ROW_SIZE)
                .queryParam("dataType", DATA_TYPE)
                .build()
                .toUri();

        ChargersForCongestionRequest chargersForCongestionRequest = restTemplate.getForObject(uri, ChargersForCongestionRequest.class);

        List<Item> items = chargersForCongestionRequest.items().item();

        LocalDateTime now = LocalDateTime.now();

        DayOfWeek dayOfWeek = now.getDayOfWeek();

        RequestPeriod period = RequestPeriod.from(now.getHour());

        List<PeriodicCongestion> congestions = periodicCongestionRepository.findAllByDayOfWeekAndStartTime(dayOfWeek, period);
        Map<String, PeriodicCongestion> map = new HashMap<>();
        for (PeriodicCongestion congestion : congestions) {
            String id = congestion.getId();
            map.put(id, congestion);
        }

        for (Item item : items) {
            String expectedId = IdGenerator.generateId(dayOfWeek, period, item.statId(), item.chgerId());
            if (!map.containsKey(expectedId)) {
                int useCount = updateCount(item, 0);
                periodicCongestionRepository.save(PeriodicCongestion.of(dayOfWeek, period, useCount, 1, item.statId(), item.chgerId()));
                continue;
            }

            int useCount = updateCount(item, map.get(expectedId).getUseCount());
            int totalCount = map.get(expectedId).getTotalCount() + 1;
            periodicCongestionRepository.save(PeriodicCongestion.of(dayOfWeek, period, useCount, totalCount, item.statId(), item.chgerId()));
        }
    }

    private int updateCount(Item item, int status) {
        if (item.stat().equals(USING)) {
            return status + 1;
        }
        return status;
    }
}
