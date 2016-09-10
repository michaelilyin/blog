package net.medvedmike.vsu.demo.services.administrative;

import net.medvedmike.vsu.demo.annotation.system.audit.AuditBegin;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditComplete;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditError;
import net.medvedmike.vsu.demo.domain.administrative.User;
import net.medvedmike.vsu.demo.dto.administrative.UserDTO;
import net.medvedmike.vsu.demo.domain.administrative.UserView;
import net.medvedmike.vsu.demo.repository.administrative.UsersRepository;
import net.medvedmike.vsu.demo.services.BaseService;
import net.medvedmike.vsu.demo.services.administrative.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsersServiceImpl extends BaseService implements UsersService {

	@Autowired
	private UsersRepository usersRepository;

	@AuditError
	@Override
	public List<UserView> getUsers(String login, String name, String surname, String email, Date birthday,
								   int page, int count, String sidx, String sord) {
		return usersRepository.getUserViews(login, name, surname, email, birthday, page, count, sidx, sord);
	}

	@AuditError
	@Override
	public UserDTO getDemo(Long id) {
		User user = usersRepository.find(id);
		return new UserDTO(user);
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void createDemo(UserDTO dto) {
		User model = dto.toModel();
		usersRepository.create(model);
		dto.setId(model.getId());
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void updateDemo(UserDTO dto) {
		User model = dto.toModel();
		usersRepository.update(model);
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void deleteDemo(Long ... id) {
		usersRepository.delete(Arrays.asList(id));
	}

}
