package net.medvedmike.vsu.demo.service;

import net.medvedmike.vsu.demo.annotation.system.audit.AuditBegin;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditComplete;
import net.medvedmike.vsu.demo.annotation.system.audit.AuditError;
import net.medvedmike.vsu.demo.dto.UserDTO;
import net.medvedmike.vsu.demo.domain.UserView;
import net.medvedmike.vsu.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl extends BaseService implements UserService {
	
	private static Map<Long, UserDTO> demos = new HashMap<>();
	private static Long nextId = null; 
	
	static {
		demos.put(1L, new UserDTO(1L, "Name 1", true, 5, 2.5f));
		demos.put(2L, new UserDTO(2L, "Name 2", false, 2133, 222.1125f));
		demos.put(3L, new UserDTO(3L, "Name 3", false, 31, 121.5f));
		demos.put(4L, new UserDTO(4L, "Name 4", true, 1243321, 0.2125f));
		demos.put(5L, new UserDTO(5L, "Name 5", false, 53, 23.5f));
		demos.put(6L, new UserDTO(6L, "Name 6", false, 2123, 282.115f));
		demos.put(7L, new UserDTO(7L, "Name 7", true, 31, 121.5f));
		demos.put(8L, new UserDTO(8L, "Name 8", false, 123281, 0.27125f));
		demos.put(9L, new UserDTO(9L, "Name 9", true, 55, 2.95f));
		demos.put(10L, new UserDTO(10L, "Name 10", true, 2183, 227.115f));
		demos.put(11L, new UserDTO(11L, "Name 11", false, 381, 1241.5f));
		demos.put(12L, new UserDTO(12L, "Name 12", true, 12321, 80.2125f));
		demos.put(13L, new UserDTO(13L, "Name 13", true, 538, 2.55f));
		demos.put(14L, new UserDTO(14L, "Name 14", true, 213, 22.115f));
		demos.put(15L, new UserDTO(15L, "Name 15", false, 361, 121.5f));
		demos.put(16L, new UserDTO(16L, "Name 16", true, 125321, 0.2125f));
		nextId = 17L;
	}

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
		UserDTO original = demos.get(id);
		if (original == null)
			throw new NullPointerException();
		return original;
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public UserDTO createDemo(UserDTO dto) {
		dto.setId(nextId++);
		demos.put(dto.getId(), dto);
		return dto;
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void updateDemo(UserDTO dto) {
		UserDTO original = demos.get(dto.getId());
		if (original == null)
			throw new NullPointerException();
		original.setCost(dto.getCost());
		original.setDuration(dto.getDuration());
		original.setFlag(dto.getFlag());
		original.setName(dto.getName());
	}

	@AuditBegin
	@AuditComplete
	@AuditError
	@Override
	public void deleteDemo(Long id) {
		demos.remove(id);
	}

}
