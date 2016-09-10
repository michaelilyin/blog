package net.medvedmike.vsu.demo.services.administrative;

import net.medvedmike.vsu.demo.domain.administrative.UserView;
import net.medvedmike.vsu.demo.dto.administrative.UserDTO;

import java.util.Date;
import java.util.List;

public interface UsersService {

	List<UserView> getUsers(String login, String name, String surname, String email, Date birthday,
							int page, int count, String sidx, String sord);

	UserDTO getDemo(Long id);

	void createDemo(UserDTO dto);

	void updateDemo(UserDTO dto);

	void deleteDemo(Long ... id);

}