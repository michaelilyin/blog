package ru.michaelilyin.blog.repository

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import ru.michaelilyin.blog.model.User
import ru.michaelilyin.utils.processFilter
import java.sql.ResultSet

/**
 * Created by micha on 04.03.2017.
 */
interface UserRepository {
    fun getUsers(filter: String = ""): List<User>
}

@Repository
open class UserRepositoryImpl @Autowired constructor(
    private val jdbcTemplate: JdbcTemplate
) : UserRepository {

    private val defaultUserMapper = { rs: ResultSet, rowNum: Int ->
        User(
            rs.getString("email"),
            rs.getString("name"),
            rs.getString("surname")
        )
    }

    override fun getUsers(filter: String): List<User> {
        val filter = processFilter(filter)
        return jdbcTemplate.query("SELECT * FROM users WHERE" + filter, defaultUserMapper)
    }

}
