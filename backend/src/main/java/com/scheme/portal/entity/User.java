package com.scheme.portal.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "annual_income")
    private BigDecimal annualIncome;

    private String state;
    private String district;
    private String occupation;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "is_disabled")
    private Boolean isDisabled = false;

    @Column(name = "is_student")
    private Boolean isStudent = false;

    @Column(name = "is_farmer")
    private Boolean isFarmer = false;

    @Column(name = "is_widow")
    private Boolean isWidow = false;

    @Column(name = "is_senior_citizen")
    private Boolean isSeniorCitizen = false;

    @Column(name = "profile_image")
    private String profileImage;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    private Boolean enabled = true;

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

    public enum Gender { MALE, FEMALE, OTHER }
    public enum Category { GENERAL, OBC, SC, ST, EWS }
    public enum Role { USER }
}
