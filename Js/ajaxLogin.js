//const { log } = require("node:console");

var User_id;
var User_nick;
var User_logined; 

function ajaxLogined(){
    $.ajax({
        url: "http://localhost:8888/loginCheck",
        type: "POST",
        success: function (result) {
            if(result.logined == true){
             console.log(result);
             User_id = result.user_id;
             User_nick = result.nickname;
             User_logined = result.logined;

              const register = document.getElementsByClassName("register")[0];
              const login = document.getElementsByClassName("gnb-btn-login")[0];
              const wrap = document.getElementsByClassName("gnb-list-wrap")[0];
              const nickDiv = document.createElement("li");
              const nickHref = document.createElement("a");
              
              nickDiv.setAttribute("class", "gnb-list");
              wrap.prepend(nickDiv);

              nickDiv.append(nickHref);
              nickHref.href = "html/Member/my-page.html";
              nickHref.innerHTML = result.nickname;
              nickHref.style.color = "white";
              nickHref.setAttribute("class", "mypage-btn");

              register.style.display = "none";
              login.innerHTML = "로그아웃";
              login.href = "http://localhost:8888/";
              login.addEventListener("click", logout, false);
            }
        }
      });
}

function logout(){
    $.ajax({
        url: "http://localhost:8888/logout",
        type: "POST",
        success: function (result) {
            if(result.logined == false){
                alert("로그아웃 되었습니다.");
            };
        }
      });
}