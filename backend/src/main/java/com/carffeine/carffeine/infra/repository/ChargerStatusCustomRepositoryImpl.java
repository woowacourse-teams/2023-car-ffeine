package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargestation.charger.ChargerState;
import com.carffeine.carffeine.service.chargerstation.ChargerStatusCustomRepository;
import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ChargerStatusCustomRepositoryImpl implements ChargerStatusCustomRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    @Transactional
    public void saveAll(List<ChargerStateRequest> item) {
        String sql = "INSERT INTO charger_status (station_id, charger_id, latest_update_time, charger_state) " +
                "VALUES (:stationId, :chargerId, :latestUpdateTime, :chargerState) " +
                "ON DUPLICATE KEY UPDATE latest_update_time = :latestUpdateTime, charger_state = :chargerState";
        SqlParameterSource[] sqlParameterSources = item.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(SqlParameterSource[]::new);
        namedParameterJdbcTemplate.batchUpdate(sql, sqlParameterSources);
    }

    private MapSqlParameterSource changeToSqlParameterSource(ChargerStateRequest item) {
        return new MapSqlParameterSource()
                .addValue("stationId", item.statId())
                .addValue("chargerId", item.chgerId())
                .addValue("latestUpdateTime", parseDateTimeFromString(item.statUpdDt()))
                .addValue("chargerState", ChargerState.from(item.stat()).name());
    }

    private LocalDateTime parseDateTimeFromString(String input) {
        if (input == null || input.length() != 14) {
            return null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return LocalDateTime.parse(input, formatter);
    }
}
