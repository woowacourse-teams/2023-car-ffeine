package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.admin.service.dto.CityUpdateRequest;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.city.City;
import com.carffeine.carffeine.station.domain.city.CityFakeRepository;
import com.carffeine.carffeine.station.domain.city.CityRepository;
import com.carffeine.carffeine.station.exception.city.CityException;
import com.carffeine.carffeine.station.exception.city.CityExceptionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_잠실동_정보;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.data.domain.PageRequest.of;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class AdminCityServiceTest {

    private AdminCityService adminCityService;
    private MemberRepository memberRepository;
    private CityRepository cityRepository;

    private Member admin;
    private Member user;

    @BeforeEach
    void setup() {
        cityRepository = new CityFakeRepository();
        memberRepository = new FakeMemberRepository();
        adminCityService = new AdminCityService(memberRepository, cityRepository);

        admin = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
        user = memberRepository.save(Member.builder()
                .memberRole(MemberRole.USER)
                .build());
    }

    @Test
    void 모든_도시를_조회한다() {
        // given
        City city = cityRepository.save(서울특별시_송파구_잠실동_정보);

        City expect = City.builder()
                .id(city.getId())
                .name(city.getName())
                .latitude(city.getLatitude())
                .longitude(city.getLongitude())
                .build();

        // when
        List<City> cities = adminCityService.findAll(of(0, 10), admin.getId())
                .getContent();

        // then
        assertSoftly(softly -> {
            softly.assertThat(cities).hasSize(1);
            softly.assertThat(city).usingRecursiveComparison()
                    .isEqualTo(expect);
        });
    }

    @Test
    void 도시를_업데이트_한다() {
        // given
        City savedCity = cityRepository.save(서울특별시_송파구_잠실동_정보);
        CityUpdateRequest req = new CityUpdateRequest("부산", savedCity.getLatitude().getValue(), savedCity.getLongitude().getValue());

        City expect = City.builder()
                .id(savedCity.getId())
                .name("부산")
                .longitude(savedCity.getLongitude())
                .latitude(savedCity.getLatitude())
                .build();

        // when
        City updated = adminCityService.update(admin.getId(), savedCity.getId(), req);

        // then
        assertThat(updated).usingRecursiveComparison()
                .isEqualTo(expect);
    }

    @Test
    void 도시를_제거한다() {
        // given
        City savedCity = cityRepository.save(서울특별시_송파구_잠실동_정보);

        // when
        cityRepository.deleteById(savedCity.getId());

        // then
        List<City> result = cityRepository.findAll(Pageable.ofSize(1))
                .getContent();
        assertThat(result).hasSize(0);
    }

    @Test
    void 어드민_계정이_아니라면_예외를_발생한다() {
        // when & then
        assertThatThrownBy(() -> adminCityService.findAll(Pageable.ofSize(1), user.getId()))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }

    @Test
    void 유효하지_않은_도시_id가_들어오면_예외를_발생한다() {
        // when & then
        assertThatThrownBy(() -> adminCityService.update(admin.getId(), -1L, new CityUpdateRequest("no", BigDecimal.valueOf(37.2), BigDecimal.valueOf(37.2))))
                .isInstanceOf(CityException.class)
                .hasMessage(CityExceptionType.NOT_FOUND.message());
    }
}
