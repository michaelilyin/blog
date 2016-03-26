package net.medvedmike.vsu.demo.controller;

import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {
	
	@Resource(name="properties")
	private Properties properties;
	
	private String view = "index";
	
	@PostConstruct
	public void start() {
		if (!properties.getProperty("build.mode").equals("production")) 
			view = "index-develop";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String root() {
		return "redirect:/web";
	}
	
	@RequestMapping(value = "/web/**", method = RequestMethod.GET)
	public String index() {
		return view;
	}
}
