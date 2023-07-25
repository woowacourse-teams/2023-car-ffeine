package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.domain.congestion.IdGenerator;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class StationService {

    private final StationRepository stationRepository;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerStatusRepository chargerStatusRepository;

    @Transactional(readOnly = true)
    public List<Station> findByCoordinate(CoordinateRequest request) {
        Latitude originLatitude = Latitude.from(request.latitude());
        BigDecimal deltaLatitude = request.latitudeDelta();
        Latitude minLatitude = originLatitude.calculateMinLatitudeByDelta(deltaLatitude);
        Latitude maxLatitude = originLatitude.calculateMaxLatitudeByDelta(deltaLatitude);

        Longitude originLongitude = Longitude.from(request.longitude());
        BigDecimal deltaLongitude = request.longitudeDelta();
        Longitude minLongitude = originLongitude.calculateMinLongitudeByDelta(deltaLongitude);
        Longitude maxLongitude = originLongitude.calculateMaxLongitudeByDelta(deltaLongitude);

        return stationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);
    }

    @Transactional(readOnly = true)
    public Station findStationById(String stationId) {
        return stationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

    @Scheduled(cron = "* * 0/1 * * *")
    public void calculateCongestion() {
        LocalDateTime now = LocalDateTime.now();

        DayOfWeek dayOfWeek = now.getDayOfWeek();

        RequestPeriod period = RequestPeriod.from(now.getHour());

        List<PeriodicCongestion> congestions = periodicCongestionRepository.findAllByDayOfWeekAndStartTime(dayOfWeek, period);
        Map<String, PeriodicCongestion> map = new HashMap<>();
        for (PeriodicCongestion congestion : congestions) {
            String id = congestion.getId();
            map.put(id, congestion);
        }
        List<ChargerStatus> chargerStatuses = chargerStatusRepository.findAll();

        for (ChargerStatus chargerStatus : chargerStatuses) {
            String expectedId = IdGenerator.generateId(dayOfWeek, period, chargerStatus.getStationId(), chargerStatus.getChargerId());
            if (!map.containsKey(expectedId)) {
                int useCount = updateCount(chargerStatus, 0);
                periodicCongestionRepository.save(PeriodicCongestion.of(dayOfWeek, period, useCount, 1, chargerStatus.getStationId(), chargerStatus.getChargerId()));
                continue;
            }

            int useCount = updateCount(chargerStatus, map.get(expectedId).getUseCount());
            int totalCount = map.get(expectedId).getTotalCount() + 1;
            periodicCongestionRepository.save(PeriodicCongestion.of(dayOfWeek, period, useCount, totalCount, chargerStatus.getStationId(), chargerStatus.getChargerId()));
        }
    }

    private int updateCount(ChargerStatus item, int status) {
        if (item.getChargerCondition() == ChargerCondition.CHARGING_IN_PROGRESS) {
            return status + 1;
        }
        return status;
    }
}
