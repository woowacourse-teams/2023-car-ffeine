package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.DELETED_REVIEW;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MIN_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_RATINGS_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_RATINGS_MIN_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.UNAUTHORIZED_MEMBER;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "station_id")
    private Station station;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int ratings;

    private String content;

    private boolean isDeleted;

    @Builder
    public Review(Long id, Station station, Member member, int ratings, String content, boolean isDeleted, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super(createdAt, updatedAt);
        validateRequest(ratings, content);
        this.id = id;
        this.station = station;
        this.member = member;
        this.ratings = ratings;
        this.content = content;
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

    public void validate(Member member) {
        validateMember(member);
        validateDeletion();
    }

    private void validateMember(Member member) {
        if (!this.member.equals(member)) {
            throw new ReviewException(UNAUTHORIZED_MEMBER);
        }
    }

    private void validateDeletion() {
        if (isDeleted) {
            throw new ReviewException(DELETED_REVIEW);
        }
    }
}
