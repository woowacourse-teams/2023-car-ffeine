package com.carffeine.carffeine.station.domain.report;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface MisinformationReportRepository extends Repository<MisinformationReport, Long> {

    MisinformationReport save(MisinformationReport misinformationReport);

    @Query(value = "select m from MisinformationReport m left join m.misinformationDetailReports", countQuery = "select count(m) from MisinformationReport m")
    Page<MisinformationReport> findAll(Pageable pageable);
}
