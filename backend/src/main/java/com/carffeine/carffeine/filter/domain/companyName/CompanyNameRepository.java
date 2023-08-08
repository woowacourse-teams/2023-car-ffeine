package com.carffeine.carffeine.filter.domain.companyName;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyNameRepository extends JpaRepository<CompanyName, Long> {

    boolean existsByCompanyName(String companyName);
}
