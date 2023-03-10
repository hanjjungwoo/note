<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.util.*"
    %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="path" value="${pageContext.request.contextPath }"/>
<fmt:requestEncoding value="utf-8"/>     
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>

</style>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">  
<link rel="stylesheet" type="text/css" href="${path}/resources/style/top.css">
<title>Insert title here</title>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api" type="text/javascript"></script>
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
</head>

<body>
<header class="p-3 mb-3 border-bottom fixed-top topheader">
    <div class="container-fulid">
     	
	      <div class="row">
		      <div id="Top_Logo" class="col">
		      <a href="${path }"><img src="https://img.freepik.com/premium-vector/earth-planet-isolated-white-flat-global-earth-icon-vector-simple-illustration-eco-environment_439591-339.jpg?w=360"></a>
		      </div>    
		      <div class="col-10 position-relative TopDropdownMenu">
		      	<h4 class="dropdown-toggle dropdown position-absolute top-50 start-50" data-bs-toggle="dropdown" aria-expanded="false">${notes.noteTitle}</h4>
					<div class="dropdown-menu position-absolute top-50 start-50" aria-labelledby="dropdownMenuButton" >
				    	<a class="dropdown-item" href="${noteEarthurl }/insertPages.do?noteCode=${pages.noteCode }&tempCode=${pages.tempCode }&pageIndex=${pages.pageIndex}">?????? ??????????????? ??? ????????? ??????</a>
				    	<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#addPageModal">?????? ??????????????? ??? ????????? ?????? </a>
				    	<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delPageModal">?????? ????????? ??????</a>
				  	</div>
			  </div>
		
	    <!-- ????????? ?????????????????? ????????? -->
	    <div class="col">
		<c:if test="${Login.name!=null}">      
		
	        <div class="dropdown text-end">
	          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
	            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" alt="mdo" width="32" height="32" class="rounded-circle">
	          </a>
	          <ul class="dropdown-menu text-small">
	            <li><a class="dropdown-item" href="#">??????</a></li>
	            <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#MemberInfoModal" onclick="loadMemInfo()">????????????</a></li>
	            <li><hr class="dropdown-divider"></li>
	            <li><a class="dropdown-item" onclick="kakaoLogOut()">????????????</a></li>
	          </ul>
	        </div>
	    
	    
	      </c:if>
	     </div>
	    </div> <!-- row -->
    </div><!-- container -->
</header>

<!-- ???????????? ????????? -->

<div class="modal fade" id="MemberInfoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
  <div class="row">
    <div class="modal-content col InfoMadalContent">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">'${Login.name}'??? ????????????</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="MemInfo_Form" action="NE_UpdateInfo.do" method="post">
      <div class="modal-body">
      <label for="MemInfo_name" class="form-label">??????</label>
		  <div class="mb-3">
		    <input name="name" type="text" class="form-control"  id="MemInfo_name" value="" readonly>    
		  	<input name="rrn" type="hidden" value=""/>
		  </div>
		  
		  <hr>
		  
		  <label for="MemInfo_email" class="form-label">?????????</label>
		  <div class="mb-3">   
		    <input name="email" type="email" class="form-control" id="MemInfo_email"  value=""  required>
		    <div class="invalid-feedback" id="uptemailfeedback">?????????????????? ?????? ????????????.</div>
		  </div>
		  <div class="d-flex justify-content-left" id="CheckEmail_Wrap">
		  	<button type="button" class="btn btn-primary " id="CheckUptEmailBtn">????????? ??????</button>
		  	<input type="text" class="form-control w-25" id="checkUptEmailCode"/>
		  </div>
		  <label for="MemInfo_SNSemail" class="form-label">?????? ??????</label>
		  <div class="mb-3"> 
		  	<label for="" class="form-label">?????????</label>  
		    <input name="kakaoemail" type="email" class="form-control" id="MemInfo_SNSemail1"  value="" placeholder="????????????????????????" readonly>
		    <label for="" class="form-label">??????</label> 
		    <input name="googleemail" type="email" class="form-control" id="MemInfo_SNSemail2"  value="" placeholder="???????????????" readonly>
		   
		  </div>
		  
		   <hr>
		  <div class="mb-3">
		    <label for="MemInfo_password1" class="form-label " >????????????</label>
		    <div id="passHelp" class="form-text UptPass">??????/??????/???????????? ??? 2?????? ?????? ??????(8?????? ?????? 16?????? ??????)</div>
		    <input name=password type="password" class="form-control" id="MemInfo_password1" aria-describedby="passHelp" value="" required>
		  	<div class="invalid-feedback" id="uptpass1feedback"></div>
		  </div>
		  <div class="mb-3">
		    <label for="MemInfo_password2" class="form-label UptPass" >???????????? ??????</label>
		    <input type="password" class="form-control UptPass" id="MemInfo_password2" required>
		     <div class="invalid-feedback">??????????????? ???????????? ????????????.</div>
		  </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">?????????</button>
        <button type="button" class="btn btn-success" id="ConnectSNS">SNS????????????</button>
        <button type="button" class="btn btn-primary" id="UptUserInfoBtn">????????????</button>
      </div>
     </form>
    </div>
      <div class="modal-content col SNSModalContent">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">SNS ??????</h1>
        <button type="button" class="btn-close"  id="SNSModalClose"></button>
      </div>
      <div class="modal-body">
      	<div>
      	<h4 style="text-align:center;">????????????</h4>
	       <div id="g_id_onload"
		     data-client_id="480388421855-dkukvie0s0b8q34rtt7ae5kmdfrh59ug.apps.googleusercontent.com"
		     data-callback="handleCredentialResponse">
			</div>
			<div class="g_id_signin" data-type="outline" data-size="large" ></div>
	    <h4 style="text-align:center;">???????????????</h4>
		   <img src="${path}/resources/img/kakao_login_medium_narrow.png" onclick="kakaoLogin()">
	   </div>
      </div>
      <div class="modal-footer">
      	?????? ??????,????????? ???????????? <strong>SNS???????????? ?????? ??????</strong>??? ??? ????????????.
      </div>
     
    </div>
    </div>
  </div>
</div>
  
 <%--EL?????????????????? ?????? --%>
<script>
var SessionEmail = '${Login.email}'; //??????????????? ?????????
var SessionPass = '${Login.password}'; //??????????????? ????????????
var Loginemail = '${Login.email}' //js??????????????? ???????????????

emailjs.init("mzN3R1G0GZQBRs8hh");
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
<script src="${path}/resources/js/Top.js"></script> <%--el??????????????????????????? ?????? --%>


</body>
</html>