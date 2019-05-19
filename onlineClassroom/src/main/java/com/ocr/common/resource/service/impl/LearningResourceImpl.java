package com.ocr.common.resource.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ocr.common.pojo.LearningResource;
import com.ocr.common.pojo.User;
import com.ocr.common.resource.dao.LearningResourceDao;
import com.ocr.common.resource.service.LearningResourceService;
import com.ocr.common.resultEntity.AjaxResult;

/**
 * 学习资源Service实现类
 * @author 滕云飞
 * @date 2019年5月17日
 * @version ocr1.0.1
 */
@Service
public class LearningResourceImpl implements LearningResourceService{
	@Autowired
	private LearningResourceDao learningResourceDao; 
	@Autowired
	private GridFsTemplate  gridFsTemplate;
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void save(LearningResource learningResource) {
		learningResourceDao.save(learningResource);
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	public LearningResource get(Integer sourceId) {
		return learningResourceDao.get(sourceId);
	}
	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<LearningResource> getAll(String courseCode, Integer classroomCode) {
		return learningResourceDao.getAll(courseCode, classroomCode);
	}
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public AjaxResult sourceDelete(Integer sourceId,User user) {
		LearningResource learningResource = learningResourceDao.get(sourceId);
		if(learningResource.getUploadAccount()==null) {
			return AjaxResult.error("删除出错，该资料上传人账号为空");
		}
		if(!(learningResource.getUploadAccount().equals(user.getUserAccount())) && user.getIdentificationCode() !=3) {
			return AjaxResult.error("您不具有删除该条资料的权限，只有上传人或者管理员才可以删除");
		}
		//删除
		//1）删除资料信息
		learningResourceDao.delete(sourceId);
		//2）删除资料
		Query query = Query.query(Criteria.where("_id").is(learningResource.getFileId()));
		gridFsTemplate.delete(query);
		return AjaxResult.oK();
	}
	
}
