(function(global, factory){
    factory();
})(this, function(){

    const handleToggle = () => {

    }
    const createLocalRepo = ()=>{
        $('.createLocalRepo').click(function(){
            utils.popUpToggle(
                $('.ggitPopup'), 
                $('.popCancel')
            ) // mark
        })
    }

    const manageBranch = () => {
        $('.manageBranch').click(function(){
            utils.popUpToggle(
                $('.ggitPopup'), 
                $('.popCancel')
            ) // mark
        })
    }
    const globalSetting = () => {
        
    }
    (()=>{
        handleToggle();
        createLocalRepo();
        manageBranch();
    })()

})
