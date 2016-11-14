package ru.michaelilyin.vsu.demo.controller.api.administrative;

import ru.michaelilyin.vsu.demo.controller.api.BaseControllerApi;
import ru.michaelilyin.vsu.demo.dto.administrative.UserDTO;
import ru.michaelilyin.vsu.demo.services.administrative.UsersService;
import ru.michaelilyin.vsu.demo.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
public class UsersControllerApi extends BaseControllerApi {

	@Autowired
	private UsersService usersService;

	@RequestMapping(value="/users", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Page> getUsers(
			@RequestParam(value = "login", required = false) String login,
			@RequestParam(value = "email", required = false) String email,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "surname", required = false) String surname,
			@RequestParam(value = "birthday", required = false) Long birthday,
			@RequestParam("page") int page, @RequestParam("rows") int rows,
			@RequestParam(value = "sidx", required = false, defaultValue = "id") String sidx,
			@RequestParam(value = "sord", required = false, defaultValue = "asc") String sord) {
		return new ResponseEntity<>(createPageBean(
				usersService.getUsers(login, name, surname, email, birthday == null ? null : new Date(birthday),
						page, rows, sidx, sord), page, rows), HttpStatus.OK);
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
		UserDTO dto = usersService.getDemo(id);
		if (dto != null)
			return new ResponseEntity<>(dto, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/users", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<UserDTO> postUser(@RequestBody UserDTO dto) {
		usersService.createDemo(dto);
		return new ResponseEntity<>(dto, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> putUser(@PathVariable("id") Long id,
									 @RequestBody UserDTO dto) {
		if (!id.equals(dto.getId()))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		usersService.updateDemo(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
		usersService.deleteDemo(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
