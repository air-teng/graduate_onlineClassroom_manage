package com.ocr.common.pojo;

/**
 * 选课表
 * @author 滕云飞
 * @date 2019年4月23日
 * @version ocr1.0.1
 */
public class CourseSelect {
	private String courseCode;// 课程代码 
	private String studentAccount;// 学生账号 
	private Float degreeOfficial;// 正考成绩 
	private Float degreeMakeup;// 补考成绩 
	private Float score;// 学分 
	private Float gradePoint;// 绩点
	public String getCourseCode() {
		return courseCode;
	}
	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}
	public String getStudentAccount() {
		return studentAccount;
	}
	public void setStudentAccount(String studentAccount) {
		this.studentAccount = studentAccount;
	}
	public Float getDegreeOfficial() {
		return degreeOfficial;
	}
	public void setDegreeOfficial(Float degreeOfficial) {
		this.degreeOfficial = degreeOfficial;
	}
	public Float getDegreeMakeup() {
		return degreeMakeup;
	}
	public void setDegreeMakeup(Float degreeMakeup) {
		this.degreeMakeup = degreeMakeup;
	}
	public Float getScore() {
		return score;
	}
	public void setScore(Float score) {
		this.score = score;
	}
	public Float getGradePoint() {
		return gradePoint;
	}
	public void setGradePoint(Float gradePoint) {
		this.gradePoint = gradePoint;
	}
}
