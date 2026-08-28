(function(){
  window.logo=logo=function(){
    return '<img class="vv-logo-full" src="./icons/logo-full.png?v=17" alt="Vida Verde BioTech LTDA">';
  };
  function refreshBrand(){
    try{
      if(typeof current==='function' && current()){
        if(typeof dashboard==='function') dashboard();
      }else if(typeof auth==='function'){
        auth();
      }
    }catch(e){console.error('Vida Verde branding refresh',e);}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',refreshBrand,{once:true});
  else refreshBrand();
})();
