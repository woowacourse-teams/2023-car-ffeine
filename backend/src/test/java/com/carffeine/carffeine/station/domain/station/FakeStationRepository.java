package com.carffeine.carffeine.station.domain.station;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakeStationRepository implements StationRepository {

    private final Map<String, Station> map = new HashMap<>();

    @Override
    public Station save(Station station) {
        map.put(station.getStationId(), station);
        return station;
    }

    @Override
    public List<Station> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude) {
        return map.values().stream()
                .filter(it -> it.getLatitude().getValue().compareTo(minLatitude.getValue()) >= 0 && it.getLatitude().getValue().compareTo(maxLatitude.getValue()) <= 0)
                .filter(it -> it.getLongitude().getValue().compareTo(minLongitude.getValue()) >= 0 && it.getLongitude().getValue().compareTo(maxLongitude.getValue()) <= 0)
                .toList();
    }

    @Override
    public List<Station> findAllFetchByLatitudeBetweenAndLongitudeBetween(final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude) {
        return map.values().stream()
                .filter(it -> it.getLatitude().getValue().compareTo(minLatitude) >= 0 && it.getLatitude().getValue().compareTo(maxLatitude) <= 0)
                .filter(it -> it.getLongitude().getValue().compareTo(minLongitude) >= 0 && it.getLongitude().getValue().compareTo(maxLongitude) <= 0)
                .toList();
    }


    @Override
    public Optional<Station> findChargeStationByStationId(String stationId) {
        return map.values().stream()
                .filter(it -> it.getStationId().equals(stationId))
                .findAny();
    }

    @Override
    public List<Station> findAllFetch() {
        return map.values().stream()
                .toList();
    }

    @Override
    public List<Station> findAll() {
        return new ArrayList<>(map.values());
    }
}
