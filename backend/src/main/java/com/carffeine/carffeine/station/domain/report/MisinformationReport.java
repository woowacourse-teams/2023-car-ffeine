package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.BaseTime;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "misinformation_report")
@Entity
public class MisinformationReport extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    private boolean isChecked;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "misinformation_report_id", updatable = false, nullable = false)
    private List<MisinformationDetailReport> misinformationDetailReports = new ArrayList<>();
}
