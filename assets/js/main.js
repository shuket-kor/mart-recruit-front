jQuery(function ($) {

    'use strict';
 
    // Change Dropdown
    // Slick Slider
    // CounterUp
    // Checkbox Icon Change
    // Text Edit
    // Remove Item
    // Item clone
    // Gmap


    // -------------------------------------------------------------
    //  Toggle Menu for Mobile
    // -------------------------------------------------------------

    mobileDropdown ();
    function mobileDropdown () {
      if($('.tr-menu').length) {
        $('.tr-menu .tr-dropdown').on("append", function () {
          return '<i class="fa fa-angle-down icon" aria-hidden="true"></i>';
        });
        $('.tr-menu .tr-dropdown .icon').on('click', function () {
          $(this).parent('li').children('ul').slideToggle();
        });
      }
    }  
    
    // -------------------------------------------------------------
    //  Change Dropdown
    // -------------------------------------------------------------


    $('.tr-change-dropdown').on('click', '.tr-change a', function(ev) {
        if ("#" === $(this).attr('href')) {
            ev.preventDefault();
            var parent = $(this).parents('.tr-change-dropdown');
            parent.find('.change-text').html($(this).html());
        }
    });
   


    // -------------------------------------------------------------
    //  Slick Slider
    // -------------------------------------------------------------  

      
   $(".testimonial-slider").slick({
        infinite: true,
        slidesToShow:1,
        autoplay:true,
        autoplaySpeed:10000,
        slidesToScroll: 1,       
    });            



    // -------------------------------------------------------------
    // CounterUp
    // -------------------------------------------------------------


    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });



    // -------------------------------------------------------------
    //  Checkbox Icon Change
    // -------------------------------------------------------------


    $('input[type="checkbox"]').change(function(){
        if($(this).is(':checked')){
            $(this).parent("label").addClass("checked");
        } else {
            $(this).parent("label").removeClass("checked");
        }
    });
   

    // -------------------------------------------------------------
    //  Text Edit
    // -------------------------------------------------------------


     $('.code-edit').jqte();



    // -------------------------------------------------------------
    //  Remove Item
    // -------------------------------------------------------------


    $( ".remove-icon" ).on('click', function() {
        $(this).parents('.remove-item').fadeOut();
    });

    
    // -------------------------------------------------------------
    //  item clone
    // -------------------------------------------------------------

    $(document).ready(function(){
        var regex = /^(.*)(\d)+$/i;
        var cloneitem = $("#addhistory").length;
        $('#clone').click(function() {
            $('#addhistory').clone()
                .appendTo('.additem-work')
                .attr("id", "#addhistory" +  cloneitem)
                .find("*").each(function() {
                    var id = this.id || "";
                    var match = id.match(regex) || [];
                    if (match.length == 3) {
                        this.id = match[1] + (cloneitem);
                    };
            });
            // function careerContent(){
            //     var contentString = '';
            //     contentString +='<div id="addhistory'+i+'"'+'class="additem">'
            //     contentString +='<span class="icon clone" style="display: none;"><i class="fa fa-plus" aria-hidden="true"></i></span>'
            //     contentString +='<span class="icon remove"><i class="fa fa-times" aria-hidden="true"></i></span>'
            //     contentString +='<div class="code-edit-small">'
            //     contentString +='<label>마트 이름</label>'
            //     contentString +=`<div class="code-edit"><%= listCareer.COMPANY %></div>`
            //     contentString +='<div class="row">'
            //     contentString +='<div class="col-sm-6 col-md-4"><label>시작</label><div class="calendar"><input type="date" name="" class="form-control" value="" /></div></div>'
            //     contentString +='<div class="col-sm-6 col-md-4"><label>끝</label><div class="calendar"><input type="date" class="form-control" value="" /></div></div>'
            //     contentString +='<div class="col-md-4"><div class="checkbox"><label for="logged-1"><div type="checkbox" name="logged-1" id="logged-1" />재직중입니다.</label></div></div>'
            //     contentString +='<div class="col-sm-6 col-md-4"><label>경력기간</label><div class="code-edit"></div></div>'
            //     contentString +='<div class="col-sm-6 col-md-4"><label>직급</label><div class="code-edit"></div></div>'
            //     contentString +='<div class="col-sm-6 col-md-3"><label>담당 업무</label><div class="code-edit"></div></div>'
            //     contentString +='<div class="col-sm-6 col-md-3"><label>근무 지역</label><div class="code-edit"></div></div>'
            //     contentString +='<div class="col-sm-6 col-md-3"><label>최종 연봉</label><div class="code-edit"></div></div>'
            //     contentString +='</div>'
            //     contentString +='</div></div>'
            //     i ++;
            //     return contentString;
            // }
        cloneitem++;
        });

        var cloneitem2 = $("#add-edu").length;
        $('#edu-clone').click(function() {
            $('#add-edu').clone()
                .appendTo('.additem-edu')
                .attr("id", "#add-edu" +  cloneitem2)
                .find("*").each(function() {
                    var id = this.id || "";
                    var match = id.match(regex) || [];
                    if (match.length == 3) {
                        this.id = match[1] + (cloneitem2);
                    };
            });
        cloneitem2++;
        });
       
        var cloneitem3 = $("#achievement").length;
        $('#achiev-clone').click(function() {
            $('#achievement').clone()
                .appendTo('.additem-achiev')
                .attr("id", "#achievement" +  cloneitem3)
                .find("*").each(function() {
                    var id = this.id || "";
                    var match = id.match(regex) || [];
                    if (match.length == 3) {
                        this.id = match[1] + (cloneitem3);
                    };
            });
        cloneitem3++;
        });

        
        $(document).on('click','.remove', function(){
            $(this).parents(".additem").remove();
        });

    });


    


// script end
});



