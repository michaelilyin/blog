package ru.michaelilyin.blog.services.administrative

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.michaelilyin.blog.annotation.audit.AuditBegin
import ru.michaelilyin.blog.annotation.audit.AuditComplete
import ru.michaelilyin.blog.annotation.audit.AuditError
import ru.michaelilyin.blog.dto.administrative.User
import ru.michaelilyin.blog.repository.administrative.UserRepository
import ru.michaelilyin.blog.services.BaseService

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@Service
open class UserServiceImpl @Autowired() constructor(
        private val userRepository: UserRepository
): BaseService(), UserService {

    @AuditError
    override fun getUsers(page: Int, count: Int): List<User> {
        val users = userRepository.getUsers(page, count)
        return users.map(::User)
    }

    @AuditBegin
    @AuditComplete
    @AuditError
    override fun findUser(id: Long): User {
        val user = userRepository.findUser(id)
        return User(user)
    }

}