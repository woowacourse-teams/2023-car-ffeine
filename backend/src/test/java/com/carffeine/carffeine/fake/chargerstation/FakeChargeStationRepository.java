package com.carffeine.carffeine.fake.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargestation.Latitude;
import com.carffeine.carffeine.domain.chargestation.Longitude;

import java.util.ArrayList;
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
    public List<ChargeStation> findAllFetch() {
        return map.values().stream()
                .toList();
    }

    @Override
    public List<ChargeStation> findAll() {
        return new ArrayList<>(map.values());
    }
}
