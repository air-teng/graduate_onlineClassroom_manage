package com.ocr.common.fileUpAndDown;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Component;

import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;

/**
 * 上传文件的工具类
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
@Component
public class UploadFileTool {
	
	@Autowired
	private GridFsTemplate  gridFsTemplate;
	/**
	 * 文件上传工具方法
	 * @param partName 上传文件的标签name属性
	 * @param request  请求参数
	 * @return GridFSFile对象
	 * @throws IOException 输入输出流异常
	 * @throws ServletException Servlet异常
	 */
	public GridFSFile uploadFile(String partName,HttpServletRequest request) throws IOException, ServletException {
		
		Part part = request.getPart(partName);
		//获得提交的文件名
		String fileName = part.getSubmittedFileName();
		//获得文件输入流
		InputStream inputStream = part.getInputStream();
		//获得文件类型
		String contentType = part.getContentType();
		//将文件存储到mongodb中
		GridFSFile store = gridFsTemplate.store(inputStream,fileName,contentType);
		
		return store;
	}
	
	/**
	 * 获取文件
	 * @param fieldId 文档域id
	 * @param request 请求参数
	 * @return GridFsDBFile的文档
	 * @throws IOException 输入输出流异常
	 */
	public GridFSDBFile getFileOne(String fieldId,HttpServletRequest request) throws IOException {
		Query query = new Query(Criteria.where("_id").is(fieldId));
		//查询单个文件
		GridFSDBFile fileOne = gridFsTemplate.findOne(query);
        return fileOne;
	}
	
	/**
	 * 文件删除
	 * @param fieldId
	 */
	public void deleteFile(String fieldId) {
		Query query = Query.query(Criteria.where("_id").is(fieldId));
		 // 查询单个文件
        GridFSDBFile fileExist = gridFsTemplate.findOne(query);
        if(fileExist == null) {
        	return ;
        }
        gridFsTemplate.delete(query);
	}
	
	/*
	 * 允许资料上传的类型
	 * PDF .pdf
	 * Word .doc/.docx
	 * PPT  .ppt/.pptx
	 * Excel .xls/.xlsx
	 * TEXT .txt
	 * 压缩文件	.rar/.zip
	 * 图片  .jpg/.jpeg/.png/.gif/
	 */
	public static String fileType(String name) {
		if(name == null) {
			return "ILLEGAL_FILE";
		}
		if(name.endsWith(".pdf")) {
			return "PDF";
		}else if(name.toLowerCase().endsWith(".doc")||name.toLowerCase().endsWith(".docx")) {
			return "Word";
		}else if(name.toLowerCase().endsWith(".ppt")||name.toLowerCase().endsWith(".pptx")) {
			return "PPT";
		}else if(name.toLowerCase().endsWith(".xls")||name.toLowerCase().endsWith(".xlsx")) {
			return "Excel";
		}else if(name.toLowerCase().endsWith(".txt")) {
			return "TEXT";
		}else if(name.toLowerCase().endsWith(".rar")) {
			return "RAR";
		}else if(name.toLowerCase().endsWith(".zip")) {
			return "ZIP";
		}else if(name.toLowerCase().endsWith(".jpg")||name.toLowerCase().endsWith(".png")||name.toLowerCase().endsWith(".jpeg")||name.toLowerCase().endsWith(".gif")) {
			return "Picture";
		}else {
			return "ILLEGAL_FILE";
		}
	}
	/**
	 * 设置contentType的方式
	 * @param type 类型
	 * @return
	 */
	public static String contentType(String type) {
		if(type == null) {
			return "application/json";
		}
		switch(type) {
			case "PDF":return "application/pdf";
			case "Word":return "application/msword";
			case "PPT":return "application/vnd.ms-powerpoint";
			case "Excel":return "application/vnd.ms-excel";
			case "TEXT":return "text/plain";
			case "ZIP":return "application/x-zip-compressed";
			case "RAR":return "application/octet-stream";
			case "Picture":return "img/jpeg";//此处一起处理还有是否可行还不知道，img/jpg,img/jpeg,img/png,img/gif
			default:return "application/json";
		}
	}
}
