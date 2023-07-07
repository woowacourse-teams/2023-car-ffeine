package com.carffeine.carffeine.service;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.ChargeStationRepository;
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
        BigDecimal centerX = request.centerX();
        BigDecimal centerY = request.centerY();
        BigDecimal deltaX = request.deltaX();
        BigDecimal deltaY = request.deltaY();

        BigDecimal minLatitude = centerX.subtract(deltaX);
        BigDecimal maxLatitude = centerX.add(deltaX);
        BigDecimal minLongitude = centerY.subtract(deltaY);
        BigDecimal maxLongitude = centerY.add(deltaY);
        return chargeStationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);
    }
}
