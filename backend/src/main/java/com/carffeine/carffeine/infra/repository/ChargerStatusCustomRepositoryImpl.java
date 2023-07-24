package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatus;
import com.carffeine.carffeine.service.chargerstation.ChargerStatusCustomRepository;
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
        String sql = "INSERT INTO charger_status (station_id, charger_id, latest_update_time, charger_state) " +
                "VALUES (:stationId, :chargerId, :latestUpdateTime, :chargerState) " +
                "ON DUPLICATE KEY UPDATE latest_update_time = :latestUpdateTime, charger_state = :chargerState";
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
                .addValue("chargerState", item.getChargerState().name());
    }
}
