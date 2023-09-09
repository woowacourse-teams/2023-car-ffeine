package com.carffeine.carffeine.station.domain.congestion;

import org.springframework.data.repository.Repository;

import java.time.DayOfWeek;
import java.util.List;

public interface PeriodicCongestionRepository extends Repository<PeriodicCongestion, String> {

    List<PeriodicCongestion> findAllByStationId(String stationId);

    List<PeriodicCongestion> findAllByStationIdAndDayOfWeek(String stationId, DayOfWeek dayOfWeek);
}
