package com.ocr.course.service;

import java.util.List;

import com.ocr.common.pojo.CourseSelect;

/**
 * 选课Service层
 * @author 滕云飞
 * @date 2019年4月23日
 * @version ocr1.0.1
 */
public interface CourseSelectService {
	/**
	 * 添加选课信息
	 * @param courseSelect 选课信息
	 */
	void add(CourseSelect courseSelect);
	/**
	 * 删除选课信息
	 * @param courseSelect 选课信息
	 */
	void delete(CourseSelect courseSelect);
	/**
	 * 修改选课表内容（主要指修改成绩，学分绩点等内容，由老师来操作）
	 * @param courseSelect
	 */
	void update(CourseSelect courseSelect);
	/**
	 * 获取一条选课信息
	 * @param courseSelect 选课信息
	 * @return 一条选课信息
	 */
	CourseSelect get(CourseSelect courseSelect);
	/**
	 * 获取某个学生的所有选课信息
	 * @param studentAccount 学生账号
	 * @return 选课信息列表
	 */
	List<CourseSelect> getAllByStudentAccount(String studentAccount);
	/**
	 * 删除与该课堂相关的所有选课信息
	 * @param courseCode 课程代码
	 */
	void deleteAllByCourseCode(String courseCode);
}
