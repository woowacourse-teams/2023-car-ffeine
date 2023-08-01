package com.carffeine.carffeine.station.domain.congestion;

import com.carffeine.carffeine.station.domain.charger.ChargerStatus;

import java.time.DayOfWeek;
import java.util.List;

public interface PeriodicCongestionCustomRepository {

    void updateTotalCountByPeriod(DayOfWeek dayOfWeek, RequestPeriod requestPeriod);

    void updateUsingCount(DayOfWeek dayOfWeek, RequestPeriod period, List<ChargerStatus> usingChargers);

    void saveAll(List<PeriodicCongestion> periodicCongestions);
}
