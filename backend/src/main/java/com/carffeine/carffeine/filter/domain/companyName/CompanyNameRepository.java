package com.carffeine.carffeine.filter.domain.companyName;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface CompanyNameRepository extends Repository<CompanyName, Long> {

    boolean existsByCompanyKey(String companyKey);

    List<CompanyName> findAll();

    <S extends CompanyName> List<S> saveAll(Iterable<S> entities);

    Optional<CompanyName> findByCompanyKey(String companyKey);
}
