package ru.michaelilyin.blog.service

import ru.michaelilyin.blog.model.User

/**
 * Created by micha on 04.03.2017.
 */
interface UserService {
    fun getUsers(filter: String = ""): List<User>
}
