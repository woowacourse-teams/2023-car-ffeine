package com.carffeine.carffeine.station.service.report;

import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.FaultReportRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReportService {

    private final FaultReportRepository faultReportRepository;
    private final StationRepository stationRepository;

    public FaultReport saveFaultReport(String stationId, Long memberId) {
        Station station = findStationById(stationId);
        FaultReport faultReport = FaultReport.builder()
                .memberId(memberId)
                .station(station)
                .build();
        return faultReportRepository.save(faultReport);
    }

    private Station findStationById(String stationId) {
        return stationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }
}
