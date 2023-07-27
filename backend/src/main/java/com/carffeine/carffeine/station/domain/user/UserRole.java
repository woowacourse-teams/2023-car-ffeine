package com.carffeine.carffeine.station.domain.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@NoArgsConstructor
@Entity
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userRoleId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Builder
    public UserRole(Users user, Role role) {
        this.user = user;
        this.role = role;
    }
}
