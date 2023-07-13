package com.carffeine.carffeine.fake.chargerStation;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.Latitude;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.Longitude;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakeChargeStationRepository implements ChargeStationRepository {

    private final Map<String, ChargeStation> map = new HashMap<>();

    @Override
    public ChargeStation save(ChargeStation chargeStation) {
        map.put(chargeStation.getStationId(), chargeStation);
        return chargeStation;
    }

    @Override
    public List<ChargeStation> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude) {
        return map.values().stream()
                .filter(it -> it.getLatitude().getValue().compareTo(minLatitude.getValue()) >= 0 && it.getLatitude().getValue().compareTo(maxLatitude.getValue()) <= 0)
                .filter(it -> it.getLongitude().getValue().compareTo(minLongitude.getValue()) >= 0 && it.getLongitude().getValue().compareTo(maxLongitude.getValue()) <= 0)
                .toList();
    }

    @Override
    public Optional<ChargeStation> findChargeStationByStationId(String stationId) {
        return map.values().stream()
                .filter(it -> it.getStationId().equals(stationId))
                .findAny();
    }

    @Override
    public List<ChargeStation> findAll() {
        return map.values().stream()
                .toList();
    }
}
