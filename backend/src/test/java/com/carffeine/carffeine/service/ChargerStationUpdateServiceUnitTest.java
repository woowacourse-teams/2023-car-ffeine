package com.carffeine.carffeine.service;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRepository;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeUpdateJdbc;
import com.carffeine.carffeine.fixture.chargerStation.ChargeStationFixture;
import com.carffeine.carffeine.service.chargerStation.UpdateScrapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@ExtendWith(MockitoExtension.class)
class ChargerStationUpdateServiceUnitTest {

    @InjectMocks
    private ChargerStationUpdateService chargerStationUpdateService;

    @Mock
    private UpdateScrapper updateScrapper;

    @Mock
    private ChargeStationRepository chargeStationRepository;

    @Mock
    private ChargeUpdateJdbc chargeUpdateJdbc;

    /**
     * 1. 충전소가 없으면 저장
     * 2. 충전소가 변경되면 업데이트
     * 3. 충전기가 없으면 저장
     * 4. 충전기가 변경되면 업데이트
     */


    @Test
    void 기존에_없던_충전소가_생기면_저장한다() {
        // given
        given(chargeStationRepository.findAll()).willReturn(new ArrayList<ChargeStation>());
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개);

        // when
        when(updateScrapper.updateData()).thenReturn(updateStations);
        chargerStationUpdateService.updateStations();

        // then
        assertAll(
                () -> verify(chargeUpdateJdbc, times(1)).saveAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).updateAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).saveAllChargersBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).updateAllChargersBatch(any())
        );
    }

    @Test
    void 기존에_있던_충전소의_데이터가_변경되면_수정한다() {
        // given
        given(chargeStationRepository.findAll()).willReturn(new ArrayList<ChargeStation>(List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개)));
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨);

        // when
        when(updateScrapper.updateData()).thenReturn(updateStations);
        chargerStationUpdateService.updateStations();

        // then
        assertAll(
                () -> verify(chargeUpdateJdbc, times(0)).saveAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(1)).updateAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).saveAllChargersBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).updateAllChargersBatch(any())
        );
    }

    @Test
    void 기존에_없던_충전기가_생기면_저장한다() {
        // given
        given(chargeStationRepository.findAll()).willReturn(new ArrayList<ChargeStation>(List.of(ChargeStationFixture.선릉역_충전소_충전기_0개_사용가능_0개)));
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개);

        // when
        when(updateScrapper.updateData()).thenReturn(updateStations);
        chargerStationUpdateService.updateStations();

        // then
        assertAll(
                () -> verify(chargeUpdateJdbc, times(0)).saveAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).updateAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(1)).saveAllChargersBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).updateAllChargersBatch(any())
        );
    }

    @Test
    void 기존에_있던_충전기의_데이터가_변경되면_수정한다() {
        // given
        given(chargeStationRepository.findAll()).willReturn(new ArrayList<ChargeStation>(List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개)));
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속);

        // when
        when(updateScrapper.updateData()).thenReturn(updateStations);
        chargerStationUpdateService.updateStations();

        // then
        assertAll(
                () -> verify(chargeUpdateJdbc, times(0)).saveAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).updateAllStationsBatch(any()),
                () -> verify(chargeUpdateJdbc, times(0)).saveAllChargersBatch(any()),
                () -> verify(chargeUpdateJdbc, times(1)).updateAllChargersBatch(any())
        );
    }
}
