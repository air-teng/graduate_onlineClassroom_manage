package com.ocr.info.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocr.common.pojo.UploadFilePOJO;

/**
 * 上传用户图片的Service层
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
@RequestMapping("/avatar")
@Controller
public class UploadUserAvatarService {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@RequestMapping("/upload")
	@ResponseBody
	public UploadFilePOJO uploadAvatar(UploadFilePOJO uploadTestPOJO) {
		mongoTemplate.insert(uploadTestPOJO, "ocr_common_user");
		Query query = new Query(Criteria.where("userAccount").is(uploadTestPOJO.getUserAccount()));
		UploadFilePOJO findOne = mongoTemplate.findOne(query , com.ocr.common.pojo.UploadFilePOJO.class, "ocr_common_user");
		System.out.println(findOne);
		return findOne;
	}
	
}
