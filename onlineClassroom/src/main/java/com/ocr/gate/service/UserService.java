package com.ocr.gate.service;

import com.ocr.common.pojo.User;

/**
 * 与User数据持久层直接交互的业务层接口
 * @author 滕云飞
 * @date 2019年3月6日
 * @version ocr1.0.1
 */
public interface UserService {
	/**
	 * 新增用户
	 * @param user 新增用户
	 */
	void addUser(User user);
	/**
	 * 通过用户账号查询用户信息
	 * @param userAccount 用户账号
	 * @return 用户信息
	 */
	User queryByUserAccount(String userAccount);
	/**
	 * 修改用户信息
	 * @param user 用户信息
	 */
	void updateUser(User user);
	/**
	 * 获取用户身份信息
	 * @return 身份信息
	 */
	Integer getIndentification(String userAccount);
}
