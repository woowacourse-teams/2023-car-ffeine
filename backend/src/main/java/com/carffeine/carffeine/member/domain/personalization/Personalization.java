package com.carffeine.carffeine.member.domain.personalization;

import com.carffeine.carffeine.common.domain.BaseEntity;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "personalization")
@Entity
public class Personalization extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    private String carName;

    private String carYear;

    public static Personalization from(Member member,
                                       String carName,
                                       String carYear) {
        return new Personalization(null, member, carName, carYear);
    }

    public Personalization update(String carName, String carYear) {
        this.carName = carName;
        this.carYear = carYear;
        return this;
    }
}
