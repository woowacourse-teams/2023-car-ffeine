package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.station.Coordinate;
import com.carffeine.carffeine.station.service.station.dto.ClusterRequest;
import com.carffeine.carffeine.station.service.station.dto.GridWithCount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StationGridCacheService {

    private final List<GridWithCount> gridWithCounts;

    public void initialize(List<GridWithCount> gridWithCounts) {
        this.gridWithCounts.addAll(gridWithCounts);
        this.gridWithCounts.sort((o1, o2) -> {
            int compare = o1.latitude().compareTo(o2.latitude());
            if (compare == 0) {
                return o1.longitude().compareTo(o2.longitude());
            }
            return compare;
        });
    }

    public List<GridWithCount> findGrids(ClusterRequest request) {
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());
        BigDecimal maxLatitude = coordinate.maxLatitudeValue();
        BigDecimal minLongitude = coordinate.minLongitudeValue();
        BigDecimal minLatitude = coordinate.minLatitudeValue();
        BigDecimal maxLongitude = coordinate.maxLongitudeValue();
        return findByCoordinate(minLatitude, maxLatitude, minLongitude, maxLongitude);
    }

    private List<GridWithCount> findByCoordinate(BigDecimal minLatitude, BigDecimal maxLatitude, BigDecimal minLongitude, BigDecimal maxLongitude) {
        int lowerBound = binarySearch(minLatitude, 0);
        int upperBound = binarySearch(maxLatitude, lowerBound);
        if (lowerBound == -1 || upperBound == -1) {
            return Collections.emptyList();
        }
        return gridWithCounts.stream()
                .skip(lowerBound)
                .limit(upperBound - lowerBound + 1)
                .filter(grid -> grid.longitude().compareTo(minLongitude) >= 0 && grid.longitude().compareTo(maxLongitude) <= 0)
                .toList();
    }

    private int binarySearch(BigDecimal latitude, int startIndex) {
        int left = startIndex;
        int right = gridWithCounts.size() - 1;
        int result = -1;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            GridWithCount gridWithCount = gridWithCounts.get(middle);
            if (gridWithCount.latitude().compareTo(latitude) >= 0) {
                result = middle;
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        return result;
    }
}
