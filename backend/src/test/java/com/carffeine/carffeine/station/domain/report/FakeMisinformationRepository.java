package com.carffeine.carffeine.station.domain.report;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakeMisinformationRepository implements MisinformationReportRepository {

    private final Map<Long, MisinformationReport> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public MisinformationReport save(MisinformationReport misinformationReport) {
        id++;
        MisinformationReport savedmisinformationReport = MisinformationReport.builder()
                .id(id)
                .member(misinformationReport.getMember())
                .isChecked(false)
                .station(misinformationReport.getStation())
                .misinformationDetailReports(misinformationReport.getMisinformationDetailReports())
                .build();
        map.put(id, savedmisinformationReport);
        return savedmisinformationReport;
    }

    @Override
    public Page<MisinformationReport> findAll(Pageable pageable) {
        List<MisinformationReport> misinformationReports = map.values().stream()
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), misinformationReports.size());
        List<MisinformationReport> pagedStations = misinformationReports.subList(start, end);
        return new PageImpl<>(pagedStations, pageable, misinformationReports.size());
    }

    @Override
    public Optional<MisinformationReport> findFetchById(Long misinformationId) {
        return Optional.of(map.get(misinformationId));
    }
}
