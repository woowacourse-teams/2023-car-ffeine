package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Stations {

    private final List<Station> stations;

    private Stations(final List<Station> stations) {
        this.stations = new ArrayList<>(stations);
    }

    public static Stations of(List<Station> stations) {
        return new Stations(stations);
    }

    public void filterByCompanyNames(List<String> companyNames) {
        if (!companyNames.isEmpty()) {
            stations.removeIf(station -> !companyNames.contains(station.getCompanyName()));
        }
    }

    public void filterByChargerTypes(List<ChargerType> chargerTypes) {
        if (!chargerTypes.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> chargerTypes.contains(charger.getType()))
            );
        }
    }

    public void filterByCapacities(List<BigDecimal> capacities) {
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
