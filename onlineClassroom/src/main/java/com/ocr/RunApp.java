package com.ocr;

import javax.servlet.MultipartConfigElement;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@MapperScan({"com.ocr.gate.dao","com.ocr.info.dao","com.ocr.course.dao","com.ocr.course.classroom.dao","com.ocr.common.resource.dao"})
public class RunApp {

	public static void main(String[] args) {
		SpringApplication.run(RunApp.class, args);
	}
	
	/**
	 * 配置上传文件大小的配置
	 * @return
	 */
	@Bean
	public MultipartConfigElement multipartConfigElement() {
	   MultipartConfigFactory factory = new MultipartConfigFactory();
	   //  单个数据大小
	   factory.setMaxFileSize("10240KB");//单次上传不能超过10MB
	   /// 总上传数据大小
	   factory.setMaxRequestSize("30960KB");//总的大小不能超过30MB
	   return factory.createMultipartConfig();
	}
}
