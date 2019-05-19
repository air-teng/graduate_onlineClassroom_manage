package com.ocr.common.pojo;

import java.util.Date;

/**
 * 课程实体类
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
public class Course {
	private String courseCode;//课程代码
	private String courseName;//课程名称
	private String types;//课程类型(可以有多种类型)
	private String introduction;//课程介绍
	private String techAccount;//课程负责人账号（不一定是上课人，负责人是一个，可以有多个任课老师）
	private String techName;//任课老师名字
	private Float score;//课程学分
	private Float courseHours;//课程学时
	private Float finishedHours;//已经完成的学时
	private Integer classroomTotal;//课堂总数(根据创建的课堂数来确定)
	private Date startTime;//开课时间
	private Integer selectTotal;//选课人数
	private Integer classroomMaxCode;//该课程课堂最大的代码
	public String getCourseCode() {
		return courseCode;
	}
	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getTypes() {
		return types;
	}
	public void setTypes(String types) {
		this.types = types;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public String getTechAccount() {
		return techAccount;
	}
	public void setTechAccount(String techAccount) {
		this.techAccount = techAccount;
	}
	public Float getScore() {
		return score;
	}
	public void setScore(Float score) {
		this.score = score;
	}
	public Float getCourseHours() {
		return courseHours;
	}
	public void setCourseHours(Float courseHours) {
		this.courseHours = courseHours;
	}
	public Integer getClassroomTotal() {
		return classroomTotal;
	}
	public void setClassroomTotal(Integer classroomTotal) {
		this.classroomTotal = classroomTotal;
	}
	public Float getFinishedHours() {
		return finishedHours;
	}
	public void setFinishedHours(Float finishedHours) {
		this.finishedHours = finishedHours;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Integer getSelectTotal() {
		return selectTotal;
	}
	public void setSelectTotal(Integer selectTotal) {
		this.selectTotal = selectTotal;
	}
	public Integer getClassroomMaxCode() {
		return classroomMaxCode;
	}
	public void setClassroomMaxCode(Integer classroomMaxCode) {
		this.classroomMaxCode = classroomMaxCode;
	}
	public String getTechName() {
		return techName;
	}
	public void setTechName(String techName) {
		this.techName = techName;
	}
}
