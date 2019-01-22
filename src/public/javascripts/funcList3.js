(()=>{
    new function FuncList3(){
        var list3 =    '<li class="funcList3">' +
                            '<div class="icon3"></div>'+
                            '<span class="createRepo">克隆github仓库</span>'+
                        '</li>'
        $('.container ul').append(list3);
    }

    $('.funcList3').click(function(){
        if(!$('body').hasClass('informed')){
            $.get('html/inform3.htm',function(data){
                $('footer').after(data)
            })
            $('body').addClass('informed')
        }
    })
})()
