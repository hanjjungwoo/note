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

function UpdateInfo(){
	
	if(!Upt_Email){alert('이메일 인증 완료이후 다시 진행 부탁드립니다.'); return false;}
	if(!Upt_Password){alert('비밀번호가 일치하지않습니다.다시입력부탁드립니다.'); return false;}
	
}