package com.ocr.common.pojo;

import java.util.Date;

/**
 * 课堂实体类
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
public class Classroom {
	private String courseCode;//课程代码
	private Integer classroomCode;//课堂代码(序号)
	private String courseName;//课程名称
	private String classroomName;//课堂名称（可不写，默认为课程名称)
	private Date startTime;//开始时间
	private Date endTime;//结束时间
	private Integer lengthOfTime;//课堂时长
	private String onlineTechAccount;//实际上课老师的账号
	private Integer participateTotal;//参与人数
	private String classroomIntroduction;//课堂介绍
	public String getCourseCode() {
		return courseCode;
	}
	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}
	public Integer getClassroomCode() {
		return classroomCode;
	}
	public void setClassroomCode(Integer classroomCode) {
		this.classroomCode = classroomCode;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Integer getLengthOfTime() {
		return lengthOfTime;
	}
	public void setLengthOfTime(Integer lengthOfTime) {
		this.lengthOfTime = lengthOfTime;
	}
	public String getOnlineTechAccount() {
		return onlineTechAccount;
	}
	public void setOnlineTechAccount(String onlineTechAccount) {
		this.onlineTechAccount = onlineTechAccount;
	}
	public Integer getParticipateTotal() {
		return participateTotal;
	}
	public void setParticipateTotal(Integer participateTotal) {
		this.participateTotal = participateTotal;
	}
	public String getClassroomName() {
		return classroomName;
	}
	public void setClassroomName(String classroomName) {
		this.classroomName = classroomName;
	}
	public String getClassroomIntroduction() {
		return classroomIntroduction;
	}
	public void setClassroomIntroduction(String classroomIntroduction) {
		this.classroomIntroduction = classroomIntroduction;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
}
