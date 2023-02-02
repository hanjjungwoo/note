package noteEarth.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import noteEarth.service.R2000_Service;

@Controller
public class R2000_Controller {
	
	@Autowired
	private R2000_Service service;

	//http://localhost:6080/noteEarth/selectMyTemps.do
	@RequestMapping("/selectMyTemps.do")
	public String addNote(Model d) {
		d.addAttribute("myTempsList", service.selectMyTemps("jeju@email.com"));		//메일주소 임시값
		return "pageJsonReport";
	}
	
	
	
	
}
