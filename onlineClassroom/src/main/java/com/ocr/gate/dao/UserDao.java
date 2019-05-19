package com.ocr.gate.dao;

import org.apache.ibatis.annotations.Param;

import com.ocr.common.pojo.User;

/**
 * User的dao层
 * @author 滕云飞
 * @date 2019年3月25日
 * @version ocr1.0.1
 */
public interface UserDao {
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
	User queryByUserAccount(@Param("userAccount")String userAccount);
	/**
	 * 修改用户表格信息
	 * @param user 用户信息
	 */
	void  updateUser(User user);
	/**
	 * 根据用户账号获取用户身份
	 * @param userAccount 用户账号
	 * @return 身份
	 */
	Integer getIndentification(String userAccount);
}
