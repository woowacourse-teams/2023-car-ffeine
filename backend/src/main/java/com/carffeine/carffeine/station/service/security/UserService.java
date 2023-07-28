package com.carffeine.carffeine.station.service.security;

import com.carffeine.carffeine.station.domain.filter.AuthenticateUser;
import com.carffeine.carffeine.station.domain.filter.VerifyUserFilter;
import com.carffeine.carffeine.station.domain.jwt.Jwt;
import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import com.carffeine.carffeine.station.domain.user.Role;
import com.carffeine.carffeine.station.domain.user.User;
import com.carffeine.carffeine.station.domain.user.UserRepository;
import com.carffeine.carffeine.station.domain.user.UserRoleRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Transactional
    public Jwt refreshToken(String refreshToken) {
        try {
            jwtProvider.getClaims(refreshToken);
            User user = userRepository.findByRefreshToken(refreshToken);
            if (user == null) {
                return null;
            }

            HashMap<String, Object> claims = new HashMap<>();
            AuthenticateUser authenticateUser =
                    new AuthenticateUser(user.getId(), user.getEmail(), user.getRole());
            String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
            claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticateUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            updateRefreshToken(user.getId(), jwt.refreshToken());
            return jwt;
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public void updateRefreshToken(Long userId, String refreshToken) {
        User user = userRepository.findById(userId);
        if (user == null) {
            return;
        }
        user.updateRefreshToken(refreshToken);
    }

    @Transactional
    public boolean addUserRole(Long userId, Role role) {
        User user = userRepository.findById(userId);
        return user.addRole(role);
    }
}
