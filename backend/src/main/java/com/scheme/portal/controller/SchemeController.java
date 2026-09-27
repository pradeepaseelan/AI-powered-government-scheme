package com.scheme.portal.controller;

import com.scheme.portal.entity.Scheme;
import com.scheme.portal.exception.ResourceNotFoundException;
import com.scheme.portal.repository.SchemeRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/schemes")
@Tag(name = "Schemes", description = "Browse and search government schemes (public)")
public class SchemeController {

    private final SchemeRepository schemeRepository;

    public SchemeController(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    @GetMapping
    public ResponseEntity<Page<Scheme>> getAllSchemes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        return ResponseEntity.ok(schemeRepository.findAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scheme> getSchemeById(@PathVariable Long id) {
        Scheme scheme = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with id: " + id));
        return ResponseEntity.ok(scheme);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Scheme>> searchSchemes(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {

        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.ok(schemeRepository.findAll(PageRequest.of(page, size)));
        }

        Page<Scheme> results = schemeRepository.findAll((root, query, cb) ->
                cb.or(
                        cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("description")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("department")), "%" + keyword.toLowerCase() + "%")
                ), PageRequest.of(page, size));

        return ResponseEntity.ok(results);
    }
}
