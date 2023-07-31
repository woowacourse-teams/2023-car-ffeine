package com.carffeine.carffeine.station.service.report;

import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.FaultReportRepository;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReportRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.exception.report.ReportException;
import com.carffeine.carffeine.station.exception.report.ReportExceptionType;
import com.carffeine.carffeine.station.service.report.dto.MisinformationReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReportService {

    private final FaultReportRepository faultReportRepository;
    private final StationRepository stationRepository;
    private final MisinformationReportRepository misinformationReportRepository;

    public FaultReport saveFaultReport(String stationId, Long memberId) {
        Station station = findStationById(stationId);
        validateDuplicateReport(memberId, station);
        FaultReport faultReport = FaultReport.builder()
                .memberId(memberId)
                .station(station)
                .build();
        return faultReportRepository.save(faultReport);
    }

    public boolean isDuplicateReportStation(Long memberId, String stationId) {
        Station station = findStationById(stationId);
        return faultReportRepository.existsByStationAndMemberId(station, memberId);
    }

    private void validateDuplicateReport(Long memberId, Station station) {
        if (isDuplicateReportStation(memberId, station.getStationId())) {
            throw new ReportException(ReportExceptionType.DUPLICATE_REPORT);
        }
    }

    private Station findStationById(String stationId) {
        return stationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

    public MisinformationReport saveMisinformationReport(
            String stationId,
            Long memberId,
            MisinformationReportRequest request
    ) {
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .memberId(memberId)
                .station(findStationById(stationId))
                .misinformationDetailReports(request.toDetailReports())
                .build();
        return misinformationReportRepository.save(misinformationReport);
    }
}
