package com.ocr.gate.index.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ocr.common.pojo.User;
import com.ocr.gate.index.service.GateUserService;

@Controller
@RequestMapping("/")
public class IndexController {
	@Autowired
	private GateUserService gateUserService;
	
	@RequestMapping(value="",method=RequestMethod.GET)
	public String welcomeToOcr() {
		return "login";
	}
	@RequestMapping(value="register",method=RequestMethod.GET)
	public String register() {
		return "register";
	}
	
	@RequestMapping(value="login",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView login(String confirmPassword,ModelAndView mav,@Valid User user,BindingResult bindingResult) {
		//基本的非空和长度校验
		if(bindingResult.hasErrors()) {
			List<ObjectError> allErrors = bindingResult.getAllErrors();
			String errorMsg="";
			for(int i=0;i<allErrors.size();i++) {
				if(i==0) {
					errorMsg+=allErrors.get(i).getDefaultMessage();
					continue;
				}
				errorMsg+=","+allErrors.get(i).getDefaultMessage();
			}
			mav.setViewName("register");
			mav.addObject("errorMsg",errorMsg);
			return mav;
		}
		//用户名的密码和确认密码的校验
		if(confirmPassword == null || !user.getPassword().equals(confirmPassword)) {
			mav.setViewName("register");
			mav.addObject("errorMsg","两次密码输入不一致");
			return mav;
		}
		//杜绝账号冲突的情况（之后做成一个ajax来进行一个快速提示）
		User existUser = gateUserService.queryByUserAccount(user.getUserAccount());
		if(existUser != null) {
			mav.setViewName("register");
			mav.addObject("errorMsg","此账号已经存在，如果是你的账号你可以直接登录");
			return mav;
		}
		gateUserService.addUser(user);
		mav.setViewName("registerOk");
		return mav;
	}
	@RequestMapping(value="ok")
	public String registerOk() {
		return "registerOk";
	}
	@RequestMapping(value="personalInfo")
	public String personalInfo() {
		return "personalInfo";
	}
	@RequestMapping(value="/index",method=RequestMethod.GET)
	public String index() {
		return "index";
	}
}
