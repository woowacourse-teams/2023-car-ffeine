package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MIN_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_RATINGS_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_RATINGS_MIN_LENGTH;


@Getter
@Builder
@SQLDelete(sql = "UPDATE review SET is_deleted = true WHERE id = ?")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Review extends BaseEntity {

    public static final int MIN_RATINGS = 1;
    public static final int MAX_RATINGS = 5;
    public static final int MIN_CONTENT = 10;
    public static final int MAX_CONTENT = 200;
    public static final int REVIEW_LIMIT = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "station_id")
    private String stationId;

    @Column(name = "member_id")
    private Long memberId;

    private int ratings;

    private String content;

    private boolean isUpdated;

    private boolean isDeleted;

    public Review(Long id, String stationId, Long memberId, int ratings, String content, boolean isUpdated, boolean isDeleted) {
        validateRequest(ratings, content);
        this.id = id;
        this.stationId = stationId;
        this.memberId = memberId;
        this.ratings = ratings;
        this.content = content;
        this.isUpdated = isUpdated;
        this.isDeleted = isDeleted;
    }

    private void validateRequest(int ratings, String content) {
        validateRatings(ratings);
        validateContent(content);
    }

    private void validateRatings(int ratings) {
        if (ratings < MIN_RATINGS) {
            throw new ReviewException(INVALID_RATINGS_MIN_LENGTH);
        }
        if (ratings > MAX_RATINGS) {
            throw new ReviewException(INVALID_RATINGS_MAX_LENGTH);
        }
    }

    private void validateContent(String content) {
        if (content.length() < MIN_CONTENT) {
            throw new ReviewException(INVALID_CONTENT_MIN_LENGTH);
        }
        if (content.length() > MAX_CONTENT) {
            throw new ReviewException(INVALID_CONTENT_MAX_LENGTH);
        }
    }

    public void updateReview(int ratings, String content) {
        this.ratings = ratings;
        this.content = content;
    }

    public void delete() {
        this.isDeleted = true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review = (Review) o;
        return id == review.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
