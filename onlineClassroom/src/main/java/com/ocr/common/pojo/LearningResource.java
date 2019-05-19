package com.ocr.common.pojo;

import java.util.Date;

/**
 * 学习资源信息实体类
 * @author 滕云飞
 * @date 2019年5月17日
 * @version ocr1.0.1
 */
public class LearningResource {
	private String sourceId;//资料的ID
	private String courseCode;// 资料所属课程代码
	private Integer classroomCode;// 资料所属课堂代码
	private String fileId;// 资料ID
	private Date uploadTime;//上传日期
	private String uploadAccount;//上传人
	private String resourceName;//资料名 
	private String resourceIntroduction;//资料介绍
	/**
	 * 允许上传的类型
	 * PDF .pdf
	 * Word .doc/.docx
	 * PPT  .ppt/.pptx
	 * Excel .xls/.xlsx
	 * TEXT .txt
	 * 压缩文件	.rar/.zip
	 */
	private String resourceType;//资料类型
	private Long fileSize;//文件大小
	
	public Date getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}
	public String getSourceId() {
		return sourceId;
	}
	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}
	public String getCourseCode() {
		return courseCode;
	}
	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}
	public Integer getClassroomCode() {
		return classroomCode;
	}
	public void setClassroomCode(Integer classroomCode) {
		this.classroomCode = classroomCode;
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public String getUploadAccount() {
		return uploadAccount;
	}
	public void setUploadAccount(String uploadAccount) {
		this.uploadAccount = uploadAccount;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getResourceIntroduction() {
		return resourceIntroduction;
	}
	public void setResourceIntroduction(String resourceIntroduction) {
		this.resourceIntroduction = resourceIntroduction;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
}
