package com.carffeine.carffeine.station.domain.user;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userSeqId;

    private String userEmail;

    private String password;

    private String username;

    private String refreshToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private Set<UserRole> userRoles = new HashSet<>();

//    @Builder
//    public Users(String email, String password, String username) {
//        userEmail = email;
//        this.password = password;
//        this.username = username;
//    }

    public void addRole(UserRole userRole) {
        userRoles.add(userRole);
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
