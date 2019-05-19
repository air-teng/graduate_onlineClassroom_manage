package com.ocr.course.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocr.common.pojo.CourseSelect;
import com.ocr.common.resultEntity.AjaxResult;
import com.ocr.course.service.CourseSelectService;

/**
 * 选课的Controller层
 * @author 滕云飞
 * @date 2019年4月23日
 * @version ocr1.0.1
 */
@Controller
@RequestMapping("/user/{userAccount}/course/")
public class CourseSelectController {
	@Autowired
	private CourseSelectService courseSelectService; 
	
	@RequestMapping("selectCourse")
	@ResponseBody
	public AjaxResult selectCourse(String userAccount,String courseCode,Float score) {
		CourseSelect courseSelect = new CourseSelect();
		courseSelect.setStudentAccount(userAccount);
		courseSelect.setCourseCode(courseCode);
		courseSelect.setScore(score);
		courseSelectService.add(courseSelect);
		return AjaxResult.oK();
	}
	@RequestMapping("notSelectCourse")
	@ResponseBody
	public AjaxResult notSelectCourse(String userAccount,String courseCode) {
		CourseSelect courseSelect = new CourseSelect();
		courseSelect.setStudentAccount(userAccount);
		courseSelect.setCourseCode(courseCode);
		courseSelectService.delete(courseSelect);
		return AjaxResult.oK();
	}
}
