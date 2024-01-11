package com.carffeine.carffeine.station.infrastructure;

import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class PeriodicCongestionCustomRepositoryImpl implements PeriodicCongestionCustomRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void updateNotUsingCountByIds(List<String> ids) {
        if (ids.isEmpty()) {
            return;
        }

        String sql = "UPDATE periodic_congestion " +
                "SET total_count = total_count + 1, " +
                "congestion = CASE WHEN total_count = 0 THEN 0 ELSE use_count / total_count END, " +
                "updated_at = :updatedAt " +
                "WHERE id = :id";

        namedParameterJdbcTemplate.batchUpdate(sql, changeToParameters(ids));
    }

    @Override
    public void updateUsingCountByIds(List<String> ids) {
        if (ids.isEmpty()) {
            return;
        }

        String sql = "UPDATE periodic_congestion " +
                "SET use_count = use_count + 1, " +
                "total_count = total_count + 1, " +
                "congestion = CASE WHEN total_count = 0 THEN 0 ELSE use_count / total_count END, " +
                "updated_at = :updatedAt " +
                "WHERE id = :id";

        namedParameterJdbcTemplate.batchUpdate(sql, changeToParameters(ids));
    }

    private SqlParameterSource[] changeToParameters(List<String> ids) {
        LocalDateTime now = LocalDateTime.now();
        return ids.stream()
                .map(id -> new MapSqlParameterSource()
                        .addValue("id", id)
                        .addValue("updatedAt", now))
                .toArray(MapSqlParameterSource[]::new);
    }

    @Override
    public void saveAllIfNotExist(List<PeriodicCongestion> congestions) {
        if (congestions.isEmpty()) {
            return;
        }

        String sql = "INSERT IGNORE INTO periodic_congestion (id, charger_id, day_of_week, start_time, station_id, total_count, use_count, congestion, created_at, updated_at) " +
                "VALUES (:id, :chargerId, :dayOfWeek, :startTime, :stationId, :totalCount, :useCount, :congestion, :createdAt, :updatedAt) ";
        namedParameterJdbcTemplate.batchUpdate(sql, chargerSqlParameterSource(congestions));
    }

    private MapSqlParameterSource[] chargerSqlParameterSource(List<PeriodicCongestion> congestions) {
        return congestions.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToSqlParameterSource(PeriodicCongestion periodicCongestion) {
        LocalDateTime now = LocalDateTime.now();
        return new MapSqlParameterSource()
                .addValue("id", periodicCongestion.getId())
                .addValue("stationId", periodicCongestion.getStationId())
                .addValue("chargerId", periodicCongestion.getChargerId())
                .addValue("congestion", 0)
                .addValue("dayOfWeek", periodicCongestion.getDayOfWeek().name())
                .addValue("startTime", periodicCongestion.getStartTime().getSection())
                .addValue("totalCount", 0)
                .addValue("useCount", 0)
                .addValue("createdAt", now)
                .addValue("updatedAt", now);
    }
}
