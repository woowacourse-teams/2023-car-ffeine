package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

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
        assertThat(stationById).usingRecursiveComparison().isEqualTo(station);
    }
}
