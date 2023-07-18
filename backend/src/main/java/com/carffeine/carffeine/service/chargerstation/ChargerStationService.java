package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargestation.Latitude;
import com.carffeine.carffeine.domain.chargestation.Longitude;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerState;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatus;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatusRepository;
import com.carffeine.carffeine.domain.chargestation.congestion.IdGenerator;
import com.carffeine.carffeine.domain.chargestation.congestion.PeriodicCongestion;
import com.carffeine.carffeine.domain.chargestation.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.domain.chargestation.congestion.RequestPeriod;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationException;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationExceptionType;
import com.carffeine.carffeine.service.chargerstation.dto.CoordinateRequest;
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
public class ChargerStationService {
    private final ChargeStationRepository chargeStationRepository;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerStatusRepository chargerStatusRepository;

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
        if (item.getChargerState() == ChargerState.CHARGING_IN_PROGRESS) {
            return status + 1;
        }
        return status;
    }
}
