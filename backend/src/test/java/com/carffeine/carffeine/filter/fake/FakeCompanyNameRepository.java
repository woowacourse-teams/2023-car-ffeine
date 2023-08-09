package com.carffeine.carffeine.filter.fake;

import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.companyName.CompanyNameRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeCompanyNameRepository implements CompanyNameRepository {

    private final Map<Long, CompanyName> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public boolean existsByCompanyKey(String key) {
        return map.values()
                .stream()
                .anyMatch(it -> it.getCompanyKey().equals(key));
    }

    @Override
    public List<CompanyName> findAll() {
        return new ArrayList<>(map.values());
    }

    @Override
    public <S extends CompanyName> List<S> saveAll(Iterable<S> companyNames) {
        List<S> savedCompanies = new ArrayList<>();

        for (S companyName : companyNames) {
            id++;
            map.put(id, companyName);
            savedCompanies.add(companyName);
        }

        return savedCompanies;
    }
}
