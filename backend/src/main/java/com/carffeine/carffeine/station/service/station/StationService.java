package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
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
import java.util.List;

@RequiredArgsConstructor
@Service
public class StationService {

    private final StationRepository stationRepository;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerStatusRepository chargerStatusRepository;
    private final PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

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

    @Transactional
    @Scheduled(cron = "* * 0/1 * * *")
    public void calculateCongestion() {
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        RequestPeriod period = RequestPeriod.from(now.getHour());
        List<ChargerStatus> chargerStatuses = chargerStatusRepository.findAll();
        List<PeriodicCongestion> congestions = chargerStatuses.stream()
                .map(it -> PeriodicCongestion.of(dayOfWeek, period, 0, 0, it.getStationId(), it.getChargerId()))
                .toList();
        List<ChargerStatus> usingChargers = chargerStatuses.stream()
                .filter(ChargerStatus::isUsing)
                .toList();
        periodicCongestionCustomRepository.saveAll(congestions);
        periodicCongestionCustomRepository.updateTotalCountByPeriod(dayOfWeek, period);
        periodicCongestionCustomRepository.updateUsingCount(dayOfWeek, period, usingChargers);
    }
}
