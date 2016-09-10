package net.medvedmike.vsu.demo.repository;

import java.io.Serializable;
import java.util.List;

/**
 *  21.02.2016.
 */
public interface Repository<PK extends Serializable, T> {

    T find(PK id);

    void create(T entity);

    void update(T entity);

    void delete(List<PK> id);
}
