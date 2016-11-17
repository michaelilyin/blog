package ru.michaelilyin.blog.aspects.audit

import mu.KLogging
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.*
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@Aspect
@Component
open class AuditAspect {

    companion object : KLogging()

    @Pointcut("@annotation(ru.michaelilyin.blog.annotation.audit.AuditBegin)")
    private fun auditBeginPointcut() {}

    @Pointcut("@annotation(ru.michaelilyin.blog.annotation.audit.AuditComplete)")
    private fun auditCompletePointcut() {}

    @Pointcut("@annotation(ru.michaelilyin.blog.annotation.audit.AuditError)")
    private fun auditErrorPointcut() {}

    @PostConstruct
    fun create() {
        logger.info { "Audit system started" }
    }

    @Before("auditBeginPointcut()")
    fun auditBegin(jp: JoinPoint) {
        try {
            val message = "Call ${jp.toShortString()} with arguments ${jp.args}"
            logger.info(message)
        } catch (throwable: Throwable) {
            logger.error("Error in audit begin methods module.", throwable)
        }
    }

    @AfterReturning(pointcut = "auditCompletePointcut()", returning = "returning")
    fun auditAfter(jp: JoinPoint, returning: Any) {
        try {
            val message = "Complete ${jp.toShortString()} with return value $returning"
            logger.info(message)
        } catch (throwable: Throwable) {
            logger.error("Error in audit complete methods module.", throwable)
        }
    }

    @AfterThrowing(pointcut = "auditErrorPointcut()", throwing = "throwable")
    fun auditException(jp: JoinPoint, throwable: Throwable) {
        try {
            val message = "Error in ${jp.toShortString()}. " +
                    "Error: ${throwable.javaClass.simpleName}:${throwable.message}"
            logger.info(message, throwable)
        } catch (thr: Throwable) {
            logger.error("Error in audit errors in methods module.", thr)
        }
    }

}