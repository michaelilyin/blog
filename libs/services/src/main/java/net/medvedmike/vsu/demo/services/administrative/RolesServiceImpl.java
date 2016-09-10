package net.medvedmike.vsu.demo.services.administrative;

import net.medvedmike.vsu.demo.annotation.system.audit.AuditError;
import net.medvedmike.vsu.demo.domain.administrative.RoleView;
import net.medvedmike.vsu.demo.repository.administrative.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
public class RolesServiceImpl implements RolesService {

//    @Autowired
    private RolesRepository rolesRepository;

//    @Override
//    @AuditError
    public List<RoleView> getUsers(String name, String description, int page, int count, String sidx, String sord) {
        return rolesRepository.getUserViews(name, description, page, count, sidx, sord);
    }
}
