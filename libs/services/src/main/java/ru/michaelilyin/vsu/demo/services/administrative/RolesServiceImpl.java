package ru.michaelilyin.vsu.demo.services.administrative;

import ru.michaelilyin.vsu.demo.domain.administrative.RoleView;
import ru.michaelilyin.vsu.demo.repository.administrative.RolesRepository;

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
