   {
    window.onscroll = function(){
        console.log(window.scrollY)
        if(window.scrollY > 0){
        pageTabsNavbar.classList.add('sticky')
          console.log(1)
        }else{
        pageTabsNavbar.classList.remove('sticky')
          console.log(2)
        }
      }
}