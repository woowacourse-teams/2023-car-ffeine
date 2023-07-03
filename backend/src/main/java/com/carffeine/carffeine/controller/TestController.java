package com.carffeine.carffeine.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> test() {
        return ResponseEntity.ok(Map.of("message", "Hello, world!"));
    }

    @GetMapping("/query")
    public ResponseEntity<Map<String, Object>> testQuery(@RequestParam String query) {
        return ResponseEntity.ok(Map.of("query", query));
    }

    @GetMapping("/body")
    public ResponseEntity<Map<String, Object>> testBody(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("body", body).get("body"));
    }
}
