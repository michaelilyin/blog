package ru.michaelilyin.blog.api.administrative

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import ru.michaelilyin.blog.model.User
import ru.michaelilyin.blog.service.UserService

/**
 * Created by micha on 04.03.2017.
 */
@RestController
@RequestMapping("administrative")
class UsersController @Autowired() constructor(
    private val userService: UserService
) {

    @RequestMapping("users")
    fun getUsers(@RequestParam("filter") filter: String): List<User> {
        return userService.getUsers(filter)
    }

}
