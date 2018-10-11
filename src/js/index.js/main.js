   {
    window.onscroll = function(){
        if(window.scrollY > 0){
        pageTabsNavbar.classList.add('sticky')
        }else{
        pageTabsNavbar.classList.remove('sticky')
        }
      }
}