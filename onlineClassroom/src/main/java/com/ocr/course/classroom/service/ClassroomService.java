package com.ocr.course.classroom.service;

import java.util.List;
import java.util.Map;

import com.ocr.common.pojo.Classroom;

/**
 * classroom的Service接口
 * @author 滕云飞
 * @date 2019年4月20日
 * @version ocr1.0.1
 */
public interface ClassroomService {
	/**
	 * 新增课堂
	 * @param classroom 课堂对象
	 */
	void save(Classroom classroom);
	/**
	 * 修改课堂
	 * @param classroom 课堂对象
	 */
	void update(Classroom classroom);
	/**
	 * 通过课堂代码和课程代码获取课堂信息
	 * @param classroomCode 课堂代码
	 * @param courseCode 课程代码
	 * @return 课堂信息
	 */
	Classroom getByClassroomAndCourseCode(String classroomCode,String courseCode);
	/**
	 * 根据课堂代码删除课堂信息
	 * @param classroomCode 课堂代码
	 * @param courseCode 课程代码
	 */
	void delete(String classroomCode,String courseCode);
	/**
	 * 根据课程代码删掉相应的课堂
	 * @param courseCode 课程代码
	 */
	void deleteAllRelateCourse(String courseCode);
	/**
	 * 获取简单的课堂列表信息（摘要）
	 * @param courseCode 课程代码
	 * @return 课程的课堂摘要信息
	 */
	List<Map<String,String>> getSimpleClassroomByCourseCode(String courseCode);
	/**
	 * 根据课程代码获取课堂代码中最大的那个代码
	 * @param courseCode 课程代码
	 * @return 课堂代码
	 */
	Integer getMaxClassroomCodeOfCourse(String courseCode);
}
