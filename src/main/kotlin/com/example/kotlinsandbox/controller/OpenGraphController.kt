package com.example.kotlinsandbox.controller

import com.example.kotlinsandbox.service.OpenGraphService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class OpenGraphController(private val openGraphService: OpenGraphService) {

    @GetMapping("/api/og")
    fun fetchOpenGraphData(@RequestParam url: String): Map<String, String> {
        return openGraphService.fetchOpenGraphData(url)
    }
}
