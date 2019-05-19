package com.ocr.course.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.ocr.common.fileUpAndDown.UploadFileTool;
import com.ocr.common.pojo.Course;
import com.ocr.common.pojo.CourseDisplay;
import com.ocr.common.pojo.LearningResource;
import com.ocr.common.pojo.User;
import com.ocr.common.resource.service.LearningResourceService;
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
	@Autowired
	private UploadFileTool uploadFileTool;
	@Autowired
	private LearningResourceService learningResourceService;
	@Autowired
	private GridFsTemplate  gridFsTemplate;
	
	@RequestMapping(value="{pageName}",method = RequestMethod.GET)
	public String navicatOpen(@PathVariable("pageName") String pageName) {
		return "course-"+pageName;
	}
	
	@RequestMapping(value="changeCourseSession",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult changeCourseSession(String courseCode,HttpSession session) {
		session.setAttribute("courseCode", courseCode);
		return AjaxResult.oK();
	}
	
	@RequestMapping(value="{courseCode}/{pageName}",method = RequestMethod.GET)
	public String navicatOpen2(@PathVariable("pageName") String pageName) {
		return "course-"+pageName;
	}
	
	@RequestMapping(value="{courseCode}/sourceUpload",method = RequestMethod.POST)
	@ResponseBody
	public AjaxResult sourceUpload(@PathVariable("courseCode") String courseCode,String resourceIntroduction,HttpServletRequest request) {
		//获取用户信息
		User user = (User) request.getSession().getAttribute("userPermission");
		if(user==null) {
			return AjaxResult.error("账户登录已经失效，请重新登录!");
		}else {
			try {
				Part part = request.getPart("learningResource");
				if("ILLEGAL_FILE".equals(UploadFileTool.fileType(part.getSubmittedFileName()))) {
					return AjaxResult.error("只能上传[PDF]/[Word]/[PPT]/[Excel]/[TEXT文本]/[ZIP|RAR压缩]/[.png|.jpg|.gif|.jpeg图片]文件");
				}
				GridFSFile store = uploadFileTool.uploadFile("learningResource", request);

				LearningResource learningResource = new LearningResource();
				learningResource.setCourseCode(courseCode);
				learningResource.setFileId(store.getId().toString());
				learningResource.setClassroomCode(-1);
				learningResource.setUploadAccount(user.getUserAccount());
				learningResource.setResourceIntroduction(resourceIntroduction);
				learningResource.setResourceName(store.getFilename());
				learningResource.setResourceType(UploadFileTool.fileType(store.getFilename()));
				learningResource.setFileSize(store.getLength());
				learningResourceService.save(learningResource);
				
				return AjaxResult.oK();
			} catch (IOException e) {
				return AjaxResult.error(e.getMessage());
//				e.printStackTrace();
			} catch (ServletException e) {
				return AjaxResult.error(e.getMessage());
//				e.printStackTrace();
			}
		}
//		return AjaxResult.error("上传失败");
	}
	
	@RequestMapping(value="{courseCode}/sourceDelete",method = RequestMethod.POST)
	@ResponseBody
	public AjaxResult sourceDelete(Integer sourceId,HttpServletRequest request) {
		//获取用户信息
		User user = (User) request.getSession().getAttribute("userPermission");
		if(user==null) {
			return AjaxResult.error("账户登录已经失效，请重新登录!");
		}else {
			return	learningResourceService.sourceDelete(sourceId,user);
		}
	}
	@RequestMapping(value="{courseCode}/sourceDownload")
	public void sourceDownload(Integer sourceId,HttpServletRequest request,HttpServletResponse response) throws IOException {
		//获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userPermission");

		if(user == null) {
			return ;
		}		
		
		LearningResource LearningResource = learningResourceService.get(sourceId);
		Query query = new Query(Criteria.where("_id").is(LearningResource.getFileId()));
		//查询单个文件
		GridFSDBFile fileOne = gridFsTemplate.findOne(query);
		
		OutputStream os = response.getOutputStream();
        response.setContentType("img/jpeg");//需要单独进行设置吗？？？
        
        String fileName = fileOne.getFilename().replaceAll(",", "");
		//处理中文文件名乱码
        if (request.getHeader("User-Agent").toUpperCase().contains("MSIE") ||
                request.getHeader("User-Agent").toUpperCase().contains("TRIDENT")
                || request.getHeader("User-Agent").toUpperCase().contains("EDGE")) {
            fileName = java.net.URLEncoder.encode(fileName, "UTF-8");
        } else {
            //非IE浏览器的处理：
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
        }
        response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        
       // 向客户端输出文件
        fileOne.writeTo(os);
        os.flush();
        os.close();
	}
	
	@RequestMapping(value="{courseCode}/getResourceInfo",method = RequestMethod.POST)
	@ResponseBody
	public AjaxResult getResourceInfo(@PathVariable("courseCode")String courseCode) {
		List<LearningResource> list =  learningResourceService.getAll(courseCode, -1);
		return AjaxResult.oK(list);
	}
	
	
	@RequestMapping(value="add",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResult addCourse(Course course) {
		try {
			course.setSelectTotal(0);//设置选课人数
			courseService.save(course);
		} catch (Exception e) {
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
