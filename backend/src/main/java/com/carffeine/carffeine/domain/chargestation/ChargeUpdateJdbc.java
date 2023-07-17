package com.carffeine.carffeine.domain.chargestation;

import com.carffeine.carffeine.domain.chargestation.charger.Charger;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChargeUpdateJdbc {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public ChargeUpdateJdbc(JdbcTemplate jdbcTemplate) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
    }

    public void saveAllStationsBatch(List<ChargeStation> chargeStations) {
        String sql = "INSERT INTO charge_station (station_id, station_name, company_name, is_parking_free, operating_time, detail_location, latitude, longitude, is_private, contact, station_state, private_reason)" +
                " VALUES (:stationId, :stationName, :companyName, :isParkingFree, :operatingTime, :detailLocation, :latitude, :longitude, :isPrivate, :contact, :stationState, :privateReason)";

        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(chargeStations));
    }

    private MapSqlParameterSource[] chargeStationSqlParameterSource(List<ChargeStation> chargeStations) {
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

    public void updateAllStationsBatch(List<ChargeStation> chargeStations) {
        String sql = "UPDATE charge_station " +
                "SET contact = :contact, company_name = :companyName, detail_location = :detailLocation, is_parking_free = :isParkingFree, is_private = :isPrivate, latitude = :latitude, longitude = :longitude, operating_time = :operatingTime, private_reason = :privateReason, station_name = :stationName, station_state =:stationState " +
                "WHERE station_id = :stationId";


        namedParameterJdbcTemplate.batchUpdate(sql, chargeStationSqlParameterSource(chargeStations));
    }

    public void saveAllChargersBatch(List<Charger> chargeStations) {
        String chargerStatusSql = "INSERT INTO charger_status (charger_id, station_id, charger_state, latest_update_time)" +
                " VALUES (:chargerId, :stationId, :chargerState, :latestUpdateTime)";

        List<ChargerStatus> collect = chargeStations.stream()
                .map(Charger::getChargerStatus)
                .toList();

        namedParameterJdbcTemplate.batchUpdate(chargerStatusSql, chargerStatusSqlParameterSource(collect));

        String sql = "INSERT INTO charger (station_id, charger_id, type, address, price, capacity, method, fk_station_id, fk_charger_id)" +
                " VALUES (:stationId, :chargerId, :type, :address, :price, :capacity, :method, :fkStationId, :fkChargerId)";

        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(chargeStations));
    }

    public void updateAllChargersBatch(List<Charger> chargeStations) {
        String sql = "UPDATE charger SET type = :type, address = :address, price = :price, capacity = :capacity, method = :method " +
                "WHERE station_id = :stationId AND charger_id = :chargerId";

        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(chargeStations));
    }

    private MapSqlParameterSource[] chargerSqlParameterSource(List<Charger> chargers) {
        return chargers.stream()
                .map(this::changeToChargerSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource[] chargerStatusSqlParameterSource(List<ChargerStatus> chargerStatuses) {
        return chargerStatuses.stream()
                .map(this::changeToChargerStatusSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToChargerSqlParameterSource(Charger charger) {
        return new MapSqlParameterSource()
                .addValue("stationId", charger.getStationId())
                .addValue("chargerId", charger.getChargerId())
                .addValue("type", charger.getType())
                .addValue("address", charger.getAddress())
                .addValue("price", charger.getPrice())
                .addValue("capacity", charger.getCapacity())
                .addValue("method", charger.getMethod())
                .addValue("fkStationId", charger.getStationId())
                .addValue("fkChargerId", charger.getChargerId());
    }

    private MapSqlParameterSource changeToChargerStatusSqlParameterSource(ChargerStatus chargerStatus) {
        return new MapSqlParameterSource()
                .addValue("chargerId", chargerStatus.getChargerId())
                .addValue("stationId", chargerStatus.getStationId())
                .addValue("chargerState", chargerStatus.getChargerState().getValue())
                .addValue("latestUpdateTime", chargerStatus.getLatestUpdateTime());
    }
}
