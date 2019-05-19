package com.ocr.gate.index.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ocr.gate.index.service.GateUserService;

/**
 * Index数据请求及返回页
 * @author 滕云飞
 * @date 2019年3月25日
 * @version ocr1.0.1
 */
@RestController
@RequestMapping("/")
public class IndexRestController {
	@Autowired
	private GateUserService gateUserService;
	
	@RequestMapping(value="preIndex",method= RequestMethod.POST)
	public ModelAndView preIndex(HttpServletRequest request,String userAccount,String userPassword) {
		ModelAndView mav=gateUserService.login(request,userAccount,userPassword);
		return mav;
	}
	
	@RequestMapping(value="logout")
	public ModelAndView logout(HttpServletRequest request,ModelAndView mav) {
		request.getSession().removeAttribute("userPermission");
		mav.setViewName("/login");
		return mav;
	}
	/*@RequestMapping(value="/login")
	public ModelAndView login(String userAccount,String password,ModelAndView mav) {
		mav.setViewName("gate/index");
		return mav;
	}*/
}
