package com.ocr.course.classroom.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ocr.common.DateUtil.DateUtilDeal;
import com.ocr.common.pojo.Classroom;
import com.ocr.course.classroom.dao.ClassroomDao;
import com.ocr.course.classroom.service.ClassroomService;
import com.ocr.course.service.CourseService;

/**
 * classroom的Service接口的实现类
 * @author 滕云飞
 * @date 2019年4月20日
 * @version ocr1.0.1
 */
@Service
public class ClassroomServiceImpl implements ClassroomService {
	@Autowired
	private ClassroomDao classroomDao;
	@Autowired
	private CourseService courseService;
	/**
	 * {@inheritDoc}
	 */
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public void save(Classroom classroom) {
		//参数处理
		Integer maxClassroomCode = classroomDao.getMaxClassroomCodeOfCourse(classroom.getCourseCode());
		if(maxClassroomCode == null) {
			maxClassroomCode = 0;
		}
		classroom.setClassroomCode(maxClassroomCode+1);
		classroom.setParticipateTotal(0);
		String disStr = DateUtilDeal.getDatePoor(classroom.getEndTime(),classroom.getStartTime());
		classroom.setLengthOfTime(Integer.parseInt(disStr.split("-")[1])*60+Integer.parseInt(disStr.split("-")[2]));
		//课程的总课堂数增1
		courseService.plusClassroomTotal(classroom.getCourseCode());
		//保存到课堂数据库表格中
		classroomDao.save(classroom);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Classroom classroom) {
		//参数处理
		if(classroom.getParticipateTotal() == null) {//参与人数
			classroom.setParticipateTotal(0);
		}
		//课程时长
		String disStr = DateUtilDeal.getDatePoor(classroom.getEndTime(),classroom.getStartTime());
		classroom.setLengthOfTime(Integer.parseInt(disStr.split("-")[1])*60+Integer.parseInt(disStr.split("-")[2]));
		classroomDao.update(classroom);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Transactional(propagation = Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public void delete(String classroomCode,String courseCode) {
		//课程的总课堂数减1
		courseService.subClassroomTotal(courseCode);
		//删除课堂
		classroomDao.delete(classroomCode,courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void deleteAllRelateCourse(String courseCode) {
		classroomDao.deleteAllRelateCourse(courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public Classroom getByClassroomAndCourseCode(String classroomCode, String courseCode) {
		return classroomDao.getByClassroomAndCourseCode(classroomCode, courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<Map<String, String>> getSimpleClassroomByCourseCode(String courseCode) {
		return classroomDao.getSimpleClassroomByCourseCode(courseCode);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public Integer getMaxClassroomCodeOfCourse(String courseCode) {
		return classroomDao.getMaxClassroomCodeOfCourse(courseCode);
	}

}
