package com.carffeine.carffeine.station.domain.report;

import org.springframework.data.repository.Repository;

public interface MisinformationReportRepository extends Repository<MisinformationReport, Long> {

    MisinformationReport save(MisinformationReport misinformationReport);
}
