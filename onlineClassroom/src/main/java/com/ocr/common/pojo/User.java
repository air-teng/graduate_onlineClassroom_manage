package com.ocr.common.pojo;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 用户类（所有用户的父类）
 * @author 滕云飞
 * @date 2019年3月6日
 * @version ocr1.0.1
 */
public class User {
	/**
	 * 账号
	 */
	@NotNull
	@Size(min=6,max=20,message="账号长度应当在6到20之间")
	private String userAccount;
	/**
	 * 用户姓名
	 */
	@NotNull
	@Size(min=2,message="姓名长度应当大于2")
	private String name;
	/**
	 * 用户性别
	 */
	private String sex;
	/**
	 * 用户生日
	 * 注册时，只需要用户选择生日日期
	 */
	@NotNull(message="生日不能为空")
	@Past(message="生日必须是一个已经过去的日期")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date birthday;
	/**
	 * 用户年龄，系统通过生日日期计算年龄
	 */
	private Integer age;
	/**
	 * 用户密码：保存在数据库的密码需经过加密处理
	 */
	@Pattern(regexp="(\\w){8,25}",message="密码应当在8到25位之间")
	private String password;
	/**
	 * 用户头像
	 * 存路径，多张图片路径中间用“,”分隔
	 */
	private String avatar;
	/**
	 * 个人签名
	 */
	private String personalBio;
	/**
	 * 用户标识码：
	 * 0-普通用户
	 * 1-学生
	 * 2-老师
	 * 3-管理员
	 * 具有多个身份时，字符串中用“,"进行连接，如“0,1”等
	 */
	public Integer identificationCode = 0;//默认为0
	
	/**
	 * 注册时间
	 */
	private Date dateTime;

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getIdentificationCode() {
		return identificationCode;
	}

	public void setIdentificationCode(Integer identificationCode) {
		this.identificationCode = identificationCode;
	}
	
	
	public String getPersonalBio() {
		return personalBio;
	}

	public void setPersonalBio(String personalBio) {
		this.personalBio = personalBio;
	}
	
	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	@Override
	public String toString() {
		return "User [userAccount=" + userAccount + ", name=" + name + ", sex=" + sex + ", birthday=" + birthday
				+ ", age=" + age + ", password=" + password + ", avatar=" + avatar + ", personalBio=" + personalBio
				+ ", identificationCode=" + identificationCode + "]";
	}
}
