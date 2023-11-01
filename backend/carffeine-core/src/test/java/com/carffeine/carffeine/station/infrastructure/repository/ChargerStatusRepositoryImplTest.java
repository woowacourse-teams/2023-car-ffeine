package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusCustomRepository;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.infrastructure.repository.charger.ChargerStatusCustomRepositoryImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ChargerStatusRepositoryImplTest {

    private static final List<ChargerStatus> chargerStatuses = List.of(
            new ChargerStatus(
                    "stationId",
                    "chargerId",
                    LocalDateTime.of(2021, 1, 1, 0, 0, 0),
                    ChargerCondition.CHARGING_IN_PROGRESS
            )
    );

    private ChargerStatusCustomRepository chargerStatusCustomRepository;
    private ChargerStatusRepository chargerStatusRepository;

    @Autowired
    void setUp(NamedParameterJdbcTemplate namedParameterJdbcTemplate, ChargerStatusRepository chargerStatusRepository) {
        chargerStatusCustomRepository = new ChargerStatusCustomRepositoryImpl(namedParameterJdbcTemplate);
        this.chargerStatusRepository = chargerStatusRepository;
    }

    @Test
    void 상태를_저장한다() {
        chargerStatusCustomRepository.saveAll(chargerStatuses);

        List<ChargerStatus> result = chargerStatusRepository.findAll();

        assertThat(result).hasSize(1);
    }
}
