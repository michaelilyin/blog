package net.medvedmike.vsu.demo.repository.administrative;

import net.medvedmike.vsu.demo.domain.administrative.User;
import net.medvedmike.vsu.demo.domain.administrative.UserView;
import net.medvedmike.vsu.demo.repository.Repository;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 *  19.02.2016.
 */
public interface UsersRepository extends Repository<Long, User> {
    List<UserView> getUserViews(@Param("login") String login, @Param("name") String name,
                                @Param("surname") String surname, @Param("email") String email,
                                @Param("birthday") Date birthday, @Param("page") int page, @Param("count") int count,
                                @Param("sidx") String sidx, @Param("sord") String sord);
}
