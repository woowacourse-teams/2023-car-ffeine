package com.carffeine.carffeine.station.infrastructure.repository.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
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
        List<StationInfo> stationInfos = binarySearch(minLatitude, maxLatitude, minLongitude, maxLongitude);
        return stationInfos;
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

    private int binarySearchRight(List<StationInfo> stationInfos, BigDecimal maxLatitude) {
        int left = 0;
        int right = stationInfos.size() - 1;
        int result = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (stationInfos.get(mid).latitude().compareTo(maxLatitude) <= 0) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    private List<StationInfo> binarySearch(BigDecimal minLatitude, BigDecimal maxLatitude, BigDecimal minLongitude, BigDecimal maxLongitude) {
        int lowerBound = findLowerIndex(cachedStations, minLatitude);
        int upperBound = binarySearchRight(cachedStations, maxLatitude);
        if (lowerBound == -1 && upperBound == -1) {
            return Collections.emptyList();
        }
        List<StationInfo> stationInfos = cachedStations.subList(lowerBound, upperBound + 1);
        return stationInfos.parallelStream()
                .filter(station -> station.longitude().compareTo(minLongitude) >= 0 && station.longitude().compareTo(maxLongitude) <= 0)
                .toList();
    }

    private boolean isContains(List<ChargerType> chargerTypes, List<ChargerType> stations) {
        return chargerTypes.stream().anyMatch(stations::contains);
    }
}
