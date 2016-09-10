package net.medvedmike.vsu.demo.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Базовый класс всех сервисов. Содержит общие методы и вызовы для всех сервисов.
 */
public abstract class BaseService {

	private static final Logger LOG = LoggerFactory.getLogger(BaseService.class);

	/**
	 * Возвращает логгер.
	 * @return логгер
	 */
	protected Logger getLogger() {
        return LOG;
    }
}
