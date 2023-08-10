package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
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


@Getter
@Builder
@SQLDelete(sql = "UPDATE review SET is_deleted = true WHERE id = ?")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Review extends BaseEntity {

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
