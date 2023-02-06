package noteEarth.dao;

import java.util.List;

import noteEarth.vo.PageTemplates;

public interface R2001_shopTemp {
	public List<PageTemplates> getPageTempList(PageTemplates sch);
	public PageTemplates getTemplate(String tempCode);
}
