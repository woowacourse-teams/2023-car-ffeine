package com.carffeine.carffeine.report.domain;

import com.carffeine.carffeine.station.domain.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface FaultReportRepository extends Repository<FaultReport, Long> {

    FaultReport save(FaultReport faultReport);

    List<FaultReport> findByStation(Station station);

    boolean existsByStationAndMemberId(Station station, Long memberId);

    Page<FaultReport> findAll(Pageable pageable);
}
