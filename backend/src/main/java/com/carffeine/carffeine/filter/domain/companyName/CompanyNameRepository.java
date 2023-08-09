package com.carffeine.carffeine.filter.domain.companyName;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface CompanyNameRepository extends Repository<CompanyName, Long> {

    boolean existsByCompanyKey(String companyKey);

    List<CompanyName> findAll();

    <S extends CompanyName> List<S> saveAll(Iterable<S> entities);
}
