package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.CustomChargerRepository;
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
        String sql = "INSERT IGNORE INTO charger (station_id, charger_id, type, price, capacity, method)" +
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
                .addValue("type", charger.getType().name())
                .addValue("type", charger.getType().name())
                .addValue("price", charger.getPrice())
                .addValue("capacity", charger.getCapacity())
                .addValue("method", charger.getMethod());
    }

    @Override
    public void saveAllChargersBatch(List<Charger> chargers) {
        if (chargers.isEmpty()) {
            return;
        }
        String sql = "INSERT INTO charger (station_id, charger_id, type, price, capacity, method)" +
                " VALUES (:stationId, :chargerId, :type, :price, :capacity, :method)";

        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(chargers));
    }

    @Override
    public void updateAllChargersBatch(List<Charger> chargers) {
        if (chargers.isEmpty()) {
            return;
        }

        String sql = "UPDATE charger SET type = :type, price = :price, capacity = :capacity, method = :method " +
                "WHERE station_id = :stationId AND charger_id = :chargerId";

        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(chargers));
    }
}
