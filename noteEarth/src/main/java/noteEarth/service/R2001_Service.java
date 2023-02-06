package noteEarth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import noteEarth.dao.R2001_shopTemp;
import noteEarth.vo.PageTemplates;

@Service
public class R2001_Service {
	@Autowired
	private R2001_shopTemp dao;
	public List<PageTemplates> getPageTempList(PageTemplates sch){
		// 초기화면에 요청값이 없더라도 sql로 전체 검색이 가능하게 만들기
		if(sch.getTempTitle()==null) sch.setTempTitle("");
		return dao.getPageTempList(sch);
	}
	public String getTemplate(String tempCode) {
		return dao.getTemplate(tempCode);
	}
}
