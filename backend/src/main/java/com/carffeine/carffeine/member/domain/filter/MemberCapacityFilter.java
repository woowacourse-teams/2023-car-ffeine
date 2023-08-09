package com.carffeine.carffeine.member.domain.filter;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.member.domain.member.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MemberCapacityFilter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "capacity_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Capacity capacity;

    public static MemberCapacityFilter of(Member member, Capacity capacity) {
        return new MemberCapacityFilter(null, member, capacity);
    }
}
