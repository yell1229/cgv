// 전송버튼 이벤트
function joinFormCheck(){
    let id = document.querySelector('input.id');
    let btnCheck = document.querySelector('.dbl_check');
    let pwd = document.querySelector('.pwd');
    let cpwd = document.querySelector('.cpwd');
    let name = document.querySelector('.name');
    let phone = document.querySelector('.phone');
    let emailname = document.querySelector('.emailname');
    let emaildomain = document.querySelector('.emaildomain');

    let idTxt = id.parentElement.previousElementSibling;
    let pwdTxt = pwd.parentElement.previousElementSibling;
    let cpwdTxt = cpwd.parentElement.previousElementSibling;
    let nameTxt = name.parentElement.previousElementSibling;
    let phoneTxt = phone.parentElement.previousElementSibling;
    let emailnameTxt = emailname.parentElement.previousElementSibling;
    
    if(id.value.trim() === ''){
        idTxt.style.display = 'inline-block';
        idTxt.style.color = 'red';
        idTxt.textContent = '아이디를 입력해 주세요.';
        id.focus();
    }else if(btnCheck.value === 'no'){
        idTxt.style.display = 'inline-block';
        idTxt.style.color = 'red';
        idTxt.textContent = '아이디 중복확인을 해주세요.';
    }else if(pwd.value.trim() === ''){
        pwdTxt.style.display = 'inline-block';
        pwdTxt.style.color = 'red';
        pwd.focus();
    }else if(cpwd.value.trim() === ''){
        cpwdTxt.style.display = 'inline-block';
        cpwdTxt.style.color = 'red';
        cpwd.focus();
    }else if(name.value.trim() === ''){
        nameTxt.style.display = 'inline-block';
        nameTxt.style.color = 'red';
        name.focus();
    }else if(phone.value.trim() === ''){
        phoneTxt.style.display = 'inline-block';
        phoneTxt.style.color = 'red';
        phone.focus();
    }else if(emailname.value.trim() === ''){
        emailnameTxt.style.display = 'inline-block';
        emailnameTxt.style.color = 'red';
        emailname.focus();
    }else if(emaildomain.value === 'default'){
        emaildomain.focus();
    }else{
        alert('회원가입 완료');
    }
}

// input check
function checkValidation(event){
    if(event.target.value.trim() === ''){
        event.target.parentElement.previousElementSibling.style.display = 'inline-block';
        event.target.parentElement.previousElementSibling.style.color = 'red';
    }else{
        event.target.parentElement.previousElementSibling.style.display = 'inline-block';
        event.target.parentElement.previousElementSibling.style.color = 'green';
    }  
}

//비밀번호 확인
function checkPassword(){
    let pwd = document.querySelector('.pwd');
    let cpwd = document.querySelector('.cpwd');
    let pwdTxt = pwd.parentElement.previousElementSibling;
    let cpwdTxt = cpwd.parentElement.previousElementSibling;
    if(pwd.value.trim() !== cpwd.value.trim()){
        cpwdTxt.style.display = 'inline-block';
        cpwdTxt.style.color = 'red';
    }
}

// 중복확인
function dblCheck(){
    document.querySelector('.dbl_check').value ='check';
    console.log(document.querySelector('.dbl_check').value);
}