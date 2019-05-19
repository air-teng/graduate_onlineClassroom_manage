package com.ocr.course.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocr.common.pojo.CourseSelect;
import com.ocr.course.dao.CourseSelectDao;
import com.ocr.course.service.CourseSelectService;
import com.ocr.course.service.CourseService;

/**
 * 选课Service的实现类
 * @author 滕云飞
 * @date 2019年4月23日
 * @version ocr1.0.1
 */
@Service
public class CourseSelectServiceImpl implements CourseSelectService {
	@Autowired
	private CourseSelectDao courseSelectDao;
	@Autowired
	private CourseService courseService;
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void add(CourseSelect courseSelect) {
		courseService.plusSelectTotal(courseSelect.getCourseCode());
		courseSelectDao.add(courseSelect);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void delete(CourseSelect courseSelect) {
		courseService.subSelectTotal(courseSelect.getCourseCode());
		courseSelectDao.delete(courseSelect);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(CourseSelect courseSelect) {
		courseSelectDao.update(courseSelect);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public CourseSelect get(CourseSelect courseSelect) {
		return courseSelectDao.get(courseSelect);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<CourseSelect> getAllByStudentAccount(String studentAccount) {
		return courseSelectDao.getAllByStudentAccount(studentAccount);
	}

	@Override
	public void deleteAllByCourseCode(String courseCode) {
		courseSelectDao.deleteAllByCourseCode(courseCode);
	}

}
