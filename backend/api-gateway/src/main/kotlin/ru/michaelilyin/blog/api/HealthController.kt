package ru.michaelilyin.blog.api

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by micha on 04.03.2017.
 */
@RestController
class HealthController {

    @RequestMapping("health")
    fun getDemoString(): String {
        return "OK"
    }
}
