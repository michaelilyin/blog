package net.medvedmike.vsu.demo.controller.api.administrative.system;

import net.medvedmike.vsu.demo.controller.api.BaseControllerApi;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

/**
 * Created by Michael Ilyin on 07.05.2016.
 */
//@Controller
public class MonitoringControllerApi extends BaseControllerApi {
//    @Scheduled(fixedDelay = 250)
//    @SendTo("/topic/monitoring")
    public void sendMonitoringData() {

    }
}
