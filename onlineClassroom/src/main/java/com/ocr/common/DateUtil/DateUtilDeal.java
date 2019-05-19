package com.ocr.common.DateUtil;

import java.util.Date;

/**
 * 时间处理工具类
 * @author 滕云飞
 * @date 2019年4月24日
 * @version ocr1.0.1
 */
public class DateUtilDeal {
	public static String getDatePoor(Date endDate, Date nowDate) {

		long nd = 1000 * 24 * 60 * 60;//每天毫秒数

		long nh = 1000 * 60 * 60;//每小时毫秒数

		long nm = 1000 * 60;//每分钟毫秒数

		long diff = endDate.getTime() - nowDate.getTime(); // 获得两个时间的毫秒时间差异

		long day = diff / nd;   // 计算差多少天

		long hour = diff % nd / nh; // 计算差多少小时

		long min = diff % nd % nh / nm;  // 计算差多少分钟

		return day + "-" + hour + "-" + min;

	}
}
