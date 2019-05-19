package com.ocr.common.resource.service;

import java.util.List;

import com.ocr.common.pojo.LearningResource;
import com.ocr.common.pojo.User;
import com.ocr.common.resultEntity.AjaxResult;

/**
 * 学习资源Service层
 * @author 滕云飞
 * @date 2019年5月17日
 * @version ocr1.0.1
 */
public interface LearningResourceService {
	
	/**
	 * 保存学习资源信息
	 * @param learningResource 学习资源信息
	 */
	void save(LearningResource learningResource);
	
	/**
	 * 根据学习资源ID获取学习资源信息 
	 * @param sourceId  学习资源ID
	 * @return	学习资源信息
	 */
	LearningResource get(Integer sourceId);
	/**
	 * 根据courseCode和classroomCode获取相应的资料信息
	 * @param courseCode	课程代码
	 * @param classroomCode	课堂代码
	 * @return	资料信息集合
	 */
	List<LearningResource> getAll(String courseCode,Integer classroomCode);
	
	/**
	 * 根据资源ID删除资源信息及资源
	 * @param sourceId 资源ID
	 * @param user 用户信息
	 * @Return AjaxResult形式的返回值
	 */
	AjaxResult sourceDelete(Integer sourceId,User user);


}
