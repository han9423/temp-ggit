(()=>{
    new function FuncList1(){
        var list2 =    '<li class="funcList2">' +
                            '<div class="icon2"></div>'+
                            '<span class="createRepo">git分支管理</span>'+
                        '</li>'
        $('.container ul').append(list2);
    }
    
    $('.funcList2').click(function(){
        // $.load()
    })
})()
