function doGetCall(url, data) { // here the data and url are not hardcoded anymore
    var json_data = JSON.stringify(data);
 
     return $.ajax({
         type: "GET",
         url: url,
         data: json_data,
         dataType: "json",
        //  contentType: "application/json;charset=utf-8"
     });
 }
 
 function doPostCall(url, data) { // here the data and url are not hardcoded anymore
    var json_data = JSON.stringify(data);
 
     return $.ajax({
         type: "POST",
         url: url,
         data: json_data,
         dataType: "json",
         contentType: "application/json;charset=utf-8"
     });
 }
 
 function doGetCallSync (url) {
 
     return $.ajax({
         type: "GET",
         url: url,
         dataType: "json",
        // contentType: "application/json;charset=utf-8",
         async: false
     });
 }
 
 function doPostCallSync(url, data) { // here the data and url are not hardcoded anymore
    var json_data = JSON.stringify(data);
 
     return $.ajax({
         type: "POST",
         url: url,
         data: json_data,
         dataType: "json",
         contentType: "application/json;charset=utf-8",
         async: false
     });
 }
 
 createPager = function (pagerId, totalCount, rowPerPage, currentPage, pageBlockCount, url) {
    var totalPage = Math.floor(totalCount / rowPerPage);  //전체 페이지 개수: 전체 개시물 개수/row카운트 +1
    if (totalCount % rowPerPage > 0) totalPage++;
    var startPage = pageBlockCount * Math.floor((currentPage - 1) / pageBlockCount) + 1; //페이저의 시작 페이지
    var currentBlock= Math.floor((currentPage - 1) / pageBlockCount) + 1;     //현재 페이지 블락
    var lastBlock= Math.floor((totalPage - 1) / pageBlockCount) + 1;    //마지막 페이지 블락
    var hasBeforeBlock = (currentBlock <= 1 ? false : true);    //이전 블락 존부
    var hasNextBlock = (currentBlock >= lastBlock ? false : true);  //다음 블락 존부
    var linkLiteral = (url.indexOf("?") == -1) ? "?" : "&";
    
    var pageHtml = '';
    if (hasBeforeBlock)  {
        $("#" + pagerId).append('<li><a href="' + url + linkLiteral + 'page=' + (startPage - 1)  + '"><i class="fa fa-angle-left"></i></a></li>');
    }
    else
        $("#" + pagerId).append('<li class="disabled"><a href="#"><i class="fa fa-angle-left"></i></a></li>');
    for (var pg = 0; pg < pageBlockCount; pg++) {
        if (startPage + pg > totalPage) break;
        var bpage = startPage + pg;
        if (currentPage == bpage) {
            pageHtml = '<li class="active"><a>' + bpage + '</a></li>';
        } else {
            pageHtml = '<li><a href="' + url + linkLiteral + 'page=' + bpage + '">' + bpage + '</a></li>';
        }
        $("#" + pagerId).append(pageHtml);
    }
    if (hasNextBlock) 
        $("#" + pagerId).append('<li><a href="' + url + linkLiteral + 'page=' + (startPage + pageBlockCount) + '"><i class="fa fa-angle-right"></i></a></li>');
    else
        $("#" + pagerId).append('<li class="disabled"><a href="#"><i class="fa fa-angle-right"></i></a></li>');
}

// getMemberGrade = function(grade) {
//     //사용자 구분\n0: 전체 관리자\n1: 학원 관리자\n2: 강사\n3: 부모\n4: 학원생
//     switch (grade)
//     {
//         case 0: return "Supervisor";
//         case 1: return "Academy Admin";
//         case 2: return "Teacher";
//         case 3: return "School Parent";
//         case 4: return "Student";
//     }
// }

dateFormat = function (date) {
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    if (month < 10)  {
        month = '0' + month;
    }

    var date = date.getDate();
    if (date < 10) {
        date = '0' + date;
    }
    
    return year + '-' + month + '-' + date;
}

$(".numberonly").on("keyup", function(){
    /* 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 , 8 : backspace, 9 : tab ,46 : delete, 37 : 왼쪽방향키 , 39 : 오른쪽방향키 */
    var keyID = event.which;

    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39) {
        // if (this.value > 100 || this.value < 0) {
        //     //alert("0에서 100 사이의 값만 입력해주세요");
        //     this.value = ''; //기존에 적혀있던 걸 다 지워준다.
        // };
    }
    else {
        //alert("숫자만 입력 가능합니다.");
        this.value = this.value.replace(/[^0-9\.]/g, ''); //숫자를 제외한 문자를 지워준다.
    }
});

clipboardCopy = function (val) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = val;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

// URL 인코딩 디코딩, Ajax 데이터 전송 시 인코딩해서 보내면 특수 문자가 안깨진다
$.extend({
    URLEncode: function (s) {
        s = encodeURIComponent(s);
        s = s.replace(/\~/g, '%7E').replace(/\!/g, '%21').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\'/g, '%27');
        s = s.replace(/%20/g, '+');
        return s;
    },
    URLDecode: function (s) {
        s = s.replace(/\+/g, '%20');
        s = decodeURIComponent(s);
        return s;
    },
    HTMLEncode: function (s) {
        //return jQuery("<div />").text(s).html();
        return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    },
    HTMLDecode: function (s) {
        //s = s.replace(/&lt/g, "<").replace(/&gt/g, ">").replace(/&amp/g, "&").replace(/&quot/g, "\"").replace(/&#39/g, "'");
        return s
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
        return s;
    }
});

function checkMobile() { 
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기 
    if (varUA.indexOf('android') > -1) { // 안드로이드 
        return "android"; 
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1 || varUA.indexOf('ios')) { // IOS 
        return "ios"; 
    } else { // IOS, 안드로이드 외 
        return "other"; 
    } 
}
