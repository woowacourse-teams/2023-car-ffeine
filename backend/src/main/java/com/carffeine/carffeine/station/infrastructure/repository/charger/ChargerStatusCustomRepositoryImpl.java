package com.carffeine.carffeine.station.infrastructure.repository.charger;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ChargerStatusCustomRepositoryImpl implements ChargerStatusCustomRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    @Transactional
    public void saveAll(List<ChargerStatus> chargerStatuses) {
        String sql = "INSERT IGNORE INTO charger_status (station_id, charger_id, latest_update_time, charger_condition, created_at, updated_at) " +
                "VALUES (:stationId, :chargerId, :latestUpdateTime, :chargerCondition, :createdAt, :updatedAt) ";
        SqlParameterSource[] sqlParameterSources = getSqlParameterSources(chargerStatuses);
        namedParameterJdbcTemplate.batchUpdate(sql, sqlParameterSources);
    }

    private SqlParameterSource[] getSqlParameterSources(List<ChargerStatus> chargerStatuses) {
        return chargerStatuses.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(SqlParameterSource[]::new);
    }

    @Override
    public void updateAll(List<ChargerStatus> chargerStatuses) {
        String sql = "UPDATE  charger_status SET latest_update_time = :latestUpdateTime, charger_condition = :chargerCondition, updated_at = :updatedAt " +
                "WHERE station_id = :stationId AND charger_id = :chargerId";
        SqlParameterSource[] sqlParameterSources = getSqlParameterSources(chargerStatuses);
        namedParameterJdbcTemplate.batchUpdate(sql, sqlParameterSources);
    }

    private MapSqlParameterSource changeToSqlParameterSource(ChargerStatus status) {
        LocalDateTime now = LocalDateTime.now();
        return new MapSqlParameterSource()
                .addValue("stationId", status.getStationId())
                .addValue("chargerId", status.getChargerId())
                .addValue("latestUpdateTime", status.getLatestUpdateTime())
                .addValue("chargerCondition", status.getChargerCondition().name())
                .addValue("createdAt", now)
                .addValue("updatedAt", now);
    }
}
