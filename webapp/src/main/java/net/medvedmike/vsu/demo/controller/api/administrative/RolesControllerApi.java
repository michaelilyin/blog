package net.medvedmike.vsu.demo.controller.api.administrative;

import net.medvedmike.vsu.demo.controller.api.BaseControllerApi;
import net.medvedmike.vsu.demo.services.administrative.UsersService;
import net.medvedmike.vsu.demo.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Michael Ilyin on 17.04.2016.
 */
//@Controller("/roles")
public class RolesControllerApi extends BaseControllerApi {

//    @Autowired
    private UsersService usersService;

//    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Page> getRoles(@RequestParam(value = "name", required = false) String name,
                                         @RequestParam(value = "surname", required = false) String surname,
                                         @RequestParam(value = "birthday", required = false) Long birthday,
                                         @RequestParam("page") int page, @RequestParam("rows") int rows,
                                         @RequestParam(value = "sidx", required = false, defaultValue = "id") String sidx,
                                         @RequestParam(value = "sord", required = false, defaultValue = "asc") String sord) {
        return null;
    }
}
