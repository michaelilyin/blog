package net.medvedmike.vsu.demo.service;

import net.medvedmike.vsu.demo.domain.UserView;
import net.medvedmike.vsu.demo.dto.UserDTO;

import java.util.Date;
import java.util.List;

public interface UserService {

	List<UserView> getUsers(String login, String name, String surname, String email, Date birthday,
							int page, int count, String sidx, String sord);

	UserDTO getDemo(Long id);

	void createDemo(UserDTO dto);

	void updateDemo(UserDTO dto);

	void deleteDemo(Long ... id);

}