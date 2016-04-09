package net.medvedmike.vsu.demo.service.exceptions;

/**
 * Created by Michael Ilyin on 09.04.2016.
 */
public class ServiceException extends RuntimeException {
    public ServiceException(Throwable cause) {
        super(cause);
    }
}
