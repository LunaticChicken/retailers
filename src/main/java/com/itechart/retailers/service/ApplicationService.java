package com.itechart.retailers.service;

import com.itechart.retailers.model.entity.Application;
import com.itechart.retailers.model.entity.Location;
import com.itechart.retailers.model.payload.request.ApplicationReq;
import com.itechart.retailers.service.exception.UndefinedItemException;
import com.itechart.retailers.service.exception.UndefinedLocationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;


public interface ApplicationService {

	List<Application> findAll();

	@Transactional
	void save(ApplicationReq applicationDto) throws UndefinedItemException;

	Application getById(Long id);

	void delete(Application application);

	void deleteById(Long id);

	List<Application> findApplicationsByDestLocation(Location destLocation);

	Integer getOccupiedCapacity(Long id);

	void acceptApplication(Long id, String locationIdentifier) throws UndefinedLocationException;

}
