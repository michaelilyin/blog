package ru.michaelilyin.blog.services.administrative

import ru.michaelilyin.blog.dto.administrative.User
import java.util.*

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 08.10.2016.
 */
interface UserService {
    fun getUsers(page: Int, count: Int): List<User>
    fun findUser(id: Long): Optional<User>
}