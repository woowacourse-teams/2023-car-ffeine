package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.congestion.IdGenerator;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class PeriodicCongestionCustomRepositoryImpl implements PeriodicCongestionCustomRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void updateTotalCountByPeriod(DayOfWeek dayOfWeek, RequestPeriod requestPeriod) {
        String sql = "UPDATE periodic_congestion " +
                "SET total_count = total_count + 1, " +
                "congestion = use_count / total_count, " +
                "updated_at = :updatedAt " +
                "WHERE day_of_week = :dayOfWeek AND start_time = :startTime ";
        namedParameterJdbcTemplate.update(sql, changeToSqlParameterSource(dayOfWeek, requestPeriod));
    }

    @Override
    public void updateUsingCount(DayOfWeek dayOfWeek, RequestPeriod period, List<ChargerStatus> usingChargers) {
        String sql = "UPDATE periodic_congestion " +
                "SET use_count = use_count + 1, " +
                "updated_at = :updatedAt " +
                "WHERE day_of_week = :dayOfWeek AND start_time = :startTime AND id = :id;";
        SqlParameterSource[] sqlParameterSources = usingChargers.stream()
                .map(it -> changeToSqlParameterSource(dayOfWeek, period, it))
                .toArray(SqlParameterSource[]::new);
        namedParameterJdbcTemplate.batchUpdate(sql, sqlParameterSources);
    }

    private Object changeToSqlParameterSource(DayOfWeek dayOfWeek, RequestPeriod period, ChargerStatus it) {

        String id = IdGenerator.generateId(dayOfWeek, period, it.getStationId(), it.getChargerId());
        return new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("dayOfWeek", dayOfWeek.name())
                .addValue("startTime", period.getSection())
                .addValue("updatedAt", it.getUpdatedAt());
    }

    @Override
    public void saveAll(List<PeriodicCongestion> congestions) {
        String sql = "INSERT IGNORE INTO periodic_congestion (id, charger_id, day_of_week, start_time, station_id, total_count, use_count, congestion, created_at, updated_at) " +
                "VALUES (:id, :chargerId, :dayOfWeek, :startTime, :stationId, :totalCount, :useCount, :congestion, :createdAt, :updatedAt) ";
        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(congestions));
    }

    private MapSqlParameterSource[] chargerSqlParameterSource(List<PeriodicCongestion> congestions) {
        return congestions.stream()
                .map(it -> changeToSqlParameterSource(it))
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToSqlParameterSource(PeriodicCongestion periodicCongestion) {
        return new MapSqlParameterSource()
                .addValue("id", periodicCongestion.getId())
                .addValue("stationId", periodicCongestion.getStationId())
                .addValue("chargerId", periodicCongestion.getChargerId())
                .addValue("congestion", 0)
                .addValue("dayOfWeek", periodicCongestion.getDayOfWeek().name())
                .addValue("startTime", periodicCongestion.getStartTime().getSection())
                .addValue("totalCount", 0)
                .addValue("useCount", 0)
                .addValue("createdAt", periodicCongestion.getCreatedAt())
                .addValue("updatedAt", periodicCongestion.getUpdatedAt());
    }

    private MapSqlParameterSource changeToSqlParameterSource(DayOfWeek dayOfWeek, RequestPeriod requestPeriod) {
        return new MapSqlParameterSource()
                .addValue("dayOfWeek", dayOfWeek.name())
                .addValue("startTime", requestPeriod.getSection())
                .addValue("updatedAt", LocalDateTime.now());
    }
}
