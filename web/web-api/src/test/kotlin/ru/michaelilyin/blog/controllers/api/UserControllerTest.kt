package ru.michaelilyin.blog.controllers.api

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import ru.michaelilyin.blog.dto.administrative.User
import ru.michaelilyin.blog.services.administrative.UserService
import java.time.Instant
import java.util.*

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 17.11.2016.
 */
@RunWith(SpringJUnit4ClassRunner::class)
@ContextConfiguration(locations = arrayOf("classpath:dispatcher-servlet.xml","classpath:/tests-context.xml"))
@WebAppConfiguration
class UserControllerTest {

    private val user1 = User(1, "User 1", "Group 1", "user1", Date.from(Instant.now()))

    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var usersService: UserService

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @Before
    fun before() {
        reset()
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build()
    }

    fun after() {
        reset()
    }

    private fun reset() {
        Mockito.reset(usersService)
    }

    @Test
    fun testGetAll() {
        Mockito.`when`(usersService.getUsers(1, 10)).thenReturn(listOf(user1))
        mockMvc
                .perform(MockMvcRequestBuilders
                        .get("/api/v1/users")
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(status().isOk)
    }
}