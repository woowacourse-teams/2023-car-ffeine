package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.BaseEntity;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "fault_report")
@Entity
public class FaultReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
}
