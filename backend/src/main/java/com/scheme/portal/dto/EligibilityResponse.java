package com.scheme.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EligibilityResponse {
    private Long schemeId;
    private String schemeName;
    private boolean eligible;
    private double matchScore;
    private String reason;
}
