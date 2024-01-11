package com.carffeine.carffeine.report.service;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import com.carffeine.carffeine.report.domain.FaultReport;
import com.carffeine.carffeine.report.domain.FaultReportRepository;
import com.carffeine.carffeine.report.domain.MisinformationReport;
import com.carffeine.carffeine.report.domain.MisinformationReportRepository;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.domain.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.report.exception.ReportException;
import com.carffeine.carffeine.report.exception.ReportExceptionType;
import com.carffeine.carffeine.report.service.dto.MisinformationReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReportService {

    private final FaultReportRepository faultReportRepository;
    private final StationRepository stationRepository;
    private final MemberRepository memberRepository;
    private final MisinformationReportRepository misinformationReportRepository;

    public FaultReport saveFaultReport(String stationId, Long memberId) {
        Station station = findStationById(stationId);
        validateDuplicateReport(memberId, station);
        Member member = findMemberById(memberId);
        FaultReport faultReport = FaultReport.builder()
                .member(member)
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
        Member member = findMemberById(memberId);
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .member(member)
                .station(findStationById(stationId))
                .misinformationDetailReports(request.toDetailReports())
                .build();
        return misinformationReportRepository.save(misinformationReport);
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND));
    }
}
