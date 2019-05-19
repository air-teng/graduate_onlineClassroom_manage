package com.ocr.gate.index.service.impl;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.servlet.ModelAndView;

import com.ocr.common.Param.MD5Param;
import com.ocr.common.pojo.User;
import com.ocr.gate.index.service.GateUserService;
import com.ocr.gate.service.UserService;

/**
 * 首页业务逻辑层
 * @author 滕云飞
 * @date 2019年3月6日
 * @version ocr1.0.1
 */
@Service
public class GateUserServiceImpl implements GateUserService {
	@Autowired
	private UserService userService;
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void addUser(User user) {
		//MD5加密
		try {
			String passwordMD5=DigestUtils.md5DigestAsHex((user.getPassword() + MD5Param.MD5_KEY_FOR_PASSWORD).getBytes("utf-8"));
			user.setPassword(passwordMD5);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		userService.addUser(user);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public User queryByUserAccount(String userAccount) {
		return userService.queryByUserAccount(userAccount);
	}

	@Override
	public ModelAndView login(HttpServletRequest request,String userAccount, String password){
		ModelAndView mav = new ModelAndView();
		//判断参数是否合法
		if(userAccount==null || "".equals(userAccount) || password==null || "".equals(password)) {
			throw new IllegalArgumentException("账号、密码不能为null或者空字符串");//以后记录到日志里面，并且生成表格，方便运维
		}
		User user=queryByUserAccount(userAccount);
		//MD5加密
		try {
			password = DigestUtils.md5DigestAsHex((password+MD5Param.MD5_KEY_FOR_PASSWORD).getBytes("utf-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		if(user==null) {
			mav.addObject("errorMsg","账号不存在");
			mav.setViewName("login");
		}else if(user.getPassword()==null || !user.getPassword().equals(password)){
			mav.addObject("errorMsg","密码错误");
			mav.setViewName("login");
		}else {
			//保存到session中
			HttpSession session = request.getSession();
			user.setPassword(null);
			session.setAttribute("userPermission", user);//保存用户信息到session中去
			
			mav.setViewName("index");
		}
		return mav;
	}

}
