function makeData(data){
    return new Array(data.title, data.kinds, ddayCalc(data.deadline));
}

function ddayCalc(deadline) {
    let now = new Date();
    let dday = new Date(deadline);
    let gap = now.getTime() - dday.getTime();    // 현재 날짜에서 D-day의 차이를 구함
    let result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;    // gap을 일(밀리초 * 초 * 분 * 시간)로 나눔

    if(result == 0) { //날짜가 0일 때 "D-Day" 출력
        result = "Day";
        return "D-" + result;
    } else if(result < 0) { // 날짜가 마감시간이 지났을때 "마감" 출력
        result = "마감";
        return result;
    } else {
        return "D-" + result;
    }
}

//이미지 1~3 중 랜덤
function randomImg() {
    let r = Math.random();
    let s = Math.floor(r * 3 + 1);

    return "Img/study" + s + ".jpg";
  }

//스터디목록 테이블 생성
function makeTableStudy(tableWrap, data) {
    let rowCnt = 10;

    if (rowCnt > data.length) {
        rowCnt = data.length;
    }

    let table = document.createElement("div");
    table.className = "study-main-item-list-wrap";

    for(let i = 0; i < rowCnt; i++) {
        let list = document.createElement("div");
        list.className = "study-main-item-list";

        table.appendChild(list);

        let imgWrap = document.createElement("div");
        imgWrap.className = "study-item-img-wrap";

        let textWrap = document.createElement("div");
        textWrap.className = "study-item-txt-wrap";

        list.appendChild(imgWrap);
        list.appendChild(textWrap);

        let img = document.createElement("img");
        img.alt = "study-img";
        img.src = randomImg();
        img.className = "study-item-img";

        let ddaydiv = document.createElement("div");
        ddaydiv.className = "study-item-info-cover";

        imgWrap.appendChild(img);
        imgWrap.appendChild(ddaydiv);

        let dday = document.createElement("h3");
        dday.className = "study-item-info-day";
        dday.innerHTML = data[i][2];

        ddaydiv.appendChild(dday);

        let title = document.createElement("h4");
        title.className = "study-item-txt-title";
        title.innerHTML = data[i][0];

        let subTitle = document.createElement("p");
        subTitle.className = "study-item-txt-subTitle";
        subTitle.innerHTML = data[i][1];

        textWrap.appendChild(title);
        textWrap.appendChild(subTitle);
    }
    tableWrap.appendChild(table);
}

// 공모전, 대외활동 목록 테이블 생성
function makeTable(tableWrap, data) {
    let rowCnt = 6; // 

    let table = document.createElement("ol");
    table.className = "main-item-list-wrap";

    if (rowCnt > data.length) {
        rowCnt = data.length;
    }

    for(let i = 0; i <rowCnt; i++) {
        let li = document.createElement("li");
        li.className = "main-item-list";

        table.appendChild(li);

        let a = document.createElement("a");
        a.className = "main-item";

        li.appendChild(a);


        //제목, 종류 생성
        let head = document.createElement("div");
        head.className = "main-item-head";
        a.appendChild(head);

        let h4 = document.createElement("h4");
        h4.className = "main-item-title";
        h4.innerHTML = data[i][0];

        let p = document.createElement("p");
        p.className = "main-item-subtitle";
        p.innerHTML = data[i][1];

        head.appendChild(h4);
        head.appendChild(p);

        //D-day 생성
        let tail = document.createElement("div");
        tail.className = "main-item-tail";

        a.appendChild(tail);

        let h3 = document.createElement("h3");
        h3.className = "main-item-day";
        h3.innerHTML = data[i][2];

        tail.appendChild(h3);
    }

    tableWrap.appendChild(table);
}
