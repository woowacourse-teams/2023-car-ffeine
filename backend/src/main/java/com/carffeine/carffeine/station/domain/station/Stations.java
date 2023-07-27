package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Stations {

    private final List<Station> stations;

    private Stations(List<Station> stations) {
        this.stations = new ArrayList<>(stations);
    }

    public static Stations of(List<Station> stations) {
        return new Stations(stations);
    }

    public static Stations createFilteredOf(List<Station> stations,
                                            List<String> companyNames,
                                            List<ChargerType> chargerTypes,
                                            List<BigDecimal> capacities) {
        List<Station> stationsCopy = new ArrayList<>(stations);

        filterByCompanyNames(stationsCopy, companyNames);
        filterByChargerTypes(stationsCopy, chargerTypes);
        filterByCapacities(stationsCopy, capacities);

        return new Stations(stationsCopy);
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
                    .noneMatch(charger -> capacities.contains(charger.getCapacity()))
            );
        }
    }

    public List<Station> getStationsExclusiveEmptyChargers() {
        List<Station> stationsExclusiveEmptyChargers = new ArrayList<>(stations);
        stationsExclusiveEmptyChargers.removeIf(station -> station.getChargers().isEmpty());

        return stationsExclusiveEmptyChargers;
    }
}
