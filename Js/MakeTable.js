// 즐겨찾기 star1 : gray , star2 : yellow
var star1 = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 69.18 67.72">\n' +
    '                            <g id="star-fill" transform="translate(-0.003 -1.123)">\n' +
    '                                <path id="패스_2" data-name="패스 2" d="M15.615,68.586a2.323,2.323,0,0,1-3.227-2.673l3.588-21.354L.745,29.409a2.544,2.544,0,0,1,1.224-4.288l21.177-3.142L32.589,2.445a2.181,2.181,0,0,1,4.009,0l9.443,19.534,21.177,3.142a2.545,2.545,0,0,1,1.224,4.288L53.209,44.559,56.8,65.913a2.323,2.323,0,0,1-3.227,2.673L34.587,58.4,15.611,68.586Z" transform="translate(0 0)" fill="#7a7575"/>\n' +
    '                            </g>\n' +
    '                        </svg>';

var star2 = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 69.18 67.72">\n' +
    '                            <g id="star-fill" transform="translate(-0.003 -1.123)">\n' +
    '                                <path id="패스_2" data-name="패스 2" d="M15.615,68.586a2.323,2.323,0,0,1-3.227-2.673l3.588-21.354L.745,29.409a2.544,2.544,0,0,1,1.224-4.288l21.177-3.142L32.589,2.445a2.181,2.181,0,0,1,4.009,0l9.443,19.534,21.177,3.142a2.545,2.545,0,0,1,1.224,4.288L53.209,44.559,56.8,65.913a2.323,2.323,0,0,1-3.227,2.673L34.587,58.4,15.611,68.586Z" transform="translate(0 0)" fill="#f2d025"/>\n' +
    '                            </g>\n' +
    '                        </svg>';


function nicknameAjax(id){
    var nickname;

    $.ajax({
        url: "../../reqNic",
        type: "POST",
        data: {"id":id},
        dataType: "json",
        async: false,
        success: function (result) {
            nickname = result.nick;
        }
    });

    return nickname;
}

function checkPeriod(deadline){
    if(getTimeStamp() < deadline){
        return "모집중";
    }else{
        return "마감";
    }
}

function makeData(data){
    return new Array(star1,data.title,data.kinds,nicknameAjax(data.id) , checkPeriod(data.deadline),data.time.split('T')[0]+" ~ "+data.deadline.split('T')[0], data.count);
}

// tavble 생성
function makeTable(tableWrap, data) {
    let rowCnt = 10; // 
    const columnCnt = 7; // 고정

    let table = document.createElement("table");

    // th추가
    table.appendChild(createTH("즐겨찾기"));
    table.appendChild(createTH("제목"));
    table.appendChild(createTH("스터디종류"));
    table.appendChild(createTH("작성자"));
    table.appendChild(createTH("모집현황"));
    table.appendChild(createTH("모집기간"));
    table.appendChild(createTH("조회수"));

    if (rowCnt > data.length) {
        rowCnt = data.length;
    }

    // td 추가
    for (let i = 0; i < rowCnt; i++) {
        let tr = document.createElement("tr");

        for (let j = 0; j < columnCnt; j++) {
            let td = document.createElement("td");
            // data 값 넣기
            td.innerHTML = data[i][j];
            tr.appendChild(td);
        };

        table.appendChild(tr);
    }

    tableWrap.appendChild(table);
}

function createTH(text) {
    let th = document.createElement("th");
    th.innerText = text;

    return th;
}

function removeTable(tableWrap){
    tableWrap.innerHTML="";
}

function searchTable(tableWrap){
    
    // input 에서 검색 내용 추출
    $.ajax({
        url: "../../searchlist",
        type: "POST",
        data: $("form").serialize(),
        dataType: "json",
        success: function (result) {
            let data = JSON.parse(result); 
            let datalist = new Array();
            for(let i =0;i<data.length;i++){
              console.log(data);
              datalist.push(makeData(data[i]));
            }

            // removeTable 호출하여 삭제
            removeTable(tableWrap);
            // makeTable 호출하여 테이블 재생성
            makeTable(tableWrap,datalist);
        }
    });
}


function getTimeStamp() {
    var d = new Date();

    var s =
      leadingZeros(d.getFullYear(), 4) + '-' +
      leadingZeros(d.getMonth() + 1, 2) + '-' +
      leadingZeros(d.getDate(), 2) + ' ' +

      leadingZeros(d.getHours(), 2) + ':' +
      leadingZeros(d.getMinutes(), 2) + ':' +
      leadingZeros(d.getSeconds(), 2);

    return s;
  }

  function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }