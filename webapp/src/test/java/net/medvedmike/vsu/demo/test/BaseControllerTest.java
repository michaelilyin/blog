package net.medvedmike.vsu.demo.test;

import java.nio.charset.Charset;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(MockitoJUnitRunner.class)
@ContextConfiguration(locations = {
		"file:src/main/webapp/WEB-INF/mvc-dispatcher-servlet.xml",
		"classpath*:tests-config.xml" })
@WebAppConfiguration
public abstract class BaseControllerTest {

	protected static final MediaType APPLICATION_JSON_UTF8 = new MediaType(
			MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

//	@Autowired
//	protected MockHttpSession session;
//	@Autowired
//	protected MockHttpServletRequest request;
	@Autowired
	private WebApplicationContext wac;
	
	protected MockMvc mockMvc;

	private Object[] mocks;

	public void setUp() {
		mocks = getTestingControllerMocks();
		Mockito.reset(mocks);
		MockitoAnnotations.initMocks(this);
		this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}
	
	public abstract Object[] getTestingControllerMocks();
	
}
