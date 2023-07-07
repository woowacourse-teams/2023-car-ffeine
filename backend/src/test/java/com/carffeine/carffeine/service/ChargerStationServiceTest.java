package com.carffeine.carffeine.service;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.ChargeStationRepository;
import com.carffeine.carffeine.dto.CoordinateRequest;
import com.carffeine.carffeine.fake.FakeChargeStationRepository;
import com.carffeine.carffeine.fixture.ChargeStationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ChargerStationServiceTest {

    private ChargeStationRepository chargeStationRepository;
    private ChargerStationService chargerStationService;

    @BeforeEach
    void before() {
        chargeStationRepository = new FakeChargeStationRepository();
        chargerStationService = new ChargerStationService(chargeStationRepository);
    }

    @Test
    void 위도_경도로_충전소를_조회한다() {
        // given
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        chargeStationRepository.save(chargeStation);
        BigDecimal centerX = BigDecimal.valueOf(38.3994933);
        BigDecimal centerY = BigDecimal.valueOf(128.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<ChargeStation> chargeStations = chargerStationService.findByCoordinate(coordinateRequest);

        // then
        assertThat(chargeStations).hasSize(1);
    }

    @Test
    void 위도_경도_범위에_없는_충전소를_조회하면_조회되지_않는다() {
        // given
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        chargeStationRepository.save(chargeStation);
        BigDecimal centerX = BigDecimal.valueOf(40.3994933);
        BigDecimal centerY = BigDecimal.valueOf(129.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<ChargeStation> chargeStations = chargerStationService.findByCoordinate(coordinateRequest);

        // then
        assertThat(chargeStations).isEmpty();
    }
}
