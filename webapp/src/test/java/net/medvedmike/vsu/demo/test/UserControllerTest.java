package net.medvedmike.vsu.demo.test;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import net.medvedmike.vsu.demo.domain.administrative.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import net.medvedmike.vsu.demo.controller.api.administrative.UsersControllerApi;
import net.medvedmike.vsu.demo.services.administrative.UsersService;
import org.mockito.MockitoAnnotations;

/*TODO: implements it*/
public class UserControllerTest extends BaseControllerTest {

	@Mock
	private UsersService usersServiceMock;

	@InjectMocks
	private UsersControllerApi usersControllerApi;

    @Before
    public void setUp() {
		MockitoAnnotations.initMocks(this);
        super.setUp();
    }

	@Test
	public void getDemoTest() throws Exception {
//		UserDTO dto = new UserDTO(1L, "Name", true, 10, 50.34f);
//		when(usersServiceMock.getUser(1L)).thenReturn(dto);
		when(usersServiceMock.getDemo(2L)).thenReturn(null);

		mockMvc.perform(get("/api/demos/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.id", is(1)))
				.andExpect(jsonPath("$.name", is("Name")))
				.andExpect(jsonPath("$.duration", is(10)))
				.andExpect(jsonPath("$.cost", is(50.34)));
		
		mockMvc.perform(get("/api/demos/{id}", 2)).andExpect(status().isNotFound());
	}

	@Test
	public void getDemosTest() throws Exception {
//		UserView demo1 = new UserView(1L, "Name 1", true, 10, 50.34f);
//		UserView demo2 = new UserView(2L, "Name 2", true, 10, 50.34f);
//		when(usersServiceMock.getUsers())
//				.thenReturn(Arrays.asList(demo1, demo2));
//
//		mockMvc.perform(get("/api/demos")).andExpect(status().isOk())
//				.andExpect(content().contentType(APPLICATION_JSON_UTF8))
//				.andExpect(jsonPath("$", hasSize(2)))
//				.andExpect(jsonPath("$[0].id", is(1)))
//				.andExpect(jsonPath("$[0].name", is("Name 1")))
//				.andExpect(jsonPath("$[1].id", is(2)))
//				.andExpect(jsonPath("$[1].name", is("Name 2")));
	}

	@Test
	public void postDemoTest() throws Exception {
		String request = "{\"name\": \"Name\", \"flag\": true, \"duration\": 10, \"cost\": 50.34}";
//		UserDTO post = new UserDTO(null, "Name", true, 10, 50.34f);
//		UserDTO ret = new UserDTO(1L, "Name", true, 10, 50.34f);
//
//		when(usersServiceMock.createDemo(post)).thenReturn(ret);

		mockMvc.perform(
				post("/api/demos").content(request).contentType(
						APPLICATION_JSON_UTF8)).andExpect(status().isCreated())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$.id", is(1)))
				.andExpect(jsonPath("$.name", is("Name")))
				.andExpect(jsonPath("$.duration", is(10)))
				.andExpect(jsonPath("$.cost", is(50.34)));
	}

	@Test
	public void putDemoTest() throws Exception {
		String request = "{\"id\": 1, \"name\": \"Name\", \"flag\": true, \"duration\": 10, \"cost\": 50.34}";
//		UserDTO put = new UserDTO(1L, "Name", true, 10, 50.34f);

		mockMvc.perform(
				put("/api/demos/{id}", 1).content(request).contentType(
						APPLICATION_JSON_UTF8)).andExpect(status().isOk());
//		verify(usersServiceMock, times(1)).updateDemo(put);
		
		mockMvc.perform(
				put("/api/demos/{id}", 2).content(request).contentType(
						APPLICATION_JSON_UTF8)).andExpect(status().isBadRequest());
//		verify(usersServiceMock, times(1)).updateDemo(put);
	}
	
	@Test
	public void deleteDemoTest() throws Exception {
		mockMvc.perform(
				delete("/api/demos/{id}", 1)).andExpect(status().isOk());

		verify(usersServiceMock, times(1)).deleteDemo(1L);
	}
}
