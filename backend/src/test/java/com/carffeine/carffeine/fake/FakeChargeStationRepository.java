package com.carffeine.carffeine.fake;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.ChargeStationRepository;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeChargeStationRepository implements ChargeStationRepository {

    private final Map<String, ChargeStation> map = new HashMap<>();

    @Override
    public ChargeStation save(ChargeStation chargeStation) {
        map.put(chargeStation.getStationId(), chargeStation);
        return chargeStation;
    }

    @Override
    public List<ChargeStation> findAllByLatitudeBetweenAndLongitudeBetween(BigDecimal minLatitude, BigDecimal maxLatitude, BigDecimal minLongitude, BigDecimal maxLongitude) {
        return map.values().stream()
                .filter(it -> it.getLatitude().compareTo(minLatitude) >= 0 && it.getLatitude().compareTo(maxLatitude) <= 0)
                .filter(it -> it.getLongitude().compareTo(minLongitude) >= 0 && it.getLongitude().compareTo(maxLongitude) <= 0)
                .toList();
    }
}
