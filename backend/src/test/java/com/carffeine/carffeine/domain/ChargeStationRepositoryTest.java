package com.carffeine.carffeine.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class ChargeStationRepositoryTest {

    @Autowired
    private ChargeStationRepository chargeStationRepository;

    @Test
    void 충전소를_위도_경도로_조회한다() {
        // given
        ChargeStation chargeStation = ChargeStation.builder()
                .stationId("ME101010")
                .companyName("볼튼")
                .contact("02-0202-0202")
                .isPrivate(false)
                .stationName("선릉역 충전소")
                .latitude(BigDecimal.valueOf(38.3994933))
                .longitude(BigDecimal.valueOf(128.4994933))
                .operatingTime("24시간 이용가능")
                .isParkingFree(true)
                .detailLocation("2층")
                .build();
        chargeStationRepository.save(chargeStation);
        BigDecimal minLatitude = BigDecimal.valueOf(38.123444);
        BigDecimal maxLatitude = BigDecimal.valueOf(38.41234532);
        BigDecimal maxLongitude = BigDecimal.valueOf(128.7123332);
        BigDecimal minLongitude = BigDecimal.valueOf(128.38840213);

        //when
        List<ChargeStation> chargeStations = chargeStationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);

        //then
        assertThat(chargeStations).hasSize(1);
    }

    @Test
    void 충전소가_위도_경도_범위에_없는_경우_조회되지_않는다() {
        // given
        ChargeStation chargeStation = ChargeStation.builder()
                .stationId("ME101010")
                .companyName("볼튼")
                .contact("02-0202-0202")
                .isPrivate(false)
                .stationName("선릉역 충전소")
                .latitude(BigDecimal.valueOf(38.3994933))
                .longitude(BigDecimal.valueOf(128.4994933))
                .operatingTime("24시간 이용가능")
                .isParkingFree(true)
                .detailLocation("2층")
                .build();
        chargeStationRepository.save(chargeStation);
        BigDecimal minLatitude = BigDecimal.valueOf(39.123444);
        BigDecimal maxLatitude = BigDecimal.valueOf(39.41234532);
        BigDecimal maxLongitude = BigDecimal.valueOf(128.7123332);
        BigDecimal minLongitude = BigDecimal.valueOf(128.38840213);

        //when
        List<ChargeStation> chargeStations = chargeStationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);

        //then
        assertThat(chargeStations).hasSize(0);
    }
}
