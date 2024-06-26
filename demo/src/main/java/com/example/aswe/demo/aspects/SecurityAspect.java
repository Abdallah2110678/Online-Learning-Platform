package com.example.aswe.demo.aspects;

import java.util.HashMap;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.example.aswe.demo.models.Role;
import com.example.aswe.demo.models.User;
import com.example.aswe.demo.service.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;


@Component
@Aspect
public class SecurityAspect {
    @Autowired
    private AuthenticationService authService;

    @Around("@annotation(com.example.aswe.demo.annotations.AdminAction) && args(request,..)")
    public Object checkAdminRole(ProceedingJoinPoint joinPoint, HttpServletRequest request) throws Throwable {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("error", "Authorization header is required");
            return ResponseEntity.status(401).body(response);
        }
        String jwtToken = authHeader.substring(7); // Assume the token follows "Bearer "
        User user = authService.getUserFromToken(jwtToken); // Implement this method
        if (user == null) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("error", "Invalid token.");
            return ResponseEntity.status(401).body(response);
        }
        boolean isAdmin = user.getRole() == Role.ADMIN;
        if (!isAdmin) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("error", "Not authorized.");
            return ResponseEntity.status(403).body(response);
        }
        return joinPoint.proceed(); // Proceed with the original method if authorized
    }

}