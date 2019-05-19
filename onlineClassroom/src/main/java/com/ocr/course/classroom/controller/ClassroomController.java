package com.ocr.course.classroom.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocr.common.pojo.Classroom;
import com.ocr.common.resultEntity.AjaxResult;
import com.ocr.course.classroom.service.ClassroomService;
import com.ocr.gate.service.UserService;

/**
 * 课堂管理Controller层
 * @author 滕云飞
 * @date 2019年4月19日
 * @version ocr1.0.1
 */
@Controller
@RequestMapping("/user/{userAccount}/course/{courseCode}/classroom/")
public class ClassroomController {
	@Autowired
	private ClassroomService classroomService;
	@Autowired
	private UserService userService;
	
	@RequestMapping("{classroomCode}")
	public String classroomManage(String classroomCode) {
		return "classroom-onLine";
	}
	
	@RequestMapping("{classroomCode}/{pageName}")
	public String getClassroomPages(@PathVariable("pageName")String pageName,HttpServletRequest request) {
		if("login".equals(pageName)) {
			request.getSession().removeAttribute("userPermission");//移除
			return "redirect:/";//跳转到首页
		}
		return "classroom-"+pageName;
	}
	
	@RequestMapping("getByClassroomAndCourseCode")
	@ResponseBody
	public AjaxResult getByClassroomAndCourseCode(HttpServletRequest request,String classroomCode) {
		String courseCode = request.getServletPath().split("/")[4];
		Classroom classroom = classroomService.getByClassroomAndCourseCode(classroomCode, courseCode);
		return AjaxResult.oK(classroom);
	}
	
	@RequestMapping("getSimpleClassroomByCourseCode")
	@ResponseBody
	public AjaxResult getSimpleClassroomByCourseCode(HttpServletRequest request) {
		String courseCode = request.getServletPath().split("/")[4];
		List<Map<String,String>> list = classroomService.getSimpleClassroomByCourseCode(courseCode);
		return AjaxResult.oK(list);
	}
	
	@RequestMapping("add")
	@ResponseBody
	public AjaxResult add(Classroom classroom) {
		//判断该堂课责任的账号是否具有老师的权限
		Integer indentificationCode = userService.getIndentification(classroom.getOnlineTechAccount());
		if(indentificationCode == null || indentificationCode <2) {
			return AjaxResult.error("授课人账号不存在或者权限不够");
		}
		classroomService.save(classroom);
		return AjaxResult.oK();
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public AjaxResult delete(String classroomCode,HttpServletRequest request) {
		String courseCode = request.getServletPath().split("/")[4];
		classroomService.delete(classroomCode,courseCode);
		return AjaxResult.oK();
	}
	
	@RequestMapping("update")
	@ResponseBody
	public AjaxResult update(Classroom classroom,HttpServletRequest request) {
		String courseCode = request.getServletPath().split("/")[4];
		classroom.setCourseCode(courseCode);
		
		classroomService.update(classroom);
		return AjaxResult.oK();
	}
}
