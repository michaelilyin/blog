package net.medvedmike.vsu.demo.services.exceptions;

/**
 * Created by Michael Ilyin on 09.04.2016.
 */
public class ServiceException extends RuntimeException {
    public ServiceException(Throwable cause) {
        super(cause);
    }
}
