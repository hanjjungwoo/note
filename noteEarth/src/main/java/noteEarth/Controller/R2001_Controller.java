package noteEarth.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import noteEarth.service.R2001_Service;
import noteEarth.vo.PageTemplates;


@Controller
public class R2001_Controller {
	@Autowired(required =false)
	private R2001_Service service;
	
	// http://localhost:7077/noteEarth/shopTempList.do
	@RequestMapping("/shopTempList.do")		// 마켓에서 판매하는 템플릿 보여줌
	public String tempList(@ModelAttribute("sch") PageTemplates sch, Model d) {
		d.addAttribute("templist", service.getPageTempList(sch));
		return "WEB-INF\\Req2000\\R2001_search.jsp";
	}
	@GetMapping("/template.do")
	public String getTemplate(@RequestParam("tempCode") String tempCode, Model d) {
		service.getTemplate(tempCode);
		d.addAttribute("pageTemplates",service.getTemplate(tempCode));
		return "WEB-INF\\Req2000\\R2002_tempDetail.jsp";
	}
}
