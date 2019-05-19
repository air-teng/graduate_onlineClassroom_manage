package com.ocr.info.dao;

import com.ocr.common.pojo.UploadFilePOJO;

/**
 * 文件上传对象的Dao
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
public interface UploadFilePOJODao {
	void save(UploadFilePOJO uploadFilePOJO);
	void update(UploadFilePOJO uploadFilePOJO);
	UploadFilePOJO get(String userAccount);
}
