package net.medvedmike.vsu.demo.dto;

import net.medvedmike.vsu.demo.domain.User;

import java.util.Date;

public class UserDTO {
	private Long id;
	private String name;
	private String surname;
	private String login;
	private String email;
	private Date birthday;
	
	public UserDTO() {
		
	}

	public UserDTO(User domain) {
		id = domain.getId();
		name = domain.getName();
		surname = domain.getSurname();
		login = domain.getLogin();
		email = domain.getEmail();
		birthday = domain.getBirthday();
	}

	public User toModel() {
		User user = new User();
		user.setId(id);
		user.setName(name);
		user.setSurname(surname);
		user.setLogin(login);
		user.setEmail(email);
		user.setBirthday(birthday);
		return user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}
}
