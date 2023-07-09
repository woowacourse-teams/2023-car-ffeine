package com.carffeine.carffeine.service;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.ChargeStationRepository;
import com.carffeine.carffeine.domain.Latitude;
import com.carffeine.carffeine.domain.Longitude;
import com.carffeine.carffeine.dto.CoordinateRequest;
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
}
