package ru.michaelilyin.blog.services.administrative

import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import ru.michaelilyin.blog.domain.administrative.UserDomain
import ru.michaelilyin.blog.dto.administrative.User
import ru.michaelilyin.blog.repository.administrative.UserRepository
import java.time.Instant
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 20.11.2016.
 */
@RunWith(SpringJUnit4ClassRunner::class)
@ContextConfiguration(locations = arrayOf("classpath:component-context.xml","classpath:/tests-context.xml"))
class UserServiceTest {

    val user1: UserDomain = UserDomain(1, "first", "first sur", "first", Date.from(Instant.now()))

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var userService: UserService

    @Before
    fun before() {
        Mockito.reset(userRepository)
    }

    @After
    fun after() {
        Mockito.reset(userRepository)
    }

    @Test
    fun testGetAllUsers() {
        Mockito.`when`(userRepository.getUsers(1, 10)).thenReturn(listOf(user1))
        val result = userService.getUsers(1, 10)
        assertEquals(1, result.size)

        assertEquals(user1.id, result[0].id)
        assertEquals(user1.name, result[0].name)
        assertEquals(user1.surname, result[0].surname)
        assertEquals(user1.login, result[0].login)
        assertEquals(user1.birthday, result[0].birthday)

        Mockito.verify(userRepository, Mockito.times(1)).getUsers(1, 10)
    }

    @Test
    fun testGetUser() {
        Mockito.`when`(userRepository.findUser(user1.id)).thenReturn(Optional.of(user1))

        val result = userService.findUser(user1.id)

        assertTrue(result.isPresent)

        assertEquals(user1.id, result.get().id)
        assertEquals(user1.name, result.get().name)
        assertEquals(user1.surname, result.get().surname)
        assertEquals(user1.login, result.get().login)
        assertEquals(user1.birthday, result.get().birthday)

        Mockito.verify(userRepository, Mockito.times(1)).findUser(user1.id)
    }

    @Test
    fun testGetUserNotFound() {
        Mockito.`when`(userRepository.findUser(user1.id)).thenReturn(Optional.empty())

        val result = userService.findUser(user1.id)

        assertFalse(result.isPresent)

        Mockito.verify(userRepository, Mockito.times(1)).findUser(user1.id)
    }

    @Test
    fun testCreateUser() {
        val birthday = Date.from(Instant.now())
        val createDomain = UserDomain(0, "new", "new", "login", birthday)
        Mockito.`when`(userRepository.createUser(createDomain)).thenReturn(5)

        val result = userService.createUser(User(0, "new", "new", "login", birthday))

        assertEquals(5, result)

        Mockito.verify(userRepository, Mockito.times(1)).createUser(createDomain)
    }

}