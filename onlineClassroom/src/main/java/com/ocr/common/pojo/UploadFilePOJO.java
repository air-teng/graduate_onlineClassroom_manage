package com.ocr.common.pojo;

import java.io.Serializable;

/**
 * 文件上传实体类
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
public class UploadFilePOJO implements Serializable{
	/**
	 *
	 */
	private static final long serialVersionUID = 2498819878109378201L;
	
	/**
	 * 用户账号
	 */
	private String userAccount;
	/**
	 * 域ID
	 */
	private String fieldId;

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getFieldId() {
		return fieldId;
	}

	public void setFieldId(String fieldId) {
		this.fieldId = fieldId;
	}
}