package com.ocr.common.resultEntity;

/**
 * ajax返回类型
 * @author 滕云飞
 * @date 2019年4月18日
 * @version ocr1.0.1
 */
public class AjaxResult {
	private String status = "true";//默认操作成功
    private String msg = "操作成功";//返回前端操作的文字结果
    private Boolean success = true;
    private Object object;//返回后台的对象
    
    public AjaxResult(String status) {
    	super();
    	this.status = status;
    }
    public AjaxResult(String status, String msg) {
		super();
		this.status = status;
		this.msg = msg;
	}
	public AjaxResult(String status, Object object) {
		super();
		this.status = status;
		this.object = object;
	}
	public AjaxResult() {
    	super();
    }
    public static AjaxResult oK() {
    	return new AjaxResult("true");
    }
    public static AjaxResult oK(Object object) {
    	return new AjaxResult("true",object);
    }
    public static AjaxResult error() {
    	return new AjaxResult("error");
    }
    public static AjaxResult error(String msg) {
    	return new AjaxResult("error",msg);
    }
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
}
