package ru.michaelilyin.blog.dto.administrative

import ru.michaelilyin.blog.domain.administrative.RoleDomain
import ru.michaelilyin.blog.domain.administrative.UserDomain
import java.time.Instant
import java.util.*

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
data class User(var id: Long = 0,
                var name: String = "",
                var surname: String = "",
                var login: String = "",
                var birthday: Date = Date.from(Instant.MIN)) {

    constructor(domain: UserDomain) : this(
            id = domain.id,
            name = domain.name,
            surname = domain.surname,
            login = domain.login,
            birthday = domain.birthday
    )

    fun model(): UserDomain = UserDomain(
            id = id,
            name = name,
            surname = surname,
            login = login,
            birthday = birthday
    )
}