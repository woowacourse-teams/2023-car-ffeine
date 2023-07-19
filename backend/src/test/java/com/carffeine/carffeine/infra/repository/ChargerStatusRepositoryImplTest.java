package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatus;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerStatusRepository;
import com.carffeine.carffeine.service.chargerstation.ChargerStatusCustomRepository;
import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateRequest;
import com.carffeine.carffeine.service.chargerstation.dto.ChargerStateUpdateRequest;
import com.carffeine.carffeine.service.chargerstation.dto.ChargersStateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ChargerStatusRepositoryImplTest {

    private final ChargerStateUpdateRequest request = new ChargerStateUpdateRequest(
            3, new ChargersStateRequest(List.of(new ChargerStateRequest("ME", "13", "45", "2", "updateDate", "lastTsdt", "lastTedt", "nowTsdt"))), 1, "3", 5
    );

    private ChargerStatusCustomRepository chargerStatusCustomRepository;
    private ChargerStatusRepository chargerStatusRepository;

    @Autowired
    void setUp(NamedParameterJdbcTemplate namedParameterJdbcTemplate, ChargerStatusRepository chargerStatusRepository) {
        chargerStatusCustomRepository = new ChargerStatusCustomRepositoryImpl(namedParameterJdbcTemplate);
        this.chargerStatusRepository = chargerStatusRepository;
    }

    @Test
    void 저장() {
        chargerStatusCustomRepository.saveAll(request.items().item());

        List<ChargerStatus> result = chargerStatusRepository.findAll();

        assertThat(result).hasSize(1);
    }
}
