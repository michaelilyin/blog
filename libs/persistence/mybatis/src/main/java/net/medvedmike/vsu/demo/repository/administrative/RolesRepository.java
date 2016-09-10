package net.medvedmike.vsu.demo.repository.administrative;

import net.medvedmike.vsu.demo.domain.administrative.RoleView;
import net.medvedmike.vsu.demo.domain.administrative.UserView;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
public interface RolesRepository {
    List<RoleView> getUserViews(@Param("name") String name, @Param("description") String description,
                                @Param("page") int page, @Param("count") int count,
                                @Param("sidx") String sidx, @Param("sord") String sord);
}
