package com.itechart.retailers.controller;

import com.itechart.retailers.model.entity.CustomerCategory;
import com.itechart.retailers.model.entity.Location;
import com.itechart.retailers.model.payload.response.MessageResp;
import com.itechart.retailers.service.TaxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TaxController {

    private final TaxService taxService;
    private final String authorities = "hasRole('DIRECTOR')";

    @PutMapping("/taxes/rental")
    @PreAuthorize(authorities)
    public ResponseEntity<?> updRentalTax(@RequestBody List<Location> locations) {
        taxService.updateRentalTax(locations);
        return ResponseEntity.ok(new MessageResp("Taxes updated."));
    }

    @PutMapping("/taxes/category")
    @PreAuthorize(authorities)
    public ResponseEntity<?> updCategoryTax(@RequestBody List<CustomerCategory> categoryTaxes) {
        taxService.updateItemCategoryTaxes(categoryTaxes);
        return ResponseEntity.ok(new MessageResp("Taxes updated."));
    }
}
