package com.itechart.retailers.security.service;

import com.itechart.retailers.model.entity.Customer;
import com.itechart.retailers.model.entity.Location;
import com.itechart.retailers.model.entity.User;
import com.itechart.retailers.repository.CustomerRepository;
import com.itechart.retailers.repository.LocationRepository;
import com.itechart.retailers.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityContextService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final LocationRepository locationRepository;

    public User getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail).get();
    }

    public Customer getCurrentCustomer() {
        return getCurrentUser().getCustomer();
    }

    public Location getCurrentLocation() {
        return getCurrentUser().getLocation();
    }
}
