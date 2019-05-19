package com.ocr.common.pojo;

import java.util.Date;

/**
 * 课程考试类
 * @author 滕云飞
 * @date 2019年4月22日
 * @version ocr1.0.1
 */
public class CourseExamination {
	private String examCode;//考试代码
	private String courseCode;//课程代码
	private Integer attendTotal;//参与人数
	private Date beginExamTime;//考试开始时间
	private Date endExamTime;//考试结束时间
	private Integer timeTotal;//考试时长（分钟为单位）
	public String getExamCode() {
		return examCode;
	}
	public void setExamCode(String examCode) {
		this.examCode = examCode;
	}
	public String getCourseCode() {
		return courseCode;
	}
	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}
	public Integer getAttendTotal() {
		return attendTotal;
	}
	public void setAttendTotal(Integer attendTotal) {
		this.attendTotal = attendTotal;
	}
	public Date getBeginExamTime() {
		return beginExamTime;
	}
	public void setBeginExamTime(Date beginExamTime) {
		this.beginExamTime = beginExamTime;
	}
	public Date getEndExamTime() {
		return endExamTime;
	}
	public void setEndExamTime(Date endExamTime) {
		this.endExamTime = endExamTime;
	}
	public Integer getTimeTotal() {
		return timeTotal;
	}
	public void setTimeTotal(Integer timeTotal) {
		this.timeTotal = timeTotal;
	}
}
