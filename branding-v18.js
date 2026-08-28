(function(){
  window.logo=logo=function(){
    return '<img class="vv-logo-full" src="./icons/logo-exact-v18.png" alt="Vida Verde BioTech LTDA">';
  };
  function refresh(){
    try{
      if(typeof current==='function' && current()){
        if(typeof dashboard==='function') dashboard();
      }else if(typeof auth==='function'){
        auth();
      }
    }catch(e){console.error('Vida Verde v18 branding',e);}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',refresh,{once:true});
  else refresh();
})();
