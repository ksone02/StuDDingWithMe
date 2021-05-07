var app = Sammy(function () {
    
    //라우트 설정****
 
    this.get("/", function () {
        //인덱스 페이지
        $(".center").load("../Main.html .center");
    });
 
    
    this.get("/study", function () {
        $(".center").load("../study-index.html .center");
    });

    this.get("/contest", function () {
        $(".center").load("../study-index.html .center");
    });

    this.get("/classmate", function () {
        $(".center").load("../study-index.html .center");
    });

 
    //404
    this.notFound = function (verb, path) {
        //인덱스 페이지
        //$("#divMain").load("/pages/index.html");
        $(".center").html("404, 페이지 못찾음");
    };
});
 
//어플리케이션 시작
$(function () {
    app.run()
});
