package com.scheme.portal.repository;

import com.scheme.portal.entity.EligibilityResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EligibilityResultRepository extends JpaRepository<EligibilityResult, Long> {
    List<EligibilityResult> findByUserId(Long userId);
}
