package com.carffeine.carffeine.filter.domain.companyName;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface CompanyNameRepository extends Repository<CompanyName, Long> {

    boolean existsByCompanyName(String companyName);

    List<CompanyName> findAll();

    <S extends CompanyName> List<S> saveAll(Iterable<S> entities);
}
