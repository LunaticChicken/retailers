package com.itechart.retailers.model.payload.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerState {

	private Long customerId;
	private boolean isActive;

}