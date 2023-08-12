package com.carffeine.carffeine.member.domain;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.filter.domain.Filter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member_filter")
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@Entity
public class MemberFilter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "filter_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Filter filter;

    public MemberFilter(Member member, Filter filter) {
        this.member = member;
        this.filter = filter;
    }
}
