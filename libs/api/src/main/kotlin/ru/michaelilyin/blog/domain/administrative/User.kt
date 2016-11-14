package ru.michaelilyin.blog.domain.administrative

import java.util.*

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 08.10.2016.
 */
data class User(var id: Long,
                var name: String,
                var surname: String,
                var login: String,
                var birthday: Date) {
}