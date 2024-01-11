package com.carffeine.carffeine.city.infrastructure.repository;

import com.carffeine.carffeine.city.domain.City;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class CityCustomRepositoryImpl implements CityCustomRepository {

    private static final int EXIST_CITY = 1;

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public void saveAll(Collection<City> cities) {
        String sql = "INSERT IGNORE INTO city (name, latitude, longitude)" +
                " VALUES (:name, :latitude, :longitude)";

        namedParameterJdbcTemplate.batchUpdate(sql, getCitySqlParameterSource(cities));
    }

    private MapSqlParameterSource[] getCitySqlParameterSource(Collection<City> cities) {
        return cities.stream()
                .map(this::changeToSqlParameterSource)
                .toArray(MapSqlParameterSource[]::new);
    }

    private MapSqlParameterSource changeToSqlParameterSource(City city) {
        return new MapSqlParameterSource()
                .addValue("name", city.getName())
                .addValue("latitude", city.getLatitude().getValue())
                .addValue("longitude", city.getLongitude().getValue());
    }

    @Override
    public boolean isExist() {
        String sql = "SELECT EXISTS (SELECT 1 FROM city)";
        Integer result = namedParameterJdbcTemplate.queryForObject(sql, Map.of(), Integer.class);
        return result == EXIST_CITY;
    }
}
