(function(){
  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone=window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;

  function installAction(){
    if(isStandalone) return;
    if(typeof deferredPrompt!=='undefined' && deferredPrompt){
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(()=>{ deferredPrompt=null; polish(); });
      return;
    }
    if(isIOS){
      alert('No iPhone: abra esta página no Safari, toque em Compartilhar e escolha “Adicionar à Tela de Início”.');
    }else{
      alert('No Android: abra o menu do Chrome (⋮) e escolha “Instalar aplicativo” ou “Adicionar à tela inicial”.');
    }
  }

  function polish(){
    const brandmark=document.querySelector('.hero .brandmark');
    if(brandmark){
      brandmark.innerHTML='<img class="vv-full-logo" src="icons/logo-full.png?v=12" alt="Vida Verde BioTech LTDA">';
    }

    document.querySelectorAll('.notice.small').forEach(el=>{
      if(/Demo admin|VidaVerde123/i.test(el.textContent||'')) el.remove();
    });

    const card=document.querySelector('.authpanel .card');
    if(card && !document.getElementById('installPrimary')){
      const help=card.querySelector('.help');
      const block=document.createElement('div');
      block.className='install-panel';
      block.innerHTML='<div class="install-copy"><strong>Vida Verde Trace360</strong><span>Instale no telefone para acesso rápido em tela cheia.</span></div><button type="button" id="installPrimary" class="btn primary full install-primary">Instalar aplicativo</button>';
      if(help) card.insertBefore(block,help); else card.appendChild(block);
      document.getElementById('installPrimary').onclick=installAction;
    }

    const appBrand=document.querySelector('.appbrand');
    if(appBrand){
      const img=appBrand.querySelector('img');
      if(img){img.src='icons/logo-full.png?v=12';img.className='vv-header-logo';}
    }
  }

  const oldShowLogin=window.showLogin;
  if(typeof oldShowLogin==='function'){
    window.showLogin=function(){oldShowLogin();polish();};
  }
  const oldAuth=window.auth;
  if(typeof oldAuth==='function'){
    window.auth=function(){oldAuth();polish();};
  }
  const oldDashboard=window.dashboard;
  if(typeof oldDashboard==='function'){
    window.dashboard=function(){oldDashboard();polish();};
  }

  window.addEventListener('beforeinstallprompt',()=>setTimeout(polish,0));
  const observer=new MutationObserver(()=>polish());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',polish); else polish();
})();
