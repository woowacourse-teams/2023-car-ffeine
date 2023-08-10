package com.carffeine.carffeine.member.controller.dto;

import com.carffeine.carffeine.member.domain.personalization.Personalization;

public record CarPersonalizationResponse(String name, String year) {

    public static CarPersonalizationResponse from(Personalization personalization) {
        return new CarPersonalizationResponse(personalization.getCarName(), personalization.getCarYear());
    }
}
