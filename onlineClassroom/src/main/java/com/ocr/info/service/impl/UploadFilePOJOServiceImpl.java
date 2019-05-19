package com.ocr.info.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ocr.common.fileUpAndDown.UploadFileTool;
import com.ocr.common.pojo.UploadFilePOJO;
import com.ocr.info.dao.UploadFilePOJODao;
import com.ocr.info.service.UploadFilePOJOService;

/**
 * 文件上传Service的实现类
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
@Service
public class UploadFilePOJOServiceImpl implements UploadFilePOJOService{
	@Autowired
	private UploadFilePOJODao uploadFilePOJODao;
	@Autowired
	private UploadFileTool uploadFileTool;
	@Override
	public void save(UploadFilePOJO uploadFilePOJO) {
		UploadFilePOJO pojo = uploadFilePOJODao.get(uploadFilePOJO.getUserAccount());
		if(pojo != null) {
			//1.图片以,的方式连接起来，每次只取最后一张图片
			//2.只保留最多三张图片
			String ids=pojo.getFieldId();
			String[] histroyIds = pojo.getFieldId().split(",");
			if(histroyIds.length>=3) {
				for(int i=0;i<histroyIds.length-2;i++) {
					//删除掉其他历史图片
					uploadFileTool.deleteFile(histroyIds[i]);
				}
				ids=histroyIds[histroyIds.length-1]+","+histroyIds[histroyIds.length-2];
			}
			uploadFilePOJO.setFieldId(ids+","+uploadFilePOJO.getFieldId());
			uploadFilePOJODao.update(uploadFilePOJO);
		}else {
			uploadFilePOJODao.save(uploadFilePOJO);
		}
	}

	@Override
	public UploadFilePOJO get(String userAccount) {
		UploadFilePOJO uploadFilePOJO = uploadFilePOJODao.get(userAccount);
		if(uploadFilePOJO ==  null) {
			return null;
		}
		//每次只取最后一张图片
		String[] fieldIds = uploadFilePOJO.getFieldId().split(",");
		uploadFilePOJO.setFieldId(fieldIds[fieldIds.length-1]);
		return uploadFilePOJO;
	}

}
