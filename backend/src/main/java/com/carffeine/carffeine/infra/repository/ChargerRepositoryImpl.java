package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargerStation.charger.Charger;
import com.carffeine.carffeine.domain.chargerStation.charger.CustomChargerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ChargerRepositoryImpl implements CustomChargerRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void saveAll(List<Charger> chargers) {
        String sql = "INSERT IGNORE INTO charger (station_id, charger_id, type, address, price, capacity, method)" +
                " VALUES (:stationId, :chargerId, :type, :price, :capacity, :method)";

        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(chargers));
    }

    private MapSqlParameterSource[] chargerSqlParameterSource(List<Charger> chargers) {
        return chargers.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToSqlParameterSource(Charger charger) {
        return new MapSqlParameterSource()
                .addValue("stationId", charger.getStationId())
                .addValue("chargerId", charger.getChargerId())
                .addValue("type", charger.getType())
                .addValue("price", charger.getPrice())
                .addValue("capacity", charger.getCapacity())
                .addValue("method", charger.getMethod());
    }
}
