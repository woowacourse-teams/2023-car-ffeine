package com.carffeine.carffeine.station.integration.congestion;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CongestionIntegrationTest extends CongestionIntegrationTestFixture {

    private static final String 충전소_아이디 = "ME101010";
    private static final int 월요일 = 1;

    @BeforeEach
    void setup() {
        super.충전소_설정();
    }

    @Test
    void 요일에_해당하는_혼잡도를_가져온다() {
        // when
        var 월요일의_충전소_혼잡도 = 월요일의_혼잡도를_가져온다(월요일_충전소의_혼잡도_조회_uri());

        // then
        혼잡도가_성공적으로_조회된다(월요일의_충전소_혼잡도);
        혼잡도의_데이터가_정상적으로_조회된다(월요일의_충전소_혼잡도);
    }

    private String 월요일_충전소의_혼잡도_조회_uri() {
        return "/stations/" + 충전소_아이디 + "/statistics" + "?dayOfWeek=" + 월요일;
    }
}
