package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationException;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationExceptionType;
import com.carffeine.carffeine.fake.chargerstation.FakeChargeStationRepository;
import com.carffeine.carffeine.fixture.chargerstation.ChargeStationFixture;
import com.carffeine.carffeine.service.chargerstation.dto.CoordinateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ChargerStationServiceTest {

    private ChargeStationRepository chargeStationRepository;
    private ChargerStationService chargerStationService;

    @BeforeEach
    void before() {
        chargeStationRepository = new FakeChargeStationRepository();
        chargerStationService = new ChargerStationService(chargeStationRepository, null, null);
    }

    @Test
    void 위도_경도로_충전소를_조회한다() {
        // given
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        chargeStationRepository.save(chargeStation);
        BigDecimal centerX = BigDecimal.valueOf(37.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
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
        BigDecimal centerX = BigDecimal.valueOf(36.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<ChargeStation> chargeStations = chargerStationService.findByCoordinate(coordinateRequest);

        // then
        assertThat(chargeStations).isEmpty();
    }

    @Test
    void 충전소_id_값으로_충전소를_조회한다() {
        // given
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        chargeStationRepository.save(chargeStation);

        // when
        ChargeStation chargeStationById = chargerStationService.findStationById(chargeStation.getStationId());

        // then
        assertThat(chargeStationById).usingRecursiveComparison()
                .isEqualTo(chargeStation);
    }

    @Test
    void 충전소_id가_존재하지_않다면_조회되지_않는다() {
        // given
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        String invalidChargeStationId = "INVALID_ID_001";
        chargeStationRepository.save(chargeStation);

        // when & then
        assertThatThrownBy(() -> chargerStationService.findStationById(invalidChargeStationId))
                .isInstanceOf(ChargeStationException.class)
                .hasMessage(ChargeStationExceptionType.NOT_FOUND_ID.message());
    }
}
