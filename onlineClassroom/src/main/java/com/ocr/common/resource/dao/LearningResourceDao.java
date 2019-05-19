package com.ocr.common.resource.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ocr.common.pojo.LearningResource;

/**
 * LearningResource Dao层
 * @author 滕云飞
 * @date 2019年5月17日
 * @version ocr1.0.1
 */
public interface LearningResourceDao {
	
	/**
	 * 保存学习资源信息
	 * @param learningResource 学习资源信息
	 */
	void save(LearningResource learningResource);
	
	/**
	 * 通过sourceId获取学习资源信息
	 * @param sourceId 学习资源信息ID
	 * @return 学习资源信息
	 */
	LearningResource get(Integer sourceId);
	
	/**
	 * 获取某课程或者课程以下课堂的资料信息
	 * @param courseCode 课程代码
	 * @param classroomCode 课堂代码
	 * @return 学习资源列表
	 */
	List<LearningResource> getAll(@Param("courseCode")String courseCode,@Param("classroomCode")Integer classroomCode);
	
	/**
	 * 根据资源ID删除资源信息
	 * @param sourceId 资源ID
	 */
	void delete(Integer sourceId);
}
