package com.carffeine.carffeine.filter.controller.dto.companyName;

import com.carffeine.carffeine.filter.domain.companyName.CompanyName;

public record CompanyNameResponse(String key, String value) {

    public static CompanyNameResponse from(CompanyName companyName) {
        return new CompanyNameResponse(companyName.getCompanyKey(), companyName.getCompanyName());
    }
}
