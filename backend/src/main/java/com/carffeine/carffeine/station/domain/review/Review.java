package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.common.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
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

    private Integer ratings;

    private String content;

    private boolean isUpdated;

    private boolean isDeleted;
}