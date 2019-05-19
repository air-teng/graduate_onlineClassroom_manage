package com.ocr.course.classroom.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ocr.common.pojo.Classroom;

/**
 * 课堂Dao层
 * @author 滕云飞
 * @date 2019年4月20日
 * @version ocr1.0.1
 */
public interface ClassroomDao {
	/**
	 * 新增课堂
	 * @param classroom 课堂对象
	 */
	void save(Classroom classroom);
	/**
	 * 修改课堂(不能修改课程代码，课程代码与课堂一直是绑定的)
	 * @param classroom 课堂对象
	 */
	void update(Classroom classroom);
	/**
	 * 通过课堂代码和课程代码获取课堂信息
	 * @param classroomCode 课堂代码
	 * @param courseCode 课程代码
	 * @return 课堂信息
	 */
	Classroom getByClassroomAndCourseCode(@Param("classroomCode")String classroomCode,@Param("courseCode")String courseCode);
	/**
	 * 根据课堂代码删除课堂信息
	 * @param classroomCode 课堂代码
	 */
	void delete(@Param("classroomCode")String classroomCode,@Param("courseCode")String courseCode);
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

