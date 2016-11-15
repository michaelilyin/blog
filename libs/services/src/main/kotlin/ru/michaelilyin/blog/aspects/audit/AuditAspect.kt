package ru.michaelilyin.blog.aspects.audit

import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.*
import org.aspectj.lang.reflect.MethodSignature
import org.springframework.stereotype.Component
import ru.michaelilyin.blog.annotation.audit.AuditBegin
import ru.michaelilyin.blog.annotation.audit.AuditComplete
import ru.michaelilyin.blog.annotation.audit.AuditError
import javax.annotation.PostConstruct

import java.util.Objects

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@Aspect
@Component
open class AuditAspect {

    @Pointcut("@annotation(ru.michaelilyin.annotation.audit.AuditBegin)")
    private fun auditBeginPointcut() {}

    @Pointcut("@annotation(ru.michaelilyin.annotation.audit.AuditComplete)")
    private fun auditCompletePointcut() {}

    @Pointcut("@annotation(ru.michaelilyin.blog.annotation.audit.AuditError)")
    private fun auditErrorPointcut() {}

    @PostConstruct
    fun create() {
//        LOG.info("Audit system constructed");
    }

    @Before("auditBeginPointcut()")
    public fun auditBegin(jp: JoinPoint) {
        try {
            val annotation = getAnnotation(jp, AuditBegin::class.java)
            val message = "Begin " + jp.toShortString()
//            LOG.info(message)
        } catch (throwable: Throwable) {
//            LOG.error("Error in audit begin methods module.", throwable)
        }
    }

    @AfterReturning("auditCompletePointcut()")
    public fun auditAfter(jp: JoinPoint) {
        try {
            val annotation = getAnnotation(jp, AuditComplete::class.java)
            val message = "Complete " + jp.toShortString()
//            LOG.info(message)
        } catch (throwable: Throwable) {
//            LOG.error("Error in audit complete methods module.", throwable)
        }
    }

    @AfterThrowing(pointcut = "auditErrorPointcut()", throwing = "throwable")
    public fun auditException(jp: JoinPoint, throwable: Throwable) {
        try {
            val annotation = getAnnotation(jp, AuditError::class.java)
            val message = "Error in" + jp.toShortString()
//            LOG.info(message, throwable)
        } catch (thr: Throwable) {
//            LOG.error("Error in audit errors in methods module.", thr)
        }
    }

    private fun getAnnotation(jp: JoinPoint, java: Class<out Annotation>): Annotation {
        val ms = jp.getSignature() as MethodSignature
        val target = jp.target.javaClass
        val method = target.getMethod(ms.getName(), *ms.getParameterTypes());
        return Objects.requireNonNull(method.getAnnotation(java), "Annotation is null");
    }

}