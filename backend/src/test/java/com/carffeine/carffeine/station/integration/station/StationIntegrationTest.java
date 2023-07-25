package com.carffeine.carffeine.station.integration.station;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.상태_코드를_검증한다;
import static com.carffeine.carffeine.station.integration.station.StationIntegrationTestFixture.좌표_중심값과_화면_크기;
import static com.carffeine.carffeine.station.integration.station.StationIntegrationTestFixture.좌표로_정보를_조회한다;
import static com.carffeine.carffeine.station.integration.station.StationIntegrationTestFixture.충전소_ID로_상세_정보를_조회한다;
import static com.carffeine.carffeine.station.integration.station.StationIntegrationTestFixture.충전소_간단_정보를_검증한다;
import static com.carffeine.carffeine.station.integration.station.StationIntegrationTestFixture.충전소_상세_정보를_검증한다;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class StationIntegrationTest extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;

    private Station 충전소;

    @BeforeEach
    void setUp() {
        충전소 = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
    }

    @Nested
    class 좌표로_충전소의_간단_정보를_조회할_때 {

        @Test
        void 정상_응답한다() {
            // given
            stationRepository.save(충전소);
            var 요청_좌표 = 좌표_중심값과_화면_크기("37.958844", "128.458844", "1", "1");

            // when
            var 응답 = 좌표로_정보를_조회한다(요청_좌표);

            // then
            충전소_간단_정보를_검증한다(응답, 충전소);
            상태_코드를_검증한다(응답, HttpStatus.OK);
        }
    }

    @Nested
    class 충전소의_상세_정보를_조회할_때 {

        @Test
        void 정상_응답한다() {
            // given
            stationRepository.save(충전소);

            // when
            String 충전소_ID = 충전소.getStationId();
            var 응답 = 충전소_ID로_상세_정보를_조회한다(충전소_ID);

            // then
            충전소_상세_정보를_검증한다(응답, 충전소);
            상태_코드를_검증한다(응답, HttpStatus.OK);
        }

        @Test
        void 충전소가_존재하지_않다면_실패한다() {
            // given
            String 없는_충전소_ID = 충전소.getStationId() + 1;

            // when
            var 응답 = 충전소_ID로_상세_정보를_조회한다(없는_충전소_ID);

            // then
            상태_코드를_검증한다(응답, HttpStatus.NOT_FOUND);
        }
    }
}
