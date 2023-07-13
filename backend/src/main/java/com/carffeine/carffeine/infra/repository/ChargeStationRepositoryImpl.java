package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.CustomChargeStationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;

@RequiredArgsConstructor
@Component
public class ChargeStationRepositoryImpl implements CustomChargeStationRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void saveAll(Collection<ChargeStation> chargeStations) {
        String sql = "INSERT IGNORE INTO charge_station (stationId, stationName, companyName, isParkingFree, operatingTime, detailLocation, latitude, longitude, isPrivate, contact, stationState, privateReason)" +
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
                .addValue("operatingTime", chargeStation.getOperatingTime())
                .addValue("detailLocation", chargeStation.getDetailLocation())
                .addValue("latitude", chargeStation.getLatitude().getValue())
                .addValue("longitude", chargeStation.getLongitude().getValue())
                .addValue("isPrivate", chargeStation.getIsPrivate())
                .addValue("contact", chargeStation.getContact())
                .addValue("stationState", chargeStation.getStationState())
                .addValue("privateReason", chargeStation.getPrivateReason());
    }
}
