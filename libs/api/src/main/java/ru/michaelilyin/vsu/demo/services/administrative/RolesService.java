package ru.michaelilyin.vsu.demo.services.administrative;

import ru.michaelilyin.vsu.demo.domain.administrative.RoleView;

import java.util.List;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
public interface RolesService {

    List<RoleView> getUsers(String name, String description, int page, int count, String sidx, String sord);

}
