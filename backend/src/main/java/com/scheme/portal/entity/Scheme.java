package com.scheme.portal.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "schemes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String department;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Column(name = "documents_required", columnDefinition = "TEXT")
    private String documentsRequired;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Column(name = "max_income")
    private BigDecimal maxIncome;

    @Enumerated(EnumType.STRING)
    @Column(name = "applicable_gender")
    private ApplicableGender applicableGender = ApplicableGender.ANY;

    @Column(name = "applicable_category")
    private String applicableCategory = "ALL";

    @Column(name = "applicable_state")
    private String applicableState = "ALL";

    @Column(name = "for_student")
    private Boolean forStudent = false;

    @Column(name = "for_farmer")
    private Boolean forFarmer = false;

    @Column(name = "for_widow")
    private Boolean forWidow = false;

    @Column(name = "for_senior_citizen")
    private Boolean forSeniorCitizen = false;

    @Column(name = "for_disabled")
    private Boolean forDisabled = false;

    @Column(name = "official_link")
    private String officialLink;

    private Boolean active = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ApplicableGender { MALE, FEMALE, ANY }
}
