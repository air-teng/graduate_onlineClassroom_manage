package com.ocr.test;

import org.junit.Test;
import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

//import com.ocr.info.service.UploadUserAvatarService;

/**
 * 测试
 * @author 滕云飞
 * @date 2019年4月17日
 * @version ocr1.0.1
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:application.yml")
public class MyTest extends AbstractJUnit4SpringContextTests{
//	@Autowired
//	private UploadUserAvatarService uploadUserAvatarService; 
	
	@Test
	public void atest() {
		System.out.println("operation start...");
		System.out.println("operation end!");
	}
}
