package com.scheme.portal.controller;

import com.scheme.portal.dto.EligibilityRequest;
import com.scheme.portal.dto.EligibilityResponse;
import com.scheme.portal.service.EligibilityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/eligibility")
@Tag(name = "Eligibility Checker", description = "Check scheme eligibility (public - no login required)")
public class EligibilityController {

    private final EligibilityService eligibilityService;

    public EligibilityController(EligibilityService eligibilityService) {
        this.eligibilityService = eligibilityService;
    }

    @PostMapping("/check")
    public ResponseEntity<List<EligibilityResponse>> check(@RequestBody EligibilityRequest request) {
        return ResponseEntity.ok(eligibilityService.checkEligibility(request));
    }
}
