package ru.michaelilyin.blog.repository.administrative

import org.springframework.stereotype.Repository
import ru.michaelilyin.blog.domain.administrative.UserDomain
import java.time.Instant
import java.util.*
import java.util.concurrent.atomic.AtomicLong

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
@Repository
open class UserRepositoryImpl : UserRepository {

    val id = AtomicLong(4)

    val users = mutableMapOf<Long, UserDomain>(
            Pair(1, UserDomain(1, "first", "some", "firstsome", Date.from(Instant.now()))),
            Pair(2, UserDomain(2, "second", "some1", "firstsome1", Date.from(Instant.now()))),
            Pair(3, UserDomain(3, "third", "some2", "firstsome2", Date.from(Instant.now()))),
            Pair(4, UserDomain(4, "fourth", "some3", "firstsome3", Date.from(Instant.now())))
    )

    override fun getUsers(page: Int, count: Int): List<UserDomain> {
        return users.values.toList()
    }

    override fun findUser(id: Long): Optional<UserDomain> {
        return Optional.ofNullable(users.get(id))
    }

    override fun createUser(user: UserDomain): Long {
        val id = this.id.incrementAndGet()
        users[id] = user
        return id
    }
}