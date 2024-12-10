package com.book.backend.common;

public interface ResponseCode {

        // 200 OK
        String SUCCESS = "SU";

        // 400 Bad Request
        String VALIDATION_FAILED = "VF";
        String DUPLICATE_EMAIL = "DE";
        String NOT_EXISTED_USER = "NU";


        // 401 Unauthorized
        String SIGN_IN_FAIL = "SF";
        String AUTHORIZATION_FAIL= "AF";

        // 403 Forbidden
        String NO_PERMISSION= "NP";

        // 500 Invernal Server Error
        String DATABASE_ERROR = "DBE";
        
}
