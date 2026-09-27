package com.scheme.portal.repository;

import com.scheme.portal.entity.SchemeApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemeApplicationRepository extends JpaRepository<SchemeApplication, Long> {
    List<SchemeApplication> findByUserId(Long userId);
}
