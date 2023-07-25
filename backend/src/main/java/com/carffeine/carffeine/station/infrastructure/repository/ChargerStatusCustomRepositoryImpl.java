package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ChargerStatusCustomRepositoryImpl implements ChargerStatusCustomRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    @Transactional
    public void saveAll(List<ChargerStatus> chargerStatuses) {
        String sql = "INSERT INTO charger_status (station_id, charger_id, latest_update_time, charger_condition) " +
                "VALUES (:stationId, :chargerId, :latestUpdateTime, :chargerCondition) " +
                "ON DUPLICATE KEY UPDATE latest_update_time = :latestUpdateTime, charger_condition = :chargerCondition";
        SqlParameterSource[] sqlParameterSources = chargerStatuses.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(SqlParameterSource[]::new);
        namedParameterJdbcTemplate.batchUpdate(sql, sqlParameterSources);
    }

    private MapSqlParameterSource changeToSqlParameterSource(ChargerStatus item) {
        return new MapSqlParameterSource()
                .addValue("stationId", item.getStationId())
                .addValue("chargerId", item.getChargerId())
                .addValue("latestUpdateTime", item.getLatestUpdateTime())
                .addValue("chargerCondition", item.getChargerCondition().name());
    }
}
