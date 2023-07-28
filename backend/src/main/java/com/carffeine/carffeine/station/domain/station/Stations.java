package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Stations {

    private static final int NONE_CAPACITY = 0;

    private final List<Station> stations;

    private Stations(List<Station> stations) {
        this.stations = new ArrayList<>(stations);
    }

    public static Stations from(List<Station> stations) {
        return new Stations(stations);
    }

    private static void filterByCompanyNames(List<Station> stations, List<String> companyNames) {
        if (!companyNames.isEmpty()) {
            stations.removeIf(station -> !companyNames.contains(station.getCompanyName()));
        }
    }

    private static void filterByChargerTypes(List<Station> stations, List<ChargerType> chargerTypes) {
        if (!chargerTypes.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> chargerTypes.contains(charger.getType()))
            );
        }
    }

    private static void filterByCapacities(List<Station> stations, List<BigDecimal> capacities) {
        if (!capacities.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> capacities.stream()
                            .anyMatch(capacity -> capacity.compareTo(charger.getCapacity()) == NONE_CAPACITY))
            );
        }
    }

    public List<Station> getFilteredStations(List<String> companyNames,
                                             List<ChargerType> chargerTypes,
                                             List<BigDecimal> capacities) {
        filterByCompanyNames(stations, companyNames);
        filterByChargerTypes(stations, chargerTypes);
        filterByCapacities(stations, capacities);
        stations.removeIf(station -> station.getChargers().isEmpty());
        return stations;
    }
}
