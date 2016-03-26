package net.medvedmike.vsu.demo.controller.api;

import net.medvedmike.vsu.demo.util.Page;
import net.medvedmike.vsu.demo.domain.util.PageSupport;
import org.apache.ibatis.reflection.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RequestMapping(value = "/api")
public class BaseControllerApi {

    protected final Logger log = LoggerFactory.getLogger(getClass().getCanonicalName());

    protected Page createPageBean(List<? extends PageSupport> views, int page, int count){
        if (views != null && views.size() > 0) {
            int totalCount = views.get(0).getCnt();
            return new Page(views, totalCount, count, page);
        }
        return new Page(views, 0, count, page);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<?> errorHandler(Throwable throwable) {
        log.error("Controller error", throwable);
        return new ResponseEntity<>(throwable, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
