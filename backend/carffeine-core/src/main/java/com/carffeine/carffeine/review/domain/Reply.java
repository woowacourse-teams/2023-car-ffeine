package com.carffeine.carffeine.review.domain;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.review.exception.ReviewException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

import static com.carffeine.carffeine.review.exception.ReviewExceptionType.DELETED_REVIEW;
import static com.carffeine.carffeine.review.exception.ReviewExceptionType.INVALID_CONTENT_MAX_LENGTH;
import static com.carffeine.carffeine.review.exception.ReviewExceptionType.INVALID_CONTENT_MIN_LENGTH;
import static com.carffeine.carffeine.review.exception.ReviewExceptionType.UNAUTHORIZED_MEMBER;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@SQLDelete(sql = "UPDATE reply SET is_deleted = true WHERE id = ?")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Reply extends BaseEntity {

    public static final int MIN_CONTENT = 10;
    public static final int MAX_CONTENT = 200;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, length = 200)
    private String content;

    @Column(nullable = false, length = 5)
    private boolean isDeleted;

    @Builder
    public Reply(Long id, Review review, Member member, String content, boolean isDeleted, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super(createdAt, updatedAt);
        validateContent(content);
        this.id = id;
        this.review = review;
        this.member = member;
        this.content = content;
        this.isDeleted = isDeleted;
    }

    private void validateContent(String content) {
        if (content.length() < MIN_CONTENT) {
            throw new ReviewException(INVALID_CONTENT_MIN_LENGTH);
        }
        if (content.length() > MAX_CONTENT) {
            throw new ReviewException(INVALID_CONTENT_MAX_LENGTH);
        }
    }

    public void updateContent(String content) {
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
