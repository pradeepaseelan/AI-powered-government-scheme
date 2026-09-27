package com.scheme.portal.service;

import com.scheme.portal.dto.EligibilityRequest;
import com.scheme.portal.dto.EligibilityResponse;
import com.scheme.portal.entity.Scheme;
import com.scheme.portal.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Core rules-based eligibility engine.
 *
 * Every scheme criterion the applicant satisfies contributes weighted points
 * toward a match score (0-100). A scheme is marked "eligible" only if none of
 * its HARD constraints (age, income ceiling, gender, category, state) are
 * violated. Soft flags (student/farmer/widow/senior/disabled) only apply
 * when the scheme specifically targets that group.
 */
@Service
public class EligibilityService {

    private final SchemeRepository schemeRepository;

    public EligibilityService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    public List<EligibilityResponse> checkEligibility(EligibilityRequest req) {
        List<Scheme> schemes = schemeRepository.findAll();
        List<EligibilityResponse> results = new ArrayList<>();

        for (Scheme scheme : schemes) {
            if (!Boolean.TRUE.equals(scheme.getActive())) continue;

            List<String> reasons = new ArrayList<>();
            boolean eligible = true;
            double score = 0;
            double maxScore = 0;

            // --- Age check (hard constraint) ---
            if (scheme.getMinAge() != null || scheme.getMaxAge() != null) {
                maxScore += 20;
                if (req.getAge() == null) {
                    eligible = false;
                    reasons.add("Age not provided");
                } else {
                    boolean withinAge = (scheme.getMinAge() == null || req.getAge() >= scheme.getMinAge())
                            && (scheme.getMaxAge() == null || req.getAge() <= scheme.getMaxAge());
                    if (withinAge) {
                        score += 20;
                    } else {
                        eligible = false;
                        reasons.add("Age requirement not met (" + scheme.getMinAge() + "-" + scheme.getMaxAge() + " years)");
                    }
                }
            }

            // --- Income check (hard constraint) ---
            if (scheme.getMaxIncome() != null) {
                maxScore += 25;
                BigDecimal income = req.getAnnualIncome();
                if (income == null) {
                    eligible = false;
                    reasons.add("Income not provided");
                } else if (income.compareTo(scheme.getMaxIncome()) <= 0) {
                    score += 25;
                } else {
                    eligible = false;
                    reasons.add("Annual income exceeds scheme limit of " + scheme.getMaxIncome());
                }
            }

            // --- Gender check (hard constraint) ---
            if (scheme.getApplicableGender() != null
                    && scheme.getApplicableGender() != Scheme.ApplicableGender.ANY) {
                maxScore += 10;
                if (req.getGender() != null
                        && req.getGender().equalsIgnoreCase(scheme.getApplicableGender().name())) {
                    score += 10;
                } else {
                    eligible = false;
                    reasons.add("Scheme restricted to " + scheme.getApplicableGender());
                }
            }

            // --- Category check (hard constraint) ---
            if (scheme.getApplicableCategory() != null && !scheme.getApplicableCategory().equalsIgnoreCase("ALL")) {
                maxScore += 10;
                if (req.getCategory() != null && req.getCategory().equalsIgnoreCase(scheme.getApplicableCategory())) {
                    score += 10;
                } else {
                    eligible = false;
                    reasons.add("Scheme restricted to category: " + scheme.getApplicableCategory());
                }
            }

            // --- State check (hard constraint) ---
            if (scheme.getApplicableState() != null && !scheme.getApplicableState().equalsIgnoreCase("ALL")) {
                maxScore += 10;
                if (req.getState() != null && req.getState().equalsIgnoreCase(scheme.getApplicableState())) {
                    score += 10;
                } else {
                    eligible = false;
                    reasons.add("Scheme only available in: " + scheme.getApplicableState());
                }
            }

            // --- Soft targeted-group flags ---
            score += applyFlag(scheme.getForStudent(), req.getIsStudent(), 5, "student status", reasons);
            score += applyFlag(scheme.getForFarmer(), req.getIsFarmer(), 5, "farmer status", reasons);
            score += applyFlag(scheme.getForWidow(), req.getIsWidow(), 5, "widow status", reasons);
            score += applyFlag(scheme.getForSeniorCitizen(), req.getIsSeniorCitizen(), 5, "senior citizen status", reasons);
            score += applyFlag(scheme.getForDisabled(), req.getIsDisabled(), 5, "disability status", reasons);

            if (Boolean.TRUE.equals(scheme.getForStudent())) maxScore += 5;
            if (Boolean.TRUE.equals(scheme.getForFarmer())) maxScore += 5;
            if (Boolean.TRUE.equals(scheme.getForWidow())) maxScore += 5;
            if (Boolean.TRUE.equals(scheme.getForSeniorCitizen())) maxScore += 5;
            if (Boolean.TRUE.equals(scheme.getForDisabled())) maxScore += 5;

            // Re-check hard fail for targeted groups: if scheme ONLY targets a group
            // (e.g. forWidow=true) and the user doesn't belong to it, mark ineligible.
            if (Boolean.TRUE.equals(scheme.getForStudent()) && !Boolean.TRUE.equals(req.getIsStudent())) {
                eligible = false;
                reasons.add("Scheme is for students only");
            }
            if (Boolean.TRUE.equals(scheme.getForFarmer()) && !Boolean.TRUE.equals(req.getIsFarmer())) {
                eligible = false;
                reasons.add("Scheme is for farmers only");
            }
            if (Boolean.TRUE.equals(scheme.getForWidow()) && !Boolean.TRUE.equals(req.getIsWidow())) {
                eligible = false;
                reasons.add("Scheme is for widows only");
            }
            if (Boolean.TRUE.equals(scheme.getForSeniorCitizen()) && !Boolean.TRUE.equals(req.getIsSeniorCitizen())) {
                eligible = false;
                reasons.add("Scheme is for senior citizens only");
            }
            if (Boolean.TRUE.equals(scheme.getForDisabled()) && !Boolean.TRUE.equals(req.getIsDisabled())) {
                eligible = false;
                reasons.add("Scheme is for persons with disabilities only");
            }

            double matchScore = maxScore == 0 ? 100 : Math.round((score / maxScore) * 1000.0) / 10.0;
            String reasonText = eligible
                    ? "All eligibility criteria satisfied"
                    : String.join("; ", reasons);

            results.add(new EligibilityResponse(scheme.getId(), scheme.getName(), eligible, matchScore, reasonText));
        }

        results.sort((a, b) -> {
            if (a.isEligible() != b.isEligible()) return a.isEligible() ? -1 : 1;
            return Double.compare(b.getMatchScore(), a.getMatchScore());
        });

        return results;
    }

    private double applyFlag(Boolean schemeFlag, Boolean userFlag, double points, String label, List<String> reasons) {
        if (Boolean.TRUE.equals(schemeFlag) && Boolean.TRUE.equals(userFlag)) {
            return points;
        }
        return 0;
    }
}
