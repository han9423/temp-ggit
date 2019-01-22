(()=>{
    new function FuncList3(){
        var list4 =    '<li class="funcList4">' +
                            '<div class="icon4"></div>'+
                            '<span class="createRepo">git全局设置</span>'+
                        '</li>'
        $('.container ul').append(list4);
    }


    $('.funcList4').click(function(){
        $('.information').empty()
        $('.information').load('html/gitConfig.htm')
    })
})()
