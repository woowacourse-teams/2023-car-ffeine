package com.carffeine.carffeine.service.chargerStation;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.exception.ChargeStationException;
import com.carffeine.carffeine.domain.chargerStation.exception.ChargeStationExceptionType;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.Latitude;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.Longitude;
import com.carffeine.carffeine.service.chargerStation.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChargerStationService {

    private final ChargeStationRepository chargeStationRepository;

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
}
