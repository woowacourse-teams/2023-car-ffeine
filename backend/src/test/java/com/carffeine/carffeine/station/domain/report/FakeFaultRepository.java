package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.station.Station;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeFaultRepository implements FaultReportRepository {

    private final Map<Long, FaultReport> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public FaultReport save(FaultReport faultReport) {
        id++;
        FaultReport savedFaultReport = FaultReport.builder()
                .id(id)
                .memberId(faultReport.getMemberId())
                .station(faultReport.getStation())
                .build();
        map.put(id, savedFaultReport);
        return savedFaultReport;
    }

    @Override
    public List<FaultReport> findByStation(Station station) {
        return map.values().stream()
                .filter(it -> it.getStation().equals(station))
                .toList();
    }
}
