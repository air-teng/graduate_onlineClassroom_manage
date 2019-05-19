package com.ocr.common.pojo;
/**
 * 展现在前端的课程对象
 * @author 滕云飞
 * @date 2019年4月22日
 * @version ocr1.0.1
 */
public class CourseDisplay extends Course{
	private String teacherName;//任课老师名字
	private Boolean selectStatus;//选课的状态（学生）
	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public Boolean getSelectStatus() {
		return selectStatus;
	}

	public void setSelectStatus(Boolean selectStatus) {
		this.selectStatus = selectStatus;
	}
}
