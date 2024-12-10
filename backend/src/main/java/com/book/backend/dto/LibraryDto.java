package com.book.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LibraryDto {

    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String website;
    private String libraryCode;
    
}
