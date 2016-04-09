package net.medvedmike.vsu.demo.service;

import net.medvedmike.vsu.demo.annotation.system.audit.AuditBegin;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditComplete;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditError;
import net.medvedmike.vsu.demo.domain.User;
import net.medvedmike.vsu.demo.dto.UserDTO;
import net.medvedmike.vsu.demo.domain.UserView;
import net.medvedmike.vsu.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl extends BaseService implements UserService {

	@Autowired
	private UserRepository userRepository;

	@AuditError
	@Override
	public List<UserView> getUsers(String login, String name, String surname, String email, Date birthday,
								   int page, int count, String sidx, String sord) {
		return userRepository.getUserViews(login, name, surname, email, birthday, page, count, sidx, sord);
	}

	@AuditError
	@Override
	public UserDTO getDemo(Long id) {
		User user = userRepository.find(id);
		return new UserDTO(user);
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void createDemo(UserDTO dto) {
		User model = dto.toModel();
		userRepository.create(model);
		dto.setId(model.getId());
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void updateDemo(UserDTO dto) {
		User model = dto.toModel();
		userRepository.update(model);
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void deleteDemo(Long ... id) {
		userRepository.delete(Arrays.asList(id));
	}

}
