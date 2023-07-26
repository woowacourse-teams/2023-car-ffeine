package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.station.Station;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface FaultReportRepository extends Repository<FaultReport, Long> {

    FaultReport save(FaultReport faultReport);

    List<FaultReport> findByStation(Station station);

    boolean existsByStationAndMemberId(Station station, Long memberId);
}
