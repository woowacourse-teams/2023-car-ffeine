package com.carffeine.carffeine.filter.controller.domain.companyName;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
class CompanyNameRepositoryTest {

    @Autowired
    private CompanyNameRepository companyNameRepository;

    @Test
    void te() {
        CompanyName companyName = CompanyName.from("테스트");
        CompanyName companyName2 = CompanyName.from("테스트2");
        companyNameRepository.saveAll(List.of(companyName, companyName2));
    }
}
