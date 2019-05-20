package com.ocr.course.classroom.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.Document;

import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.ocr.common.fileUpAndDown.UploadFileTool;
import com.ocr.common.pojo.LearningResource;
import com.ocr.common.pojo.User;
import com.ocr.common.resource.service.LearningResourceService;
import com.ocr.common.resultEntity.AjaxResult;
/**
 * 课程/课堂资料翻译
 * @author Administrator
 */
@Controller
@RequestMapping("/user/{userAccount}/course/{courseCode}/classroom/")
public class ResourceUploadController {
	@Autowired
	private UploadFileTool uploadFileTool;
	@Autowired
	private GridFsTemplate  gridFsTemplate;
	@Autowired
	private LearningResourceService learningResourceService;
	
	@RequestMapping(value="{classroomCode}/sourceUpload",method = RequestMethod.POST)
	@ResponseBody
	public AjaxResult sourceUpload(@PathVariable("classroomCode") Integer classroomCode,String resourceIntroduction,HttpServletRequest request) {
		String courseCode = request.getServletPath().split("/")[4];
		//获取用户信息
		User user = (User) request.getSession().getAttribute("userPermission");
		if(user==null) {
			return AjaxResult.error("账户登录已经失效，请重新登录!");
		}else {
			try {
				Part part = request.getPart("learningResource");
				if("ILLEGAL_FILE".equals(UploadFileTool.fileType(part.getSubmittedFileName()))) {
					return AjaxResult.error("只能上传[PDF]/[Word]/[PPT]/[Excel]/[TEXT文本]/[ZIP|RAR压缩]/[.png|.jpg|.gif|.jpeg图片]文件");
				}
				GridFSFile store = uploadFileTool.uploadFile("learningResource", request);

				LearningResource learningResource = new LearningResource();
				learningResource.setCourseCode(courseCode);
				learningResource.setFileId(store.getId().toString());
				learningResource.setClassroomCode(classroomCode);
				learningResource.setUploadAccount(user.getUserAccount());
				learningResource.setResourceIntroduction(resourceIntroduction);
				learningResource.setResourceName(store.getFilename());
				learningResource.setResourceType(UploadFileTool.fileType(store.getFilename()));
				learningResource.setFileSize(store.getLength());
				learningResourceService.save(learningResource);
				
				return AjaxResult.oK();
			} catch (IOException e) {
				return AjaxResult.error(e.getMessage());
//				e.printStackTrace();
			} catch (ServletException e) {
				return AjaxResult.error(e.getMessage());
//				e.printStackTrace();
			}
		}
//		return AjaxResult.error("上传失败");
	}
	
	@RequestMapping(value="{classroomCode}/sourceDelete",method = RequestMethod.POST)
	@ResponseBody
	public AjaxResult sourceDelete(Integer sourceId,HttpServletRequest request) {
		//获取用户信息
		User user = (User) request.getSession().getAttribute("userPermission");
		if(user==null) {
			return AjaxResult.error("账户登录已经失效，请重新登录!");
		}else {
			return	learningResourceService.sourceDelete(sourceId,user);
		}
	}
	@RequestMapping(value="{classroomCode}/sourceDownload")
	public void sourceDownload(Integer sourceId,HttpServletRequest request,HttpServletResponse response) throws IOException {
		//获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userPermission");

		if(user == null) {
			return ;
		}		
		
		LearningResource LearningResource = learningResourceService.get(sourceId);
		Query query = new Query(Criteria.where("_id").is(LearningResource.getFileId()));
		//查询单个文件
		GridFSDBFile fileOne = gridFsTemplate.findOne(query);
		
		OutputStream os = response.getOutputStream();
        response.setContentType("img/jpeg");//需要单独进行设置吗？？？
        
        String fileName = fileOne.getFilename().replaceAll(",", "");
		//处理中文文件名乱码
        if (request.getHeader("User-Agent").toUpperCase().contains("MSIE") ||
                request.getHeader("User-Agent").toUpperCase().contains("TRIDENT")
                || request.getHeader("User-Agent").toUpperCase().contains("EDGE")) {
            fileName = java.net.URLEncoder.encode(fileName, "UTF-8");
        } else {
            //非IE浏览器的处理：
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
        }
        response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        
       // 向客户端输出文件
        fileOne.writeTo(os);
        os.flush();
        os.close();
	}
	
	@RequestMapping(value="{classroomCode}/getResourceInfo",method = RequestMethod.POST)
	@ResponseBody
	public AjaxResult getResourceInfo(@PathVariable("classroomCode")Integer classroomCode,HttpServletRequest request) {
		String courseCode = request.getServletPath().split("/")[4];
		List<LearningResource> list =  learningResourceService.getAll(courseCode, classroomCode);
		return AjaxResult.oK(list);
	}
	
	@RequestMapping(value="{classroomCode}/review/reviewResource",method = RequestMethod.GET)
	@ResponseBody
	public void reviewResource(Integer sourceId,String sourceType,HttpServletRequest request,HttpServletResponse response) throws IOException, ParserConfigurationException, TransformerException {
		String path = "F:\\test_data\\";
		 
		//获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userPermission");
		if(user == null) {
			return ;	
		}		
		LearningResource learningResource = learningResourceService.get(sourceId);
		Query query = new Query(Criteria.where("_id").is(learningResource.getFileId()));
		
		File myFile = new File(path+learningResource.getFileId());
		if(!myFile.exists()) {
			myFile.mkdirs();
		}
		path = path+learningResource.getFileId()+"\\";
		
		//查询单个文件
		GridFSDBFile fileOne = gridFsTemplate.findOne(query);
		InputStream inputStream = fileOne.getInputStream();//得到文件的输入流
		String fileName = learningResource.getResourceName();
		File targetFile  = new File(path, fileName.substring(0, fileName.lastIndexOf("."))+".html");
		
		if(targetFile.exists()) {
			  Runtime ce=Runtime.getRuntime();
			  ce.exec("cmd /c start "+targetFile.getAbsolutePath());
			  return ;
		}
//		 InputStream input = new FileInputStream(path + file);
		
		if("Word".equals(sourceType)) {
			HWPFDocument wordDocument = new HWPFDocument(inputStream);
			WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(
		    DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
			wordToHtmlConverter.setPicturesManager(new PicturesManager() {
			  public String savePicture(byte[] content, PictureType pictureType,
			     String suggestedName, float widthInches, float heightInches) {
			    return suggestedName;
			   }
			  });
			  wordToHtmlConverter.processDocument(wordDocument);
			  List<Picture> pics = wordDocument.getPicturesTable().getAllPictures();
			  if (pics != null) {
			   for (int i = 0; i < pics.size(); i++) {
			    Picture pic = (Picture) pics.get(i);
			    try {
			     pic.writeImageContent(new FileOutputStream(path
			       + pic.suggestFullFileName()));
			    } catch (FileNotFoundException e) {
			     e.printStackTrace();
			    }
			   }
			  }
			  Document htmlDocument = wordToHtmlConverter.getDocument();
			  ByteArrayOutputStream outStream = new ByteArrayOutputStream();
			  DOMSource domSource = new DOMSource(htmlDocument);
			  StreamResult streamResult = new StreamResult(outStream);
			  TransformerFactory tf = TransformerFactory.newInstance();
			  Transformer serializer = tf.newTransformer();
			  serializer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
			  serializer.setOutputProperty(OutputKeys.INDENT, "yes");
			  serializer.setOutputProperty(OutputKeys.METHOD, "html");
			  serializer.transform(domSource, streamResult);
			  outStream.close();
			  String content = new String(outStream.toByteArray());
			  FileUtils.writeStringToFile(targetFile, content, "utf-8");
			  Runtime ce=Runtime.getRuntime();
			  ce.exec("cmd /c start "+targetFile.getAbsolutePath());
		}else if("Excel".equals(sourceType)) {
			/* HSSFWorkbook excelBook=new HSSFWorkbook(inputStream);
		     ExcelToHtmlConverter excelToHtmlConverter = new ExcelToHtmlConverter (DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument() );
		     excelToHtmlConverter.processWorkbook(excelBook);
		     List<HSSFPictureData> pics = excelBook.getAllPictures();
		     if (pics != null) {
		         for (int i = 0; i < pics.size(); i++) {
		             Picture pic = (Picture) pics.get (i);
		             try {
		                 pic.writeImageContent (new FileOutputStream(path
		      			       + pic.suggestFullFileName()));
		             } catch (FileNotFoundException e) {
		                 e.printStackTrace();
		             }
		         }
		     }
		     Document htmlDocument =excelToHtmlConverter.getDocument();
		     ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		     DOMSource domSource = new DOMSource (htmlDocument);
		     StreamResult streamResult = new StreamResult (outStream);
		     TransformerFactory tf = TransformerFactory.newInstance();
		     Transformer serializer = tf.newTransformer();
		     serializer.setOutputProperty (OutputKeys.ENCODING, "utf-8");
		     serializer.setOutputProperty (OutputKeys.INDENT, "yes");
		     serializer.setOutputProperty (OutputKeys.METHOD, "html");
		     serializer.transform (domSource, streamResult);
		     outStream.close();

		     String content = new String (outStream.toByteArray() );

		     FileUtils.writeStringToFile(targetFile, content, "utf-8");
		     
		     Runtime ce=Runtime.getRuntime();
			  ce.exec("cmd /c start "+targetFile.getAbsolutePath());*/
		}else if("PPT".equals(sourceType)) {
			/*try {   
	            SlideShow ppt = new SlideShow(is);   
	            is.close();   
	            Dimension pgsize = ppt.getPageSize();   
	            org.apache.poi.hslf.model.Slide[] slide = ppt.getSlides();   
	            for (int i = 0; i < slide.length; i++) {   
	                System.out.print("第" + i + "页。");   

	                TextRun[] truns = slide[i].getTextRuns();      
	                for ( int k=0;k<truns.length;k++){      
	                   RichTextRun[] rtruns = truns[k].getRichTextRuns();      
	                  for(int l=0;l<rtruns.length;l++){      
	                       int index = rtruns[l].getFontIndex();      
	                        String name = rtruns[l].getFontName();                
	                        rtruns[l].setFontIndex(1);      
	                        rtruns[l].setFontName("宋体");  
//	                        System.out.println(rtruns[l].getText());
	                   }      
	                }      
	                BufferedImage img = new BufferedImage(pgsize.width,pgsize.height, BufferedImage.TYPE_INT_RGB);   

	                Graphics2D graphics = img.createGraphics();   
	                graphics.setPaint(Color.BLUE);   
	                graphics.fill(new Rectangle2D.Float(0, 0, pgsize.width, pgsize.height));   
	                slide[i].draw(graphics);   

	                // 这里设置图片的存放路径和图片的格式(jpeg,png,bmp等等),注意生成文件路径   
	                FileOutputStream out = new FileOutputStream("D:/poi-test/pptToImg/pict_"+ (i + 1) + ".jpeg");   
	                javax.imageio.ImageIO.write(img, "jpeg", out);   
	                out.close();   

	            }   
	        } catch (FileNotFoundException e) {   
	            System.out.println(e);   
	            // System.out.println("Can't find the image!");   
	        } catch (IOException e) {   
	        }   */
		}
	}
/*	@RequestMapping(value="{classroomCode}/reviewResource",method = RequestMethod.POST)
	public void reviewResource(Integer sourceId,HttpServletRequest request,HttpServletResponse response) throws IOException, ParserConfigurationException, TransformerException {
		//获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userPermission");
		
		if(user == null) {
			return ;
		}		
		
		LearningResource LearningResource = learningResourceService.get(sourceId);
		Query query = new Query(Criteria.where("_id").is(LearningResource.getFileId()));
		//查询单个文件
		GridFSDBFile fileOne = gridFsTemplate.findOne(query);
		InputStream inputStream = fileOne.getInputStream();//得到文件的输入流
		
		HWPFDocument wordDocument = new HWPFDocument(inputStream);
		WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument()); 
		wordToHtmlConverter.setPicturesManager(new PicturesManager() {
			public String savePicture(byte[] content, PictureType pictureType,
					String suggestedName, float widthInches, float heightInches) {
				return suggestedName;
			}
		});
		wordToHtmlConverter.processDocument(wordDocument);
		
		List<Picture> pics = wordDocument.getPicturesTable().getAllPictures();
		if (pics != null) {
		   for (int i = 0; i < pics.size(); i++) {
		    Picture pic = (Picture) pics.get(i);
		    try {
			     pic.writeImageContent(response.getOutputStream());
		    } catch (FileNotFoundException e) {
		     e.printStackTrace();
		    }
		   }
		}
		
		Document htmlDocument = wordToHtmlConverter.getDocument();
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		DOMSource domSource = new DOMSource(htmlDocument);
		StreamResult streamResult = new StreamResult(outStream);
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer serializer = tf.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
		serializer.setOutputProperty(OutputKeys.INDENT, "yes");
		serializer.setOutputProperty(OutputKeys.METHOD, "html");
		serializer.transform(domSource, streamResult);
		outStream.close();
		String content = new String(outStream.toByteArray());
//	  FileUtils.writeStringToFile(new File(path, "人员选择系分.html"), content, "utf-8");
		response.getWriter().write(content);
	}
*/}
