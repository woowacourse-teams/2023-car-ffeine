package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "misinformation_detail_report")
@Entity
public class MisinformationDetailReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String content;
}
