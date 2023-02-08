var TopHighVal = $('header').outerHeight(true); //Top의 높이만큼 제거
$('body').css("padding-top",TopHighVal);	

//회원정보창
	$(document).ready(function(){
		// 이메일 확인 버튼/코드란 비활성화
		$("#CheckEmailBtn").slideUp('slow')
		$("#checkEmailCode").slideUp('slow') 
		// 비밀번호 확인란 비활성화
		$(".UptPass").slideUp() //2차 비밀번호 관련애들
		
		//SNS연동창 비활성화
		$('.SNSModalContent').slideUp()
});

function loadMemInfo(){
	console.log("email="+Loginemail)
	$.ajax({
			url:"NE_loadMemInfo.do",
			type:"post",
			data:"email="+Loginemail,
			dataType:"json",
			success:function(data){
				$('.MemInfo_Form [name=name]').val(data.name);
				$('.MemInfo_Form [name=rrn]').val(data.rrn);
				$('.MemInfo_Form [name=email]').val(data.email);
				$('.MemInfo_Form [name=kakaoemail]').val(data.kakaoemail);
				$('.MemInfo_Form [name=googleemail]').val(data.googleemail);
				$('.MemInfo_Form [name=password]').val(data.password);
			},
			error:function(xhr,status,error){
                  console.log(xhr)
                  console.log(status)
                  console.log(error)
            }
		})
}


/*--------------------------회원수정-------------------------*/
var Upt_Email=true;
var Upt_Password=true;
var Upt_Password2=true;

	//세션처리된 이메일과 다를경우
	$('#MemInfo_email').keyup(function(){
		 var InfoEmail = $(this).val(); //회원정보창에 적혀져있는 이메일
		  //세션처리된 이메일
		if(InfoEmail!=SessionEmail){
			$("#CheckEmailBtn").slideDown('slow')
			$("#checkEmailCode").slideDown('slow')
			Upt_Email=false;
			
		}else{
			$("#CheckEmailBtn").slideUp('slow')
			$("#checkEmailCode").slideUp('slow')
			Upt_Email=true;
		}
	})
	
	
	//이메일 양식확인
$('#CheckUptEmailBtn').click(function(){
	var RegEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var EmailVal = $('#MemInfo_email').val()
	if(!RegEmail.test(EmailVal) || EmailVal==''){
		console.log(EmailVal)
		$('#MemInfo_email').addClass('is-invalid')
		return false;
	}
		var qstr ="email="+EmailVal
		$.ajax({
			url:"NE_CheckEmail.do",
			type:"post",
			data:qstr,
			dataType:"json",
			success:function(data){
				if(data==null){
					$('#MemInfo_email').removeClass('is-invalid')
					$('#MemInfo_email').addClass('is-valid')
					sendEmail()
				}else{
					console.log("여긴가")
					$('#uptemailfeedback').text('중복된 이메일이 존재합니다.')
					$('#MemInfo_email').val('')
					$('#MemInfo_email').focus()
					$('#MemInfo_email').addClass('is-invalid')
				}
			},
			error:function(xhr,status,error){
                  console.log(xhr)
                  console.log(status)
                  console.log(error)
            }
		})
	})
		
	


//이메일 보내기
emailjs.init("mzN3R1G0GZQBRs8hh");
var SixRanNum = ""; 
        function sendEmail(){
        	SixRanNum=""
        	//6자 난수생성
        	for(let i = 0; i < 6; i++) {
        		SixRanNum += Math.floor(Math.random() * 10)
        	  }           	
        	
          var templateParams = {
          //각 요소는 emailJS에서 설정한 템플릿과 동일한 명으로 작성!
                to_name: $('#MemInfo_name').val(),
                to_email : $('#MemInfo_email').val(),
                message : SixRanNum
                
          }
         emailjs.send('service_ee7pra4','template_azph6ba', templateParams)
         //emailjs.send('service ID', 'template ID > emailjs 페이지에서 만든 템플릿에서 확인이 가능하다', 보낼 내용이 담긴 객체)
         	    .then(function(response) {
         	       alert('입력하신 메일을 확인하시고, 인증번호를 입력부탁드립니다.')
         	       
         	    }, function(error) {
         	       alert('정상적인 제출이 이루어지지 않았습니다. 다시 시도해주세요!')
         	    });
       } 
       
	$('#checkUptEmailCode').keyup(function(){
    	 if($(this).val()==SixRanNum){
			 alert("확인되었습니다. 감사합니다.")
			 $('#MemInfo_email').attr('readonly',true)
    		 $(this).attr('readonly',true)
    		 $(this).addClass("is-valid")
    		 Upt_Email = true;
    	 }
      });
	
	
	//세션처리된 비밀번호와 다를경우
	$('#MemInfo_password1').keyup(function(){
		var InfoPass = $(this).val()
		if(InfoPass!=SessionPass){
			$('.UptPass').slideDown('slow')
			Upt_Password=false;
			Upt_Password2=false;
		}else{
			$('.UptPass').slideUp('slow')
			Upt_Password=true;
			Upt_Password2=true;
		}
	})
	
	
	
$('#MemInfo_password1').keyup(function chkPW(){
	 var pw = $(this).val();
	 var num = pw.search(/[0-9]/g);
	 var eng = pw.search(/[a-z]/ig);
	 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩';:₩/?]/gi);
		 if(pw.length < 8 || pw.length > 16){
			 console.log(pw);
			 $('#uptpass1feedback').text("8자리 ~ 16자리 이내로 입력해주세요.")
			 $(this).addClass('is-invalid')
			 Upt_Password = false;		 
		 }else if(pw.search(/\s/) != -1){
			 $(this).removeClass('is-invalid')
			 $('#uptpass1feedback').text("비밀번호는 공백 없이 입력해주세요.")
			 $(this).addClass('is-invalid')
			 Upt_Password = false;
		 }else if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
			 $(this).removeClass('is-invalid')
			 $('#uptpass1feedback').text("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.")
			 $(this).addClass('is-invalid')
			 Upt_Password = false;
		 }else {
			 $(this).removeClass('is-invalid')
			 $(this).addClass('is-valid')
			 Upt_Password = true;
		 }

})

//비밀번호2 유효성검사
$('#MemInfo_password2').keyup(function(){
	var pass1val = $('#MemInfo_password1').val()
	var pass2val = $(this).val()
	if(!Upt_Password){
		alert("위 칸의 비밀번호부터 입력부탁드립니다.")
		$(this).val('')
		$('#MemInfo_password1').focus()
	}else{
		if(pass1val!=pass2val){
			$(this).removeClass('is-valid')
			$(this).addClass('is-invalid')
			Upt_Password2=false;
		}else{
			$(this).removeClass('is-invalid')
			$(this).addClass('is-valid')
			Upt_Password2=true;
		}
	}
})	
	
	
	
	
	
	
	
	
	
	
	
//회원 수정 form의 onsubmit
$('#UptUserInfoBtn').click(function(){
	if(!Upt_Email){alert('이메일 인증 완료이후 다시 진행 부탁드립니다.'); return false;}
	if(!Upt_Password2){alert('비밀번호가 일치하지않습니다.다시입력부탁드립니다.'); return false;}
	if(SessionEmail==$('#MemInfo_email').val() && SessionPass== $('#MemInfo_password1').val()){
		alert('수정 내용이 없습니다.'); return false;
	}
	$('.MemInfo_Form').submit();
})


//회원정보창에서 sns계정연동 누르면 나오는 모달창
$('#ConnectSNS').click(function(){
	$('.InfoMadalContent').animate(
			{'left':'-=350'},
			1000,
			function(){
				$('.SNSModalContent').slideDown()
	});
	$('#SNSModalClose').click(function(){
		$('.SNSModalContent').slideUp('fast',function(){
			$('.InfoMadalContent').animate(
					{'left':'+=350'},
					1000)
		})
		
	})
})

function handleCredentialResponse(response) {
	const responsePayload = decodeJwtResponse(response.credential);
	console.log("Email: " + responsePayload.email);
	if(Loginemail==''){SNSResult('google',responsePayload.email)} //로그인전 연동(SignIn.js파일에 있음)
	else{LinkSns('google',responsePayload.email)}// 로그인 후 연동코드(현재 파일에 있음)
}


function decodeJwtResponse (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	return JSON.parse(jsonPayload);
};

var connected_at="";
var kakaoemail="";
//카카오로그인
Kakao.init('397291d0416daa0cdb592b95e6b9c7f7'); //발급받은 키 중 javascript키를 사용해준다.
function kakaoLogin(){
	console.log(Kakao.isInitialized()); // sdk초기화여부판단
    Kakao.Auth.login({
      scope:'profile_nickname,account_email',
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
        	  console.log(response)
        	  connected_at = response.connected_at
        	  kakao_account = response.kakao_account
        	  if(typeof kakao_account != 'undefined'){
            	  kakaoemail = kakao_account.email;         	
              }
              if(Loginemail==''){SNSResult('kakao',kakaoemail)}
              else{LinkSns('kakao',kakaoemail)}
        	  	 
          },
          fail: function (error) {
            console.log(error)
          },
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }	
//회원정보창에서 계정 연동
function LinkSns(platforms,email){
	var linkemailval;
	var basicemail = $('.MemInfo_Form [name=email]').val()
	if(platforms=='google'){
		linkemail = $('.MemInfo_Form [name=googleemail]')
	}else{
		linkemail = $('.MemInfo_Form [name=kakaoemail]')
	}
	
	if(linkemailval.val()==''){
		console.log("LinkSns.do?"+platforms+"email="+email+"&email="+basicemail)
		$.ajax({
			url:"NE_LinkSns.do",
			type:"post",
			data:platforms+"email="+email+"&email="+basicemail,
			dataType:"json",
			success:function(data){
				alert("연동 완료되었습니다. 이후 로그인 창에서도 sns로그인을 통해 로그인이 가능합니다.")
				linkemail.val(email)
			},
			error:function(xhr,status,error){
                  console.log(xhr)
                  console.log(status)
                  console.log(error)
            }
		})
	}else{
		alert('이미 연동이 되어있는 메일이 있습니다.')
	}
}

// 로그아웃
function kakaoLogOut(){
	
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
        	console.log(response)
        	
        },
        fail: function (error) {
          console.log(error)
        },
      })
      Kakao.Auth.setAccessToken(undefined)
    }
    location.href="NE_Logout.do"
  }  