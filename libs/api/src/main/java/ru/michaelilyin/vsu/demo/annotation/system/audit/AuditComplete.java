package ru.michaelilyin.vsu.demo.annotation.system.audit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 *  21.11.2015.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AuditComplete {
    long type() default 0L;
    String value() default "Method completed successfully";
}
