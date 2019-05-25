package com.ocr.course.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocr.common.pojo.Course;
import com.ocr.common.pojo.CourseDisplay;
import com.ocr.common.resultEntity.AjaxResult;
import com.ocr.course.service.CourseService;

/**
 * 课程管理
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
@Controller
@RequestMapping("/user/{userAccount}/course/")
public class CourseController {
	@Autowired
	private CourseService courseService;
	/*@Autowired
	private LearningResourceService learningResourceService;*/
	
	@RequestMapping(value="{pageName}",method = RequestMethod.GET)
	public String navicatOpen(@PathVariable("pageName") String pageName) {
		return "course-"+pageName;
	}
	
	@RequestMapping(value="{courseCode}/{pageName}",method = RequestMethod.GET)
	public String navicatOpen2(@PathVariable("pageName") String pageName) {
		return "course-"+pageName;
	}
	
	@RequestMapping(value="changeCourseSession",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult changeCourseSession(String courseCode,HttpSession session) {
		session.setAttribute("courseName", courseService.getByCourseCode(courseCode).getCourseName());
		session.setAttribute("courseCode", courseCode);
		return AjaxResult.oK();
	}
	
	@RequestMapping(value="add",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult addCourse(Course course) {
		try {
			course.setSelectTotal(0);//设置选课人数
			courseService.save(course);
		} catch (Exception e) {
			e.printStackTrace();
			return AjaxResult.error(e.getMessage());
		}
		return AjaxResult.oK();
	}
	
	@RequestMapping(value="deleteCourse",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult deleteCourse(String courseCode) {
		courseService.delete(courseCode);
		return AjaxResult.oK();
	}
	
	@RequestMapping(value="updateCourse",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult updateCourse(Course course) {
		courseService.update(course);
		return AjaxResult.oK();
	}
	
	@RequestMapping(value="getCourse",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult getCourse(String courseCode) {
		Course course = courseService.getByCourseCode(courseCode);
		return AjaxResult.oK(course);
	}
	@RequestMapping(value="getAllCourse")
	@ResponseBody
	public AjaxResult getAllCourse(String userAccount,HttpSession session){
		List<Course> allCourse = courseService.getAllCourse(userAccount);
		if(allCourse != null) {
			session.setAttribute("courseCode", allCourse.get(0).getCourseCode());
			session.setAttribute("courseName", allCourse.get(0).getCourseName());
		}else {
			session.setAttribute("courseCode", "000000-00000-0");
		}
		return AjaxResult.oK(allCourse);
	}
	
	@RequestMapping(value="getAllCourseList")
	@ResponseBody
	public AjaxResult getCourseDisplayList(String userAccount) 
	{
		List<CourseDisplay> allCourseDisplayList = courseService.getAllCourseDisplayList(userAccount);
		return AjaxResult.oK(allCourseDisplayList);
	}
}
