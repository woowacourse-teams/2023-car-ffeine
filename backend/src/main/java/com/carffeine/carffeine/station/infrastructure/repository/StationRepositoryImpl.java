package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.domain.station.CustomStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Component
public class StationRepositoryImpl implements CustomStationRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void saveAll(Collection<Station> stations) {
        String sql = "INSERT IGNORE INTO charge_station (station_id, station_name, company_name, address, is_parking_free, operating_time, detail_location, latitude, longitude, is_private, contact, station_state, private_reason, created_at, updated_at)" +
                " VALUES (:stationId, :stationName, :companyName, :address, :isParkingFree, :operatingTime, :detailLocation, :latitude, :longitude, :isPrivate, :contact, :stationState, :privateReason, :createdAt, :updatedAt)";
        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(stations));
    }

    private MapSqlParameterSource[] chargeStationSqlParameterSource(Collection<Station> stations) {
        return stations.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    @Override
    public void saveAllStationsBatch(List<Station> stations) {
        if (stations.isEmpty()) {
            return;
        }

        String sql = "INSERT INTO charge_station (station_id, station_name, company_name, address, is_parking_free, operating_time, detail_location, latitude, longitude, is_private, contact, station_state, private_reason, created_at, updated_at)" +
                " VALUES (:stationId, :stationName, :companyName, :address, :isParkingFree, :operatingTime, :detailLocation, :latitude, :longitude, :isPrivate, :contact, :stationState, :privateReason, :createdAt, :updatedAt)";
        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(stations));
    }

    @Override
    public void updateAllStationsBatch(List<Station> stations) {
        if (stations.isEmpty()) {
            return;
        }

        String sql = "UPDATE charge_station " +
                "SET contact = :contact, company_name = :companyName, address = :address, detail_location = :detailLocation, is_parking_free = :isParkingFree, is_private = :isPrivate, latitude = :latitude, longitude = :longitude, operating_time = :operatingTime, private_reason = :privateReason, station_name = :stationName, station_state =:stationState, updated_at = :updatedAt " +
                "WHERE station_id = :stationId";

        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(stations));
    }

    private MapSqlParameterSource[] chargeStationSqlParameterSource(List<Station> stations) {
        return stations.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToSqlParameterSource(Station station) {
        LocalDateTime now = LocalDateTime.now();
        return new MapSqlParameterSource()
                .addValue("stationId", station.getStationId())
                .addValue("stationName", station.getStationName())
                .addValue("companyName", station.getCompanyName())
                .addValue("address", station.getAddress())
                .addValue("isParkingFree", station.isParkingFree())
                .addValue("operatingTime", station.getOperatingTime())
                .addValue("detailLocation", station.getDetailLocation())
                .addValue("latitude", station.getLatitude().getValue())
                .addValue("longitude", station.getLongitude().getValue())
                .addValue("isPrivate", station.isPrivate())
                .addValue("contact", station.getContact())
                .addValue("stationState", station.getStationState())
                .addValue("privateReason", station.getPrivateReason())
                .addValue("createdAt", now)
                .addValue("updatedAt", now);
    }
}
