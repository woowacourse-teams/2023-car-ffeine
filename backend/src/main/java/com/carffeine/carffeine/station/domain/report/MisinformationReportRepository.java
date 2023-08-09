package com.carffeine.carffeine.station.domain.report;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MisinformationReportRepository extends Repository<MisinformationReport, Long> {

    MisinformationReport save(MisinformationReport misinformationReport);

    @Query(value = "select m from MisinformationReport m left join m.misinformationDetailReports", countQuery = "select count(m) from MisinformationReport m")
    Page<MisinformationReport> findAll(Pageable pageable);

    @Query("select m from MisinformationReport m join fetch m.misinformationDetailReports where m.id = :misinformationId")
    Optional<MisinformationReport> findFetchById(@Param("misinformationId") Long misinformationId);
}
