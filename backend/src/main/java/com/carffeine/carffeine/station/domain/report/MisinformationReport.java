package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "misinformation_report")
@Entity
public class MisinformationReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, length = 10)
    private boolean isChecked;

    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "misinformation_report_id", updatable = false, nullable = false)
    private List<MisinformationDetailReport> misinformationDetailReports = new ArrayList<>();

    public void check() {
        this.isChecked = true;
    }
}
