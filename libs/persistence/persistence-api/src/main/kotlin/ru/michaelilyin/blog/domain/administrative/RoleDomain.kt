package ru.michaelilyin.blog.domain.administrative

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 08.10.2016.
 */
data class RoleDomain(var id: Long = 0,
                      var name: String = "",
                      var description: String = "",
                      var internal: Boolean = false) { }