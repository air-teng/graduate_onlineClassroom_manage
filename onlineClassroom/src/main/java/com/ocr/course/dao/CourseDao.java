package com.ocr.course.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ocr.common.pojo.Course;

/**
 * Course的dao层
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
public interface CourseDao {
	/**
	 * 新增课程
	 * @param course 课程对象
	 */
	void save(Course course);
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
	 * 根据userAccount获取其已创建的课程数
	 * @param userAccount 用户账号
	 * @return 已创建的课程总数
	 */
	Integer getCountByUserAccount(String userAccount);
	/**
	 * 根据用户账号获取课程列表
	 * @param userAccount
	 * @return
	 */
	List<Course> getAllCourseByUserAccount(String userAccount);
	/**
	 * 获取所有的课程信息
	 * @return
	 */
	List<Course> getAllCourse();
	/**
	 * 通过课程code的List集合获取课程的List集合
	 * @param courseCodeList 课程的List集合
	 */
	List<Course> getCourseListByCodeList(@Param("courseCodeList") List<String> courseCodeList);
	/**
	 * 增加该课程的选课人数
	 * @param courseCode 课程代码
	 */
	void plusSelectTotal(String courseCode);
	/**
	 * 减一该课程的选课人数
	 * @param courseCode
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
