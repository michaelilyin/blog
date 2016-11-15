package ru.michaelilyin.blog.repository.administrative

import ru.michaelilyin.blog.domain.administrative.UserDomain

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
interface UserRepository {
    fun findUser(id: Long): UserDomain
}