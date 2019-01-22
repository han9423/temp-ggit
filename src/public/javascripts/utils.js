/**
 * @classdesc this is a global utils
 */

class Utils{
    isClicked(ele){
        if(ele.hasClass('clicked')){
            return false;
        }else{
            ele.addClass('clicked');
            return true;
        }
    }
    removeClicked(ele){
        if(ele.hasClass('clicked')){
            ele.removeClass('clicked');
        }
    }
    popUpToggle(ele, cele){
        // if(){}
        ele.show();
        // ele.addClass('showed');
        cele.click(function(){ele.hide();})
    }
    /**
     * 
     * @param { String } content  * @param { Number } time 
     */
    ggitNotification(content, time=3000){
        const $isShowed = $('.mrInform').hasClass('showed');
        if(!$isShowed){
            $('.mrInform').addClass('showed').show();
            $('.mrInform').text(content);
            setTimeout(function(){
                $('.mrInform').text('').hide();
                $('.mrInform').removeClass('showed');
            },time)
        }
    } 
}

const utils = new Utils();




