package ru.michaelilyin.blog.domain.administrative

import java.time.Instant
import java.util.*

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 08.10.2016.
 */
data class UserDomain(var id: Long = 0,
                      var name: String = "",
                      var surname: String = "",
                      var login: String = "",
                      var birthday: Date = Date.from(Instant.MIN)) { }