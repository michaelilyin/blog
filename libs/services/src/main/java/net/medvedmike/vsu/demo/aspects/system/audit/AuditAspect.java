package net.medvedmike.vsu.demo.aspects.system.audit;

import net.medvedmike.vsu.demo.annotation.system.audit.AuditBegin;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditComplete;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditError;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Objects;

/**
 *  21.11.2015.
 */
@Aspect
@Component
public class AuditAspect {

    private static final Logger LOG = LoggerFactory.getLogger(AuditAspect.class);

    @Pointcut("@annotation(net.medvedmike.vsu.demo.annotation.system.audit.AuditBegin)")
    private void auditBeginPointcut() {}

    @Pointcut("@annotation(net.medvedmike.vsu.demo.annotation.system.audit.AuditComplete)")
    private void auditCompletePointcut() {}

    @Pointcut("@annotation(net.medvedmike.vsu.demo.annotation.system.audit.AuditError)")
    private void auditErrorPointcut() {}

    @PostConstruct
    void create() {
        LOG.info("Audit system constructed");
    }

    @Before("auditBeginPointcut()")
    public void auditBegin(JoinPoint jp) {
        try {
            AuditBegin annotation = getAnnotation(jp, AuditBegin.class);
            String message = "Before " + jp.toShortString() + ": " + annotation.value();
            LOG.info(message);
        } catch (Throwable throwable) {
            LOG.error("Error in audit begin methods module.", throwable);
        }
    }

    @AfterReturning("auditCompletePointcut()")
    public void auditAfter(JoinPoint jp) {
        try {
            AuditComplete annotation = getAnnotation(jp, AuditComplete.class);
            String message = "After " + jp.toShortString() + ": " + annotation.value();
            LOG.info(message);
        } catch (Throwable throwable) {
            LOG.error("Error in audit complete methods module.", throwable);
        }
    }

    @AfterThrowing(pointcut = "auditErrorPointcut()", throwing = "throwable")
    public void auditException(JoinPoint jp, Throwable throwable) {
        try {
            AuditError annotation = getAnnotation(jp, AuditError.class);
            String message = "Exception during " + jp.toShortString() + ": " + annotation.value();
            LOG.info(message, throwable);
        } catch (Throwable thr) {
            LOG.error("Error in audit errors in methods module.", thr);
        }
    }

    private <T extends Annotation> T getAnnotation(JoinPoint jp, Class<T> annotationClass) throws NoSuchMethodException {
        MethodSignature ms = ((MethodSignature) jp.getSignature());
        Class<?> target = jp.getTarget().getClass();
        Method method = target.getMethod(ms.getName(), ms.getParameterTypes());
        return Objects.requireNonNull(method.getAnnotation(annotationClass), "Annotation is null");
    }

}
