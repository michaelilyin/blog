package net.medvedmike.vsu.demo.services.administrative;

import net.medvedmike.vsu.demo.domain.administrative.RoleView;
import net.medvedmike.vsu.demo.domain.administrative.UserView;

import java.util.Date;
import java.util.List;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
public interface RolesService {

    List<RoleView> getUsers(String name, String description, int page, int count, String sidx, String sord);

}
