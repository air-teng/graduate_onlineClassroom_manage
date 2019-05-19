package com.ocr.gate.index.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.ModelAndView;

import com.ocr.common.pojo.User;

/**
 * 首页业务逻辑层 
 * @author 滕云飞
 * @date 2019年3月6日
 * @version ocr1.0.1
 */
public interface GateUserService {
	/**
	 * 新增用户
	 * @param user 新增用户
	 */
	public void addUser(User user);
	/**
	 * 通过用户账号查询用户信息
	 * @param userAccount 用户账号
	 * @return 用户信息
	 */
	public User queryByUserAccount(String userAccount);
	/**
	 * 用户登录
	 * @param userAccount
	 * @param password
	 * @return
	 */
	public ModelAndView login(HttpServletRequest request,String userAccount, String password);
}
