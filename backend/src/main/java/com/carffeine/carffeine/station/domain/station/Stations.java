package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Stations {

    private final List<Station> stations;

    private Stations(List<Station> stations) {
        this.stations = new ArrayList<>(stations);
    }

    public static Stations from(List<Station> stations) {
        return new Stations(stations);
    }

    private void filterByCompanyNames(List<Station> stations, List<String> companyNames) {
        if (!companyNames.isEmpty()) {
            stations.removeIf(station -> !companyNames.contains(station.getCompanyName()));
        }
    }

    public List<Station> findFilteredStations(List<String> companyNames,
                                              List<ChargerType> chargerTypes,
                                              List<BigDecimal> capacities) {
        List<Station> stations = new ArrayList<>(this.stations);
        filterByCompanyNames(stations, companyNames);
        filterByChargerTypes(stations, chargerTypes);
        filterByCapacities(stations, capacities);
        return Collections.unmodifiableList(stations);
    }

    private void filterByChargerTypes(List<Station> stations, List<ChargerType> chargerTypes) {
        if (!chargerTypes.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> chargerTypes.contains(charger.getType()))
            );
        }
    }

    private void filterByCapacities(List<Station> stations, List<BigDecimal> capacities) {
        if (!capacities.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> capacities.stream()
                            .anyMatch(capacity -> isSameCapacity(charger.getCapacity(), capacity))
                    ));
        }
    }

    private boolean isSameCapacity(BigDecimal capacity, BigDecimal filterCapacity) {
        return capacity.compareTo(filterCapacity) == 0;
    }
}
