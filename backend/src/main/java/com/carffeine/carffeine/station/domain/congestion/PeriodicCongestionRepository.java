package com.carffeine.carffeine.station.domain.congestion;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface PeriodicCongestionRepository extends Repository<PeriodicCongestion, String> {

    List<PeriodicCongestion> findAllByStationId(String stationId);
}
