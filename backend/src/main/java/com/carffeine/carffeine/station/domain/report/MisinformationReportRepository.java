package com.carffeine.carffeine.station.domain.report;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MisinformationReportRepository extends Repository<MisinformationReport, Long> {

    MisinformationReport save(MisinformationReport misinformationReport);

    Page<MisinformationReport> findAll(Pageable pageable);

    @Query("select m from MisinformationReport m join fetch m.misinformationDetailReports where m.id = :misinformationId")
    Optional<MisinformationReport> findByIdFetch(@Param("misinformationId") Long misinformationId);

    Optional<MisinformationReport> findById(Long misinformationId);
}
