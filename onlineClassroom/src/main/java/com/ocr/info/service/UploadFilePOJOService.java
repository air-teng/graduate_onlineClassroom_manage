package com.ocr.info.service;

import com.ocr.common.pojo.UploadFilePOJO;

/**
 * 文件上传对象Service
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
public interface UploadFilePOJOService {
	void save(UploadFilePOJO uploadFilePOJO);
	UploadFilePOJO get(String userAccount);
}
