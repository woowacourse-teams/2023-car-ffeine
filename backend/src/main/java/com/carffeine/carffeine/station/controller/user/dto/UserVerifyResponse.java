package com.carffeine.carffeine.station.controller.user.dto;

import com.carffeine.carffeine.station.domain.user.Role;
import lombok.Builder;

import java.util.Set;

@Builder
public record UserVerifyResponse(boolean isValid, Set<Role> userRole) {
}
