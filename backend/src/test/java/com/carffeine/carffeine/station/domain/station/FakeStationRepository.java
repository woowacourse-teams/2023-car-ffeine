package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

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
    public List<Station> findAllFetchByLatitudeBetweenAndLongitudeBetween(BigDecimal minLatitude, BigDecimal maxLatitude, BigDecimal minLongitude, BigDecimal maxLongitude) {
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

    public Page<Station> findAll(Pageable pageable) {
        List<Station> allStations = new ArrayList<>(map.values());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allStations.size());
        List<Station> pagedStations = allStations.subList(start, end);
        return new PageImpl<>(pagedStations, pageable, allStations.size());
    }

    public Page<Station> findAllByStationNameContains(Pageable pageable, String stationName) {
        List<Station> matchingStations = map.values().stream()
                .filter(station -> station.getStationName().contains(stationName))
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), matchingStations.size());
        List<Station> pagedStations = matchingStations.subList(start, end);
        return new PageImpl<>(pagedStations, pageable, matchingStations.size());
    }

    @Override
    public List<Station> findAllByStationNameContainingOrAddressContainingOrderByStationId(String stationName, String address) {
        return map.values().stream()
                .filter(it -> it.getStationName().contains(stationName) || it.getAddress().contains(address))
                .toList();
    }

    @Override
    public Optional<Station> findFetchByStationId(String stationId) {
        return Optional.of(map.get(stationId));
    }

    @Override
    public List<Station> findAllByFilteringBeingCompanyNames(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCompanyNamesWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingTypes(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<ChargerType> types) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingTypesWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<ChargerType> types) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCapacities(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<BigDecimal> capacities) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCapacitiesWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<BigDecimal> capacities) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCompanyNamesAndTypes(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames, final List<ChargerType> types) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCompanyNamesAndTypesWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames, final List<ChargerType> types) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCompanyNamesAndCapacities(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames, final List<BigDecimal> capacities) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingCompanyNamesAndCapacitiesWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames, final List<BigDecimal> capacities) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingTypesAndCapacities(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<ChargerType> types, final List<BigDecimal> capacities) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingTypesAndCapacitiesWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<ChargerType> types, final List<BigDecimal> capacities) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingAllFilters(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames, final List<BigDecimal> capacities, final List<ChargerType> types) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringBeingAllFiltersWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude, final List<String> companyNames, final List<BigDecimal> capacities, final List<ChargerType> types) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringNone(final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude) {
        return null;
    }

    @Override
    public List<Station> findAllByFilteringNoneWithPaging(final String stationId, final Pageable pageable, final BigDecimal minLatitude, final BigDecimal maxLatitude, final BigDecimal minLongitude, final BigDecimal maxLongitude) {
        return null;
    }

}
