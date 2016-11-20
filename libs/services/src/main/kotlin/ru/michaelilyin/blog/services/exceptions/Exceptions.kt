package ru.michaelilyin.blog.services.exceptions

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 20.11.2016.
 */
open class ServiceException : RuntimeException {
    constructor() : super()
    constructor(message: String?) : super(message)
    constructor(message: String?, cause: Throwable?) : super(message, cause)
    constructor(cause: Throwable?) : super(cause)
}