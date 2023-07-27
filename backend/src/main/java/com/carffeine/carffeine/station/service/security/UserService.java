package com.carffeine.carffeine.station.service.security;

import com.carffeine.carffeine.station.controller.user.dto.UserResponse;
import com.carffeine.carffeine.station.controller.user.dto.UserVerifyResponse;
import com.carffeine.carffeine.station.domain.filter.AuthenticateUser;
import com.carffeine.carffeine.station.domain.filter.VerifyUserFilter;
import com.carffeine.carffeine.station.domain.jwt.Jwt;
import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import com.carffeine.carffeine.station.domain.user.Role;
import com.carffeine.carffeine.station.domain.user.UserRepository;
import com.carffeine.carffeine.station.domain.user.UserRole;
import com.carffeine.carffeine.station.domain.user.UserRoleRepository;
import com.carffeine.carffeine.station.domain.user.Users;
import com.carffeine.carffeine.station.service.user.dto.UserLoginRequest;
import com.carffeine.carffeine.station.service.user.dto.UserRegisterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Transactional
    public UserResponse registerUser(UserRegisterRequest userRegisterRequest) {
        Users user = userRepository.save(userRegisterRequest.toEntity());
        UserRole role = UserRole.builder()
                .role(Role.USER)
                .user(user)
                .build();
        user.addRole(role);
        userRoleRepository.save(role);
        return new UserResponse(user.getUsername(), user.getUserEmail());
    }

    public UserVerifyResponse verifyUser(UserLoginRequest userLoginRequest) {
        Users user = userRepository.findByUserEmail(userLoginRequest.email());
        if (user == null) {
            return UserVerifyResponse.builder()
                    .isValid(false)
                    .build();
        }
        return UserVerifyResponse.builder()
                .isValid(true)
                .userRole(user.getUserRoles().stream().map(UserRole::getRole).collect(Collectors.toSet())).build();
    }

    @Transactional
    public void updateRefreshToken(String userEmail, String refreshToken) {
        Users user = userRepository.findByUserEmail(userEmail);
        if (user == null) {
            return;
        }
        user.updateRefreshToken(refreshToken);
    }

    @Transactional
    public Jwt refreshToken(String refreshToken) {
        try {
            jwtProvider.getClaims(refreshToken);
            Users user = userRepository.findByRefreshToken(refreshToken);
            if (user == null) {
                return null;
            }

            HashMap<String, Object> claims = new HashMap<>();
            AuthenticateUser authenticateUser = new AuthenticateUser(user.getUserEmail(),
                    user.getUserRoles().stream().map(UserRole::getRole).collect(Collectors.toSet()));
            String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
            claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticateUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            updateRefreshToken(user.getUserEmail(), jwt.refreshToken());
            return jwt;
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public boolean addUserRole(String email, Role role) {
        Users users = userRepository.findByUserEmail(email);
        if (users.getUserRoles().stream().anyMatch(userRole -> userRole.getRole().equals(role))) {
            return false;
        }
        UserRole userRole = UserRole.builder()
                .user(users)
                .role(role)
                .build();
        users.addRole(userRole);
        userRoleRepository.save(userRole);
        return true;
    }
}
