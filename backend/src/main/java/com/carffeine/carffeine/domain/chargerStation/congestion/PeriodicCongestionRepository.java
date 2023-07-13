package com.carffeine.carffeine.domain.chargerStation.congestion;

import org.springframework.data.repository.Repository;

import java.time.DayOfWeek;
import java.util.List;

public interface PeriodicCongestionRepository extends Repository<PeriodicCongestion, String> {
    List<PeriodicCongestion> findAllByDayOfWeekAndStartTime(DayOfWeek dayOfWeek, RequestPeriod startTime);

    PeriodicCongestion save(PeriodicCongestion periodicCongestion);
}
