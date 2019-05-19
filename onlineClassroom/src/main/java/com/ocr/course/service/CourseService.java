package com.ocr.course.service;

import java.text.ParseException;
import java.util.List;

import com.ocr.common.pojo.Course;
import com.ocr.common.pojo.CourseDisplay;

/**
 * Course的Service层
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
public interface CourseService {
	/**
	 * 新增课程
	 * @param course 课程对象
	 */
	void save(Course course) throws IllegalArgumentException, ParseException;
	/**
	 * 修改课程
	 * @param course 课程对象
	 */
	void update(Course course);
	/**
	 * 根据courseCode获取Course信息
	 * @param courseCode 课程代码
	 * @return 课程信息
	 */
	Course getByCourseCode(String courseCode);
	/**
	 * 根据courseCode删除Course信息
	 * @param courseCode
	 */
	void delete(String courseCode);
	
	/**
	 * 根据用户账号获取与其相关的课堂（主页呈现的已选择（学生）的或者（老师）自己创建的课程）
	 * @param userAccount
	 * @return
	 */
	List<Course> getAllCourse(String userAccount);
	/**
	 * 根据账号获取所有的课程信息（学生选课的列表以及老师修改的列表）
	 * @param userAccount
	 * @return
	 */
	List<CourseDisplay> getAllCourseDisplayList(String userAccount);
	/**
	 * 增一该课程的选课人数
	 * @param courseCode 课程代码
	 */
	void plusSelectTotal(String courseCode);
	/**
	 * 减一该课程的选课人数
	 * @param courseCode 课程代码
	 */
	void subSelectTotal(String courseCode);
	/**
	 * 增一该课程的课堂总数
	 * @param courseCode 课程代码
	 */
	void plusClassroomTotal(String courseCode);
	/**
	 * 减一该课程的课堂总数
	 * @param courseCode 课程代码
	 */
	void subClassroomTotal(String courseCode);
	/**
	 * 根据课程代码获取课堂总数
	 * @param courseCode 课程代码
	 * @return 课堂总数
	 */
	Integer getClassroomTotalByCourseCode(String courseCode);
}
