package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

import static com.carffeine.carffeine.member.exception.MemberExceptionType.NOT_FOUND;
import static com.carffeine.carffeine.station.exception.StationExceptionType.NOT_FOUND_ID;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.REVIEW_NOT_FOUND;

@RequiredArgsConstructor
@Transactional
@Service
public class ReviewService {

    private static final double DEFAULT_AVERAGE_RATING = 0.0;

    private final ReviewRepository reviewRepository;
    private final ReplyRepository replyRepository;
    private final StationRepository stationRepository;
    private final MemberRepository memberRepository;

    public Review saveReview(CreateReviewRequest request, String stationId, Long memberId) {
        Station station = findStation(stationId);
        Member member = findMember(memberId);
        Review review = getReview(request, station, member);
        return reviewRepository.save(review);
    }

    @Transactional(readOnly = true)
    public Page<Review> findAllReviews(String stationId, Pageable pageable) {
        Station station = findStation(stationId);
        return reviewRepository.findAllByStation(station, pageable);
    }

    public Map<Long, Long> countReplies(Page<Review> reviews) {
        Map<Long, Long> replyCounts = new HashMap<>();
        for (Review review : reviews) {
            replyCounts.put(review.getId(), replyRepository.countByReview(review));
        }
        return replyCounts;
    }

    public Review updateReview(CreateReviewRequest request, Long reviewId, Long memberId) {
        Review review = findReview(reviewId);
        Member member = findMember(memberId);
        review.validate(member);
        review.updateReview(request.ratings(), request.content());
        return review;
    }

    public void deleteReview(Long memberId, Long reviewId) {
        Review review = findReview(reviewId);
        Member member = findMember(memberId);
        review.validate(member);
        reviewRepository.delete(review);
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

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewException(REVIEW_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Double findAverageRatings(String stationId) {
        Station station = findStation(stationId);
        return reviewRepository.findAverageRatingsByStation(station)
                .map(this::parseToOneDecimalPoint)
                .orElse(DEFAULT_AVERAGE_RATING);
    }

    private double parseToOneDecimalPoint(Double rating) {
        return Math.round(rating * 10.0) / 10.0;
    }

    public long findTotalCount(String stationId) {
        Station station = findStation(stationId);
        return reviewRepository.countByStation(station);
    }
}
