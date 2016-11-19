package ru.michaelilyin.blog.controllers.api.administrative

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import ru.michaelilyin.blog.controllers.api.API_PREFIX
import ru.michaelilyin.blog.controllers.api.BaseController
import ru.michaelilyin.blog.dto.administrative.User
import ru.michaelilyin.blog.services.administrative.UserService
import ru.michaelilyin.blog.util.Page

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@Controller
@RequestMapping(API_PREFIX)
open class UserController @Autowired constructor(
        private val userService: UserService
) : BaseController() {

    @RequestMapping("/users", method = arrayOf(RequestMethod.GET))
    fun getUsers(@RequestParam("page", required = false, defaultValue = "0") page: Int,
                 @RequestParam("count", required = false, defaultValue = "0") count: Int
    ): ResponseEntity<Page<User>> {
        val users = userService.getUsers(page, count)
        return ResponseEntity.ok(Page(users, 0))
    }

    @RequestMapping("/users/{id}", method = arrayOf(RequestMethod.GET))
    fun getUser(@PathVariable("id") id: Long): ResponseEntity<User> {
        val user = userService.findUser(id)
        return ResponseEntity.ok(user)
    }

}