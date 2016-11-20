package ru.michaelilyin.blog.controllers.api.administrative

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.michaelilyin.blog.controllers.api.API_PREFIX
import ru.michaelilyin.blog.controllers.api.BaseController
import ru.michaelilyin.blog.controllers.api.DEFAULT_PAGE
import ru.michaelilyin.blog.controllers.api.DEFAULT_PAGE_SIZE
import ru.michaelilyin.blog.dto.administrative.User
import ru.michaelilyin.blog.services.administrative.UserService
import ru.michaelilyin.blog.util.Page

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@RestController
@RequestMapping(API_PREFIX)
open class UsersController @Autowired constructor(
        private val userService: UserService
) : BaseController() {

    @ResponseBody
    @RequestMapping("/users", method = arrayOf(RequestMethod.GET),
            produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE))
    fun getUsers(@RequestParam("page", required = false, defaultValue = DEFAULT_PAGE) page: Int,
                 @RequestParam("count", required = false, defaultValue = DEFAULT_PAGE_SIZE) count: Int
    ): ResponseEntity<Page<User>> {
        val users = userService.getUsers(page, count)
        return ResponseEntity.ok(Page(users, 0))
    }

    @ResponseBody
    @RequestMapping("/users/{id}", method = arrayOf(RequestMethod.GET))
    fun getUser(@PathVariable("id") id: Long): ResponseEntity<User> {
        val user = userService.findUser(id)
        return if (user.isPresent) ResponseEntity.ok(user.get())
        else ResponseEntity<User>(HttpStatus.NOT_FOUND)
    }

}