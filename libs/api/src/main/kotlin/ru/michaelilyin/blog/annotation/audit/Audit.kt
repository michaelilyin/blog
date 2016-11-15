package ru.michaelilyin.blog.annotation.audit

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AuditBegin(val type: Long = 0)

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AuditComplete(val type: Long = 0)

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AuditError(val type: Long = 0)

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AuditFull(val type: Long = 0)