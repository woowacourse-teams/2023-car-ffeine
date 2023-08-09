package com.carffeine.carffeine.station.fixture.report;

import com.carffeine.carffeine.member.fixture.MemberFixture;
import com.carffeine.carffeine.station.domain.report.MisinformationDetailReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;

import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;

public class MisinformationReportFixture {

    public static final MisinformationDetailReport 잘못된_정보_상세_제보 = MisinformationDetailReport.builder()
            .category("address")
            .content("부산시 시민공원로 11")
            .build();
    public static final MisinformationDetailReport 잘못된_정보_상세_제보_2 = MisinformationDetailReport.builder()
            .category("contact")
            .content("010-1001-1010")
            .build();

    public static final MisinformationReport 선릉역_상세정보가_포함된_잘못된_정보_제보 = MisinformationReport.builder()
            .station(선릉역_충전소_충전기_2개_사용가능_1개_완속)
            .misinformationDetailReports(List.of(잘못된_정보_상세_제보, 잘못된_정보_상세_제보_2))
            .member(MemberFixture.일반_회원)
            .build();

    public static final MisinformationReport 선릉역_잘못된_정보_제보 = MisinformationReport.builder()
            .station(선릉역_충전소_충전기_2개_사용가능_1개_완속)
            .member(MemberFixture.일반_회원)
            .build();
}
