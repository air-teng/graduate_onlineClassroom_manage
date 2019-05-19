package com.ocr.info.controller;

import java.io.IOException;
import java.io.OutputStream;

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
import org.springframework.web.bind.annotation.ResponseBody;

import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.ocr.common.fileUpAndDown.UploadFileTool;
import com.ocr.common.pojo.UploadFilePOJO;
import com.ocr.common.pojo.User;
import com.ocr.common.resultEntity.AjaxResult;
import com.ocr.gate.service.UserService;
import com.ocr.info.service.UploadFilePOJOService;

/**
 * 个人信息及课程管理
 * @author 滕云飞
 * @date 2019年3月31日
 * @version ocr1.0.1
 */
@Controller
@RequestMapping("/user/{account}/info/")
public class InfoIndexController {
	@Autowired
	private UploadFilePOJOService uploadFilePOJOService; 
	@Autowired
	private UploadFileTool uploadFileTool;
	@Autowired
	private GridFsTemplate  gridFsTemplate;
	@Autowired
	private UserService userService;
	
	@RequestMapping("")
	public String infoIndex() {
		return "info";
	}
	
	@RequestMapping("{pageName}")
	public String navicatOpen(@PathVariable("pageName") String pageName) {
		return "info-"+pageName;
	}
	
	/**
	 * 上传头像
	 * @param request 请求
	 * @return Ajax请求的值
	 */
	@RequestMapping("uploadAvatar")
	@ResponseBody
	public AjaxResult uploadAvatar(HttpServletRequest request){
			//获取用户信息
			HttpSession session = request.getSession();
			User user = (User) session.getAttribute("userPermission");
			if(user == null) {
				return AjaxResult.error("账号登录已失效，请重新登录");
			}
			try {
				Part part = request.getPart("userAvatar");
				if(!"Picture".equals(UploadFileTool.fileType(part.getSubmittedFileName()))) {
					return AjaxResult.error("只能上传图片文件");
				}
				GridFSFile store = uploadFileTool.uploadFile("userAvatar", request);
				UploadFilePOJO uploadFilePOJO = new UploadFilePOJO();
				uploadFilePOJO.setFieldId(store.getId().toString());
				uploadFilePOJO.setUserAccount(user.getUserAccount());
				//将域id和userAccount保存在数据库里面，然后通过域id获取下载文件
				uploadFilePOJOService.save(uploadFilePOJO);
			} catch (IOException | ServletException e) {
				return AjaxResult.error(e.getMessage());
			}
			
		return AjaxResult.oK();
	}
	
	@RequestMapping("download")
	public void download(HttpServletRequest request,HttpServletResponse response) throws IOException {
		//获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userPermission");

		if(user == null) {
			return ;
		}		
		
		UploadFilePOJO uploadFilePOJO = uploadFilePOJOService.get(user.getUserAccount());
		Query query = new Query(Criteria.where("_id").is(uploadFilePOJO.getFieldId()));
		//查询单个文件
		GridFSDBFile fileOne = gridFsTemplate.findOne(query);
		
		OutputStream os = response.getOutputStream();
        response.setContentType("image/jpeg");
        
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
	
	@RequestMapping("show")
	public void show(HttpServletRequest request, HttpServletResponse resp){
		//获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userPermission");

		if(user == null) {
			return ;
		}		
				
		try {
			UploadFilePOJO uploadFilePOJO = uploadFilePOJOService.get(user.getUserAccount());
			Query query = new Query(Criteria.where("_id").is(uploadFilePOJO.getFieldId()));
			//查询单个文件
			GridFSDBFile fileOne = gridFsTemplate.findOne(query);
			
			OutputStream out = resp.getOutputStream();
			resp.setContentType("image/png");
			fileOne.writeTo(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping("editInfo")
	@ResponseBody
	public AjaxResult editInfo(User user,HttpServletRequest request) {
		try {
			userService.updateUser(user);
		} catch (Exception e) {
			return AjaxResult.error(e.getMessage());
		}
		/**
		 * 更新session里面的值
		 */
		HttpSession session = request.getSession();
		User updatedUser = userService.queryByUserAccount(user.getUserAccount());
		updatedUser.setPassword(null);
		session.setAttribute("userPermission", updatedUser);
		return AjaxResult.oK();
	}
}
