package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.fixture.chargerstation.ChargeStationFixture;
import com.carffeine.carffeine.infra.repository.ChargeStationRepositoryImpl;
import com.carffeine.carffeine.infra.repository.ChargerRepositoryImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class ChargerStationUpdateServiceTest {

    private ChargerStationUpdateService chargerStationUpdateService;

    private ChargeStationRepository chargeStationRepository;

    @BeforeEach
    void setChargerStationUpdateService(NamedParameterJdbcTemplate namedParameterJdbcTemplate, ChargeStationRepository chargeStationRepository) {

        chargerStationUpdateService = new ChargerStationUpdateService(chargeStationRepository, new ChargeStationRepositoryImpl(namedParameterJdbcTemplate), new ChargerRepositoryImpl(namedParameterJdbcTemplate));
    }

    @Test
    void 기존에_없던_충전소가_생기면_저장한다() {
        // given
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개);

        // when
        chargerStationUpdateService.updateStations(updateStations);
        // then
        List<ChargeStation> result = chargeStationRepository.findAllFetch();
        System.out.println(result);
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(updateStations);
    }

//    @Test
//    void 기존에_있던_충전소의_데이터가_변경되면_수정한다() {
//        // given
//        given(chargeStationRepository.findAllFetch()).willReturn(new ArrayList<>(List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개)));
//        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨);
//
//        // when
//        when(updateScrapper.updateData()).thenReturn(updateStations);
//        chargerStationUpdateService.updateStations();
//
//        // then
//        assertAll(
//                () -> verify(chargeUpdateJdbc, times(0)).saveAllStationsBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(1)).updateAllStationsBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(0)).saveAllChargersBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(0)).updateAllChargersBatch(any())
//        );
//    }
//
//    @Test
//    void 기존에_없던_충전기가_생기면_저장한다() {
//        // given
//        given(chargeStationRepository.findAllFetch()).willReturn(new ArrayList<>(List.of(ChargeStationFixture.선릉역_충전소_충전기_0개_사용가능_0개)));
//        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
//
//        // when
//        when(updateScrapper.updateData()).thenReturn(updateStations);
//        chargerStationUpdateService.updateStations();
//
//        // then
//        assertAll(
//                () -> verify(chargeUpdateJdbc, times(0)).saveAllStationsBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(0)).updateAllStationsBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(1)).saveAllChargersBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(0)).updateAllChargersBatch(any())
//        );
//    }
//
//    @Test
//    void 기존에_있던_충전기의_데이터가_변경되면_수정한다() {
//        // given
//        given(chargeStationRepository.findAllFetch()).willReturn(new ArrayList<>(List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개)));
//        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속);
//
//        // when
//        when(updateScrapper.updateData()).thenReturn(updateStations);
//        chargerStationUpdateService.updateStations();
//
//        // then
//        assertAll(
//                () -> verify(chargeUpdateJdbc, times(0)).saveAllStationsBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(0)).updateAllStationsBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(0)).saveAllChargersBatch(any()),
//                () -> verify(chargeUpdateJdbc, times(1)).updateAllChargersBatch(any())
//        );
//    }

}
