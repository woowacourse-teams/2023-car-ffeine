package com.carffeine.support.fake.report;

import com.carffeine.carffeine.report.domain.FaultReport;
import com.carffeine.carffeine.report.domain.FaultReportRepository;
import com.carffeine.carffeine.station.domain.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeFaultReportRepository implements FaultReportRepository {

    private final Map<Long, FaultReport> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public FaultReport save(FaultReport faultReport) {
        id++;
        FaultReport savedFaultReport = FaultReport.builder()
                .id(id)
                .member(faultReport.getMember())
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

    @Override
    public boolean existsByStationAndMemberId(Station station, Long memberId) {
        return map.values().stream()
                .anyMatch(it -> it.getStation().equals(station) && it.getMember().getId().equals(memberId));
    }

    @Override
    public Page<FaultReport> findAll(Pageable pageable) {
        List<FaultReport> faultReports = map.values().stream()
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), faultReports.size());
        List<FaultReport> pagedStations = faultReports.subList(start, end);
        return new PageImpl<>(pagedStations, pageable, faultReports.size());
    }
}
