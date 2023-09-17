package com.carffeine.carffeine.station.infrastructure.repository.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class StationCacheRepository {

    private final List<StationInfo> cachedStations;

    public void initialize(List<StationInfo> stations) {
        cachedStations.addAll(stations);
        cachedStations.sort((o1, o2) -> {
            int latitudeCompare = o1.latitude().compareTo(o2.latitude());
            if (latitudeCompare == 0) {
                return o1.longitude().compareTo(o2.longitude());
            }
            return latitudeCompare;
        });
    }

    public List<StationInfo> findByCoordinate(
            BigDecimal minLatitude,
            BigDecimal maxLatitude,
            BigDecimal minLongitude,
            BigDecimal maxLongitude,
            List<String> companyNames,
            List<ChargerType> chargerTypes,
            List<BigDecimal> capacities
    ) {
        List<StationInfo> stationInfos = new ArrayList<>(binarySearch(minLatitude, maxLatitude, minLongitude, maxLongitude));

        filterByCompanyNames(stationInfos, companyNames);
        filterByChargerTypes(stationInfos, chargerTypes);
        filterByCapacities(stationInfos, capacities);
        return Collections.unmodifiableList(stationInfos);
    }

    private void filterByCompanyNames(List<StationInfo> stations, List<String> companyNames) {
        if (!companyNames.isEmpty()) {
            stations.removeIf(station -> !companyNames.contains(station.companyName()));
        }
    }

    private void filterByChargerTypes(List<StationInfo> stations, List<ChargerType> chargerTypes) {
        if (!chargerTypes.isEmpty()) {
            stations.removeIf(station -> station
                    .chargerType()
                    .stream()
                    .noneMatch(chargerTypes::contains)
            );
        }
    }

    private void filterByCapacities(List<StationInfo> stations, List<BigDecimal> capacities) {
        if (!capacities.isEmpty()) {
            stations.removeIf(station -> station.capacity().stream()
                    .noneMatch(stationCapacity -> capacities.stream()
                            .anyMatch(capacity -> isSameCapacity(stationCapacity, capacity))
                    ));
        }
    }

    private boolean isSameCapacity(BigDecimal capacity, BigDecimal filterCapacity) {
        return capacity.compareTo(filterCapacity) == 0;
    }

    private int findLowerIndex(List<StationInfo> stationInfos, BigDecimal minLatitude) {
        int left = 0;
        int right = stationInfos.size() - 1;
        int result = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (stationInfos.get(mid).latitude().compareTo(minLatitude) >= 0) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return result;
    }

    private int findUpperBound(List<StationInfo> stationInfos, BigDecimal maxLatitude, int startIndex) {
        int left = startIndex;
        int right = stationInfos.size() - 1;
        int result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (stationInfos.get(mid).latitude().compareTo(maxLatitude) >= 0) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return result;
    }

    private List<StationInfo> binarySearch(BigDecimal minLatitude, BigDecimal maxLatitude, BigDecimal minLongitude, BigDecimal maxLongitude) {
        int lowerBound = findLowerIndex(cachedStations, minLatitude);
        int upperBound = findUpperBound(cachedStations, maxLatitude, lowerBound);
        if (lowerBound == -1 && upperBound == -1) {
            return Collections.emptyList();
        }
        return cachedStations.stream()
                .skip(lowerBound)
                .limit(upperBound - lowerBound + 1L)
                .filter(station -> station.longitude().compareTo(minLongitude) >= 0 && station.longitude().compareTo(maxLongitude) <= 0)
                .toList();
    }
}
