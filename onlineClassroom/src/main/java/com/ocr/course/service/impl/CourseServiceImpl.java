package com.ocr.course.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ocr.common.pojo.Classroom;
import com.ocr.common.pojo.Course;
import com.ocr.common.pojo.CourseDisplay;
import com.ocr.common.pojo.CourseSelect;
import com.ocr.course.classroom.service.ClassroomService;
import com.ocr.course.dao.CourseDao;
import com.ocr.course.service.CourseSelectService;
import com.ocr.course.service.CourseService;
import com.ocr.gate.service.UserService;

/**
 * Course的Service实现类
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
@Service
public class CourseServiceImpl implements CourseService{
	@Autowired
	private CourseDao courseDao;
	@Autowired
	private ClassroomService classroomService;
	@Autowired
	private UserService userService;
	@Autowired
	private CourseSelectService courseSelctService;
	/**
	 * {@inheritDoc}
	 * @throws ParseException 
	 */
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public void save(Course course) throws IllegalArgumentException, ParseException{
		if(course.getCourseName() == null || course.getCourseHours()==null || course.getScore() == null) {
			throw new IllegalArgumentException("课程名/学时/学分不能为空");
		}
		//1.创建课程
		//拼接courseCode
		Integer count = courseDao.getCountByUserAccount(course.getTechAccount());
		String timeStr = Long.toString(new Date().getTime());
		String courseCode= course.getTechAccount() +"-"+timeStr.substring(timeStr.length()-5)+"-"+(count+1);
		course.setCourseCode(courseCode);
		course.setClassroomTotal(1);//默认创建第一门课
		courseDao.save(course);
		//2.默认创建第一门课堂
		classroomService.save(generateDefaultFirstClassroom(course, courseCode));//加入到数据库;
	}

	private Classroom generateDefaultFirstClassroom(Course course, String courseCode) throws ParseException {
		Classroom defaultClassroom = new Classroom();
		defaultClassroom.setClassroomCode(1);
		defaultClassroom.setCourseCode(courseCode);
		defaultClassroom.setClassroomName("《"+course.getCourseName()+"》第一堂课");
		defaultClassroom.setOnlineTechAccount(course.getTechAccount());
		defaultClassroom.setParticipateTotal(0);
		//生成一个时间(默认为一周之后)
		Calendar c = Calendar.getInstance();
		if(course.getStartTime() == null) {
			c.setTime(new Date());
			c.set(Calendar.DATE,c.get(Calendar.DATE)+7);//在原来的日期上加一周
		}else {
			c.setTime(course.getStartTime());
		}
		defaultClassroom.setStartTime(c.getTime());
		c.add(Calendar.MINUTE, 100);//每堂课45分钟，中间休息10分钟，共十分钟
		defaultClassroom.setEndTime(c.getTime());
		defaultClassroom.setLengthOfTime(100);//100分钟
		return defaultClassroom;
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Course course) {
		courseDao.update(course);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public Course getByCourseCode(String courseCode) {
		return courseDao.getByCourseCode(courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public void delete(String courseCode) {
		if(courseCode == null) {
			return;
		}
		//如果有学生选了这堂课，需要删除选课表内容（或者不能删除）
		courseSelctService.deleteAllByCourseCode(courseCode);
		//首先需要删除相应的课堂信息
		classroomService.deleteAllRelateCourse(courseCode);
		//删除课程
		courseDao.delete(courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<Course> getAllCourse(String userAccount) {
		Integer indentification_code = userService.getIndentification(userAccount);
		if(indentification_code==null || indentification_code<0 || indentification_code>3) {
			return null;
		}
		List<Course> courseList = new ArrayList<>();
		//如果为老师或者管理员，则从课程表里面去找
		if(indentification_code>=2) {
			courseList = courseDao.getAllCourseByUserAccount(userAccount);
		}else {
			//如果为学生及普通成员，则从选课表里面去找，然后通过课程代码来获取课程列表
			List<CourseSelect> courseSelectList = courseSelctService.getAllByStudentAccount(userAccount);
			List<String> courseCodeList = new ArrayList<>();
			for (CourseSelect courseSelect : courseSelectList) {
				courseCodeList.add(courseSelect.getCourseCode());
			}
			if(courseCodeList.isEmpty()) {
				return null;
			}
			courseList = courseDao.getCourseListByCodeList(courseCodeList);
		}
		for (Course course : courseList) {
			course.setClassroomMaxCode(classroomService.getMaxClassroomCodeOfCourse(course.getCourseCode()));
		}
		return courseList;
	}

	public List<CourseDisplay> getAllCourseDisplayList(String userAccount) {
		Integer indentification_code = userService.getIndentification(userAccount);
		if(indentification_code == null || indentification_code<0 || indentification_code>3) {
			return null;
		}
		if(indentification_code>=2) {//老师及管理员
			List<Course> allCourse = courseDao.getAllCourseByUserAccount(userAccount);
			List<CourseDisplay> courseDisplayList = new ArrayList<>();
			for (Course course : allCourse) {
				CourseDisplay courseDisplay = new CourseDisplay();
				courseDisplay.setCourseCode(course.getCourseCode());
				courseDisplay.setCourseName(course.getCourseName());
				courseDisplay.setTechAccount(course.getTechAccount());
				courseDisplay.setCourseHours(course.getCourseHours());
				courseDisplay.setTypes(course.getTypes());
				courseDisplay.setScore(course.getScore());
				courseDisplay.setStartTime(course.getStartTime());
				courseDisplay.setClassroomMaxCode(classroomService.getMaxClassroomCodeOfCourse(course.getCourseCode()));
				courseDisplay.setIntroduction(course.getIntroduction());
				courseDisplay.setTeacherName(userService.queryByUserAccount(course.getTechAccount()).getName());
				courseDisplayList.add(courseDisplay);
			}
			return courseDisplayList;
		}else {//学生及普通成员
			List<Course> allCourse2 = courseDao.getAllCourse();
			//已选课程的列表
			List<CourseSelect> courseSelectList = courseSelctService.getAllByStudentAccount(userAccount);
			List<String> courseCodeList = new ArrayList<>();
			for (CourseSelect courseSelect : courseSelectList) {
				courseCodeList.add(courseSelect.getCourseCode());
			}
			//比对与封装
			List<CourseDisplay> courseDisplayList = new ArrayList<>();
			for (Course course : allCourse2) {
				CourseDisplay courseDisplay = new CourseDisplay();
				courseDisplay.setCourseCode(course.getCourseCode());
				courseDisplay.setCourseName(course.getCourseName());
				courseDisplay.setTechAccount(course.getTechAccount());
				courseDisplay.setCourseHours(course.getCourseHours());
				courseDisplay.setTypes(course.getTypes());
				courseDisplay.setScore(course.getScore());
				courseDisplay.setStartTime(course.getStartTime());
				courseDisplay.setClassroomMaxCode(classroomService.getMaxClassroomCodeOfCourse(course.getCourseCode()));
				courseDisplay.setIntroduction(course.getIntroduction());
				if(courseCodeList.contains(course.getCourseCode())) {
					courseDisplay.setSelectStatus(true);
				}else {
					courseDisplay.setSelectStatus(false);
				}
				courseDisplay.setTeacherName(userService.queryByUserAccount(course.getTechAccount()).getName());
				courseDisplayList.add(courseDisplay);
			}
			return courseDisplayList;
		}
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void plusSelectTotal(String courseCode) {
		courseDao.plusSelectTotal(courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void subSelectTotal(String courseCode) {
		courseDao.subSelectTotal(courseCode);
	}

	@Override
	public void plusClassroomTotal(String courseCode) {
		courseDao.plusClassroomTotal(courseCode);
	}

	@Override
	public void subClassroomTotal(String courseCode) {
		courseDao.subClassroomTotal(courseCode);
	}

	@Override
	public Integer getClassroomTotalByCourseCode(String courseCode) {
		return courseDao.getClassroomTotalByCourseCode(courseCode);
	}
}