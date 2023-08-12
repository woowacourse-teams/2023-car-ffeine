package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class StationRepositoryTest {

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 충전소를_위도_경도로_조회한다() {
        // given
        Station station = Station.builder()
                .stationId("ME101010")
                .companyName("볼튼")
                .contact("02-0202-0202")
                .isPrivate(false)
                .stationName("선릉역 충전소")
                .latitude(Latitude.from("38.3994933"))
                .longitude(Longitude.from("128.4994933"))
                .operatingTime("24시간 이용가능")
                .isParkingFree(true)
                .detailLocation("2층")
                .build();
        stationRepository.save(station);
        Latitude minLatitude = Latitude.from("38.123444");
        Latitude maxLatitude = Latitude.from("38.41234532");
        Longitude maxLongitude = Longitude.from("128.7123332");
        Longitude minLongitude = Longitude.from("128.38840213");

        //when
        List<Station> stations = stationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);

        //then
        assertThat(stations).hasSize(1);
    }

    @Test
    void 충전소가_위도_경도_범위에_없는_경우_조회되지_않는다() {
        // given
        Station station = Station.builder()
                .stationId("ME101010")
                .companyName("볼튼")
                .contact("02-0202-0202")
                .isPrivate(false)
                .stationName("선릉역 충전소")
                .latitude(Latitude.from("38.3994933"))
                .longitude(Longitude.from("128.4994933"))
                .operatingTime("24시간 이용가능")
                .isParkingFree(true)
                .detailLocation("2층")
                .build();
        stationRepository.save(station);
        Latitude minLatitude = Latitude.from("36.123444");
        Latitude maxLatitude = Latitude.from("37.41234532");
        Longitude minLongitude = Longitude.from("128.38840213");
        Longitude maxLongitude = Longitude.from("128.7123332");

        //when
        List<Station> stations = stationRepository.findAllByLatitudeBetweenAndLongitudeBetween(minLatitude, maxLatitude, minLongitude, maxLongitude);

        //then
        assertThat(stations).hasSize(0);
    }

    @Test
    void 충전소_id_값으로_충전소를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        //when
        Station stationById = stationRepository.findChargeStationByStationId(station.getStationId()).get();

        //then
        assertThat(stationById).usingRecursiveComparison()
                .ignoringFieldsOfTypes(LocalDateTime.class)
                .isEqualTo(station);
    }

    @Test
    void 충전소를_이름으로_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        //when
        List<Station> stations = stationRepository.findAllByStationNameContainingOrAddressContainingOrderByStationId("선릉역", "asdf");

        //then
        assertThat(stations).hasSize(1);
    }

    @Test
    void 충전소를_주소로_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        //when
        List<Station> stations = stationRepository.findAllByStationNameContainingOrAddressContainingOrderByStationId("asdf", "123");

        //then
        assertThat(stations).hasSize(1);
    }

    @Test
    void page의_갯수만큼_조회한다() {
        // given
        stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        stationRepository.save(StationFixture.잠실역_충전소_충전기_2개_사용가능_1개);
        stationRepository.save(StationFixture.천호역_충전소_충전기_2개_사용가능_1개);
        Pageable pageable = Pageable.ofSize(1);

        // when
        Page<Station> stations = stationRepository.findAll(pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(stations.getSize()).isEqualTo(1);
            softly.assertThat(stations.getTotalPages()).isEqualTo(3);
        });
    }

    @CsvSource(value = {"잠실:1", "충전:3"}, delimiter = ':')
    @ParameterizedTest
    void 충전소_이름이_포함되는_충전소를_page의_갯수만큼_조회한다(String query, int size) {
        // given
        stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        stationRepository.save(StationFixture.잠실역_충전소_충전기_2개_사용가능_1개);
        stationRepository.save(StationFixture.천호역_충전소_충전기_2개_사용가능_1개);

        // when
        Page<Station> stations = stationRepository.findAllByStationNameContains(PageRequest.of(0, 1), query);

        // then
        assertSoftly(softly -> {
            softly.assertThat(stations.getSize()).isEqualTo(1);
            softly.assertThat(stations.getTotalPages()).isEqualTo(size);
        });
    }

    @Test
    void 충전소와_충전기를_한꺼번에_조회한다() {
        // given
        Station saved = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);

        // when
        Optional<Station> findStation = stationRepository.findFetchByStationId(saved.getStationId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(findStation.isPresent()).isTrue();
            softly.assertThat(findStation.get().getChargers()).hasSize(2);
        });
    }
}
