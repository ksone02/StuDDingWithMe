function checkAll() {
    if (!check_studentNumber(form.studentNumber.value)) {
        return false;
    }
    else if (!check_id(form.id.value)) {
        return false;
    }
    else if (!check_pw(form.password.value, form.repassword.value)) {
        return false;
    }
    else if (!check_name(form.name.value)) {
        return false;
    }
    document.form.submit();
}

function checkExistData(value, dataName) {
    if (value == "") {
        alert(dataName + " 입력해주세요!");
        return false;
    }
    return true;
}

function check_studentNumber(StN) {
    if (!checkExistData(StN, "학번을")) {
        return false;
    }

    var SNRegExp = /^[0-9]{8,8}$/g;
    if(!SNRegExp.test(StN)) {
        alert("학번은 숫자 8자리로 입력해야합니다!");
        form.StN.value = "";
        form.StN.focus();
        return false;
    }
    return true;
}

function check_id(id) {
    if (!checkExistData(id, "아이디를")) {
        return false;
    }

    var idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
    if (!idRegExp.test(id)) {
        alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");
        form.userId.value = "";
        form.userId.focus();
        return false;
    }
    return true;
  }

  function check_pw(pw, repw) {
    if (!checkExistData(pw, "비밀번호를")) {
        return false;
    }   

    if (!checkExistData(repw, "확인 비밀번호를")) {
        return false;
    }

    var pwRegExp = /^[a-zA-z0-9]{4,12}$/; //비밀번호 유효성 검사
    if(!pwRegExp.test(pw)) {
        alert("비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야 합니다!");
        form.pw.value = "";
        form.pw.focus();
        return false;
    }

    if (pw != repw) {
        alert("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        form.pw.value = "";
        form.repw.value = "";
        form.pw.focus();
        return false;
    }

    return true;
  }

  function check_name(name) {
      if(!checkExistData(name, "이름을")) {
          return false;
      }
      return true;
  }

  function check_pw2() {
    var pw = document.getElementsByClassName("login-pw-input")[0].value;
    var pw2 = document.getElementsByClassName("login-repw-input")[0].value;
    var check = document.getElementById("check");

    if(pw != '' && pw2 != '') {
      if(pw == pw2) {
        check.innerHTML = "비밀번호가 일치합니다.";
      } else {
        check.innerHTML = "비밀번호가 일치하지 않습니다.";
      }
    }
  }



