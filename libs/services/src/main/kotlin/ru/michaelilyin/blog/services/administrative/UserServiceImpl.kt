package ru.michaelilyin.blog.services.administrative

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
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

}