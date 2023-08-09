package com.carffeine.carffeine.station.fixture.review;

import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@SuppressWarnings("NonAsciiCharacters")

public class ReviewFixture {

    public static List<CreateReviewRequest> 리뷰_13개() {
        List<CreateReviewRequest> createReviewRequests = new ArrayList<>();
        for (int i = 0; i < 13; i++) {
            createReviewRequests.add(new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다"));
        }
        return createReviewRequests;
    }

    public static final Supplier<Review> 선릉역_충전소_리뷰_별4_15글자 = ()->Review.builder()
            .stationId("ME101010")
            .memberId(1L)
            .ratings(4)
            .content("덕분에 빠르게 충전했습니다")
            .isUpdated(false)
            .isDeleted(false)
            .build();
}
