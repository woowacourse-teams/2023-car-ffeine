package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.FaultReportRepository;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReportRepository;
import com.carffeine.carffeine.station.exception.report.ReportException;
import com.carffeine.carffeine.station.exception.report.ReportExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AdminReportService {

    private final MemberRepository memberRepository;
    private final MisinformationReportRepository misinformationReportRepository;
    private final FaultReportRepository faultReportRepository;

    @Transactional(readOnly = true)
    public Page<MisinformationReport> getMisinformationReports(Pageable pageable, Long memberId) {
        validateRole(memberId);
        return misinformationReportRepository.findAll(pageable);
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    @Transactional(readOnly = true)
    public MisinformationReport getMisinformationDetail(Long misinformationId, Long memberId) {
        validateRole(memberId);
        return misinformationReportRepository.findByIdFetch(misinformationId)
                .orElseThrow(() -> new ReportException(ReportExceptionType.NOT_FOUND));
    }

    @Transactional
    public void checkMisinformation(Long misinformationId, Long memberId) {
        validateRole(memberId);
        MisinformationReport misinformationReport = misinformationReportRepository.findById(misinformationId)
                .orElseThrow(() -> new ReportException(ReportExceptionType.NOT_FOUND));
        misinformationReport.check();
    }

    @Transactional(readOnly = true)
    public Page<FaultReport> getFaultReports(Pageable pageable, Long memberId) {
        validateRole(memberId);
        return faultReportRepository.findAll(pageable);
    }
}
