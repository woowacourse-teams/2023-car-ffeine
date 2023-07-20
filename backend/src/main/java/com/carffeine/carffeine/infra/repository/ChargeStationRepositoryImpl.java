package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.CustomChargeStationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ChargeStationRepositoryImpl implements CustomChargeStationRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void saveAll(Collection<ChargeStation> chargeStations) {
        String sql = "INSERT IGNORE INTO charge_station (station_id, station_name, company_name, is_parking_free, operating_time, detail_location, latitude, longitude, is_private, contact, station_state, private_reason)" +
                " VALUES (:stationId, :stationName, :companyName, :isParkingFree, :operatingTime, :detailLocation, :latitude, :longitude, :isPrivate, :contact, :stationState, :privateReason)";
        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(chargeStations));
    }

    private MapSqlParameterSource[] chargeStationSqlParameterSource(Collection<ChargeStation> chargeStations) {
        return chargeStations.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToSqlParameterSource(ChargeStation chargeStation) {
        return new MapSqlParameterSource()
                .addValue("stationId", chargeStation.getStationId())
                .addValue("stationName", chargeStation.getStationName())
                .addValue("companyName", chargeStation.getCompanyName())
                .addValue("isParkingFree", chargeStation.getIsParkingFree())
                .addValue("address", chargeStation.getAddress())
                .addValue("operatingTime", chargeStation.getOperatingTime())
                .addValue("detailLocation", chargeStation.getDetailLocation())
                .addValue("latitude", chargeStation.getLatitude().getValue())
                .addValue("longitude", chargeStation.getLongitude().getValue())
                .addValue("isPrivate", chargeStation.getIsPrivate())
                .addValue("contact", chargeStation.getContact())
                .addValue("stationState", chargeStation.getStationState())
                .addValue("privateReason", chargeStation.getPrivateReason());
    }

    @Override
    public void saveAllStationsBatch(List<ChargeStation> chargeStations) {
        if (chargeStations.isEmpty()) {
            return;
        }

        String sql = "INSERT INTO charge_station (station_id, station_name, company_name, address, is_parking_free, operating_time, detail_location, latitude, longitude, is_private, contact, station_state, private_reason)" +
                " VALUES (:stationId, :stationName, :companyName, :address, :isParkingFree, :operatingTime, :detailLocation, :latitude, :longitude, :isPrivate, :contact, :stationState, :privateReason)";
        System.out.println(chargeStations);
        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(chargeStations));
    }

    @Override
    public void updateAllStationsBatch(List<ChargeStation> chargeStations) {
        if (chargeStations.isEmpty()) {
            return;
        }

        String sql = "UPDATE charge_station " +
                "SET contact = :contact, company_name = :companyName, address = :address, detail_location = :detailLocation, is_parking_free = :isParkingFree, is_private = :isPrivate, latitude = :latitude, longitude = :longitude, operating_time = :operatingTime, private_reason = :privateReason, station_name = :stationName, station_state =:stationState " +
                "WHERE station_id = :stationId";

        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(chargeStations));
    }

    private MapSqlParameterSource[] chargeStationSqlParameterSource(List<ChargeStation> chargeStations) {
        return chargeStations.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }
}
