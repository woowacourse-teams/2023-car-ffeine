package com.carffeine.carffeine.member.domain;

import com.carffeine.carffeine.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends BaseEntity {

    private static final int EMAIL_MASKING_LENGTH = 2;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberRole memberRole;

    public Member(String email) {
        this.email = email;
        this.memberRole = MemberRole.USER;
    }

    public boolean isAdmin() {
        return memberRole == MemberRole.ADMIN;
    }

    public boolean isSame(Long id) {
        return this.id.equals(id);
    }

    public String maskEmail() {
        return this.email.charAt(0) + "*".repeat(EMAIL_MASKING_LENGTH) + this.email.substring(EMAIL_MASKING_LENGTH + 1);
    }

    public void updateRole(MemberRole role) {
        this.memberRole = role;
    }
}
