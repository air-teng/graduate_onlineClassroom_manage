package com.ocr.gate.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocr.common.pojo.User;
import com.ocr.gate.dao.UserDao;
import com.ocr.gate.service.UserService;

/**
 * 与User数据持久层直接交互的业务层接口
 * @author 滕云飞
 * @date 2019年3月6日
 * @version ocr1.0.1
 */
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void addUser(User user) {
		//获取生日的年份和当前时间的年份
		int year=user.getBirthday().getYear();
		int currYear=(new Date()).getYear();
		int userAge=currYear-year;
		if(userAge>0 && (new Date()).getMonth()-user.getBirthday().getMonth()<0) {
			userAge--;
		}else if(userAge>0 && (new Date()).getMonth()-user.getBirthday().getMonth()==0 && (new Date()).getDay()-user.getBirthday().getDay()<0) {
			userAge--;
		}
		//设置用户的年龄
		user.setAge(userAge);
		//将用户的信息插入到用户表中
		userDao.addUser(user);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public User queryByUserAccount(String userAccount) {
		return userDao.queryByUserAccount(userAccount);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void updateUser(User user) {
		userDao.updateUser(user);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Integer getIndentification(String userAccount) {
		return userDao.getIndentification(userAccount);
	}

}
