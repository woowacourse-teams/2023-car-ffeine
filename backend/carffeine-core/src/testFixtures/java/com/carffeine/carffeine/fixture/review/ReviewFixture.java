package com.carffeine.carffeine.fixture.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.review.domain.Review;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.fixture.member.MemberFixture.일반_회원;
import static com.carffeine.carffeine.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

@SuppressWarnings("NonAsciiCharacters")
public class ReviewFixture {

    public static final Review 리뷰_별4_15글자 = Review.builder()
            .id(1L)
            .station(선릉역_충전소_충전기_2개_사용가능_1개)
            .member(일반_회원)
            .ratings(4)
            .content("덕분에 빠르게 충전했습니다")
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();

    public static Review 저장_전_리뷰(Member member) {
        return Review.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(member)
                .ratings(4)
                .content("덕분에 빠르게 충전했습니다")
                .isDeleted(false)
                .build();
    }

    public static List<Review> 리뷰_13개(Member member) {
        List<Review> reviews = new ArrayList<>();
        for (int i = 0; i < 13; i++) {
            Review review = Review.builder()
                    .station(선릉역_충전소_충전기_2개_사용가능_1개)
                    .member(member)
                    .ratings(2)
                    .content("감사합니다 감사합니다")
                    .isDeleted(false)
                    .build();
            reviews.add(review);
        }
        return reviews;
    }
}
