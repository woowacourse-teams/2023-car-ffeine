package com.carffeine.carffeine.station.fixture.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

@SuppressWarnings("NonAsciiCharacters")
public class ReviewFixture {

    public static final Review 리뷰_별4_15글자 = Review.builder()
            .id(2L)
            .station(선릉역_충전소_충전기_2개_사용가능_1개)
            .member(일반_회원)
            .ratings(4)
            .content("덕분에 빠르게 충전했습니다")
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();

    public static final CreateReviewRequest 리뷰_요청_1개 =
            new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");

    public static final CreateReviewRequest 수정_요청_1개 =
            new CreateReviewRequest(4, "리뷰를 수정하고자 합니다");

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

    public static List<CreateReviewRequest> 리뷰_요청_13개() {
        List<CreateReviewRequest> createReviewRequests = new ArrayList<>();
        for (int i = 0; i < 13; i++) {
            createReviewRequests.add(리뷰_요청_1개);
        }
        return createReviewRequests;
    }
}
