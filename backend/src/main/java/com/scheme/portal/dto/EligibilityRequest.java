package com.scheme.portal.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EligibilityRequest {
    private Integer age;
    private String gender;
    private BigDecimal annualIncome;
    private String state;
    private String occupation;
    private String category;
    private Boolean isDisabled;
    private Boolean isStudent;
    private Boolean isFarmer;
    private Boolean isWidow;
    private Boolean isSeniorCitizen;
}
