package com.carffeine.carffeine.station.domain.report;

import java.util.HashMap;
import java.util.Map;

public class FakeMisinformationRepository implements MisinformationReportRepository {

    private final Map<Long, MisinformationReport> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public MisinformationReport save(MisinformationReport misinformationReport) {
        id++;
        MisinformationReport savedmisinformationReport = MisinformationReport.builder()
                .id(id)
                .memberId(misinformationReport.getMemberId())
                .isChecked(false)
                .station(misinformationReport.getStation())
                .misinformationDetailReports(misinformationReport.getMisinformationDetailReports())
                .build();
        map.put(id, savedmisinformationReport);
        return savedmisinformationReport;
    }
}
