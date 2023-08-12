package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.station.controller.review.dto.ReviewResponses;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.carffeine.carffeine.member.exception.MemberExceptionType.NOT_FOUND;
import static com.carffeine.carffeine.station.exception.StationExceptionType.NOT_FOUND_ID;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.REVIEW_NOT_FOUND;

@RequiredArgsConstructor
@Transactional
@Service
public class ReviewService {

    public static final int PAGE_ELEMENT_SIZE = 10;
    public static final int INVALID_PAGE = -1;
    public static final int NEXT_PAGE = 1;

    private final ReviewRepository reviewRepository;
    private final StationRepository stationRepository;
    private final MemberRepository memberRepository;

    public Review saveReview(CreateReviewRequest request, String stationId, Long memberId) {
        Station station = findStation(stationId);
        Member member = findMember(memberId);
        Review review = getReview(request, station, member);
        return reviewRepository.save(review);
    }

    public ReviewResponses findAllReviews(String stationId, Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), PAGE_ELEMENT_SIZE, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Review> reviews = findPageReviews(stationId, pageable);
        return ReviewResponses.of(reviews, getNextPage(reviews));
    }

    public Page<Review> findPageReviews(String stationId, Pageable pageable) {
        Station station = findStation(stationId);
        return reviewRepository.findAllByStation(station, pageable);
    }

    public Review updateReview(CreateReviewRequest request, Long reviewId, Long memberId) {
        Review review = findReview(reviewId);
        Member member = findMember(memberId);
        review.validate(member);
        review.updateReview(request.ratings(), request.content());
        return review;
    }

    public Review deleteReview(Long memberId, long reviewId) {
        Review review = findReview(reviewId);
        Member member = findMember(memberId);
        review.validate(member);
        review.delete();
        return review;
    }

    private int getNextPage(Page<Review> reviews) {
        if (reviews.isLast()) {
            return INVALID_PAGE;
        }
        return reviews.getNumber() + NEXT_PAGE;
    }

    private Station findStation(String stationId) {
        return stationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new StationException(NOT_FOUND_ID));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(NOT_FOUND));
    }

    private Review getReview(CreateReviewRequest request, Station station, Member member) {
        return Review.builder()
                .station(station)
                .member(member)
                .ratings(request.ratings())
                .content(request.content())
                .build();
    }

    public Review findReview(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewException(REVIEW_NOT_FOUND));
    }
}
