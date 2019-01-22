(function(global, factory){
    factory();
})(this, function(){

    const backBtn = `<div id='backBtn' class='backToList'>返回</div>`
    
    const isExistStorage = ( argv ) =>{
        return window.localStorage.getItem( argv ) ? true : false;
    }
    
    // render about
    const renderAbout = (data) => {
        let html = [];
        for(let prop in data){
            html.push(`<li><span>${prop}</span>:&nbsp<span>${data[prop]}</span></li>`);
        }
        let aboutAppList = `<ul class='aboutApp'>${html.join('')}</ul>${backBtn}`;
        setTimeout(()=>{
            $('.menuList').prepend(aboutAppList);
            $('#backBtn').click(function (){
                $(this).hide();
                $('.aboutApp').hide();
                $('.menuContainer').fadeIn(200);
                $('.aboutWrapper').fadeIn(200);
                utils.removeClicked($('.aboutAuthor'));
            })
        }, 200)
    }
    // menu function 
    const showAboutApp = ()=>{   
        $('.aboutAuthor').click(function(){
            if(utils.isClicked($(this))){
                $('.menuContainer').fadeOut(200);
                $(this).children('.aboutWrapper').addClass('displayNone').fadeOut(200);
    
                if(isExistStorage('aboutApp')){
                    renderAbout(JSON.parse(localStorage.getItem('aboutApp')));    
                }else{
                    $.get('/index/about', function(data){
                        localStorage.setItem('aboutApp', JSON.stringify(data));
                        renderAbout(data);
                    }) 
                }
            }
        })
    }
    
    const ggitMenu = () => {
        showAboutApp();
        $('.menuBtn').click(function(){
            const $isOut = $('.menuList').hasClass('menuListOut');
            if(!$isOut){
                $('.menuBtn').addClass('menuBtnOut');
                $('.menuList').addClass('menuListOut');
            }else{
                $('.menuBtn').removeClass('menuBtnOut');
                $('.menuList').removeClass('menuListOut');
            }
        })
    }
    
    const initMode = ()=>{
        $.get('/index/status', function(status){
            status === 'true' ? utils.ggitNotification('在线模式'): utils.ggitNotification('离线模式');
        })
    }

    (() => {
        initMode();
        ggitMenu();
    })()
})
