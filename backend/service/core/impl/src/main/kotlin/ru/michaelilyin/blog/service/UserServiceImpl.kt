package ru.michaelilyin.blog.service

import org.springframework.stereotype.Service
import ru.michaelilyin.blog.model.User

/**
 * Created by micha on 04.03.2017.
 */
@Service
open class UserServiceImpl : UserService {
    override fun getUsers(filter: String): List<User> {
        return emptyList()
    }
}
