(function(){
  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone=window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;

  function installAction(){
    if(isStandalone){
      alert(lang==='pt'?'O aplicativo já está instalado neste dispositivo.':'The app is already installed on this device.');
      return;
    }
    if(typeof deferredPrompt!=='undefined' && deferredPrompt){
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(()=>{ deferredPrompt=null; });
      return;
    }
    if(isIOS){
      alert(lang==='pt'?'No iPhone: abra no Safari, toque em Compartilhar e escolha “Adicionar à Tela de Início”.':'On iPhone: open in Safari, tap Share and choose “Add to Home Screen”.');
    }else{
      alert(lang==='pt'?'No Android: abra esta página no Chrome, toque no menu ⋮ e escolha “Instalar aplicativo” ou “Adicionar à tela inicial”.':'On Android: open this page in Chrome, tap the ⋮ menu and choose “Install app” or “Add to Home screen”.');
    }
  }

  window.logo=logo=function(){
    return '<img class="vv-logo-full" src="./icons/logo-full.png?v=13" alt="Vida Verde BioTech LTDA">';
  };

  window.showLogin=showLogin=function(){
    $('#tabLogin').classList.add('active');
    $('#tabReg').classList.remove('active');
    $('#authForm').innerHTML=`<form id="loginForm" class="vv-login-form">
      <label>${tr('email')}</label>
      <input name="email" type="email" required autocomplete="username">
      <label>${tr('password')}</label>
      <input name="password" type="password" required autocomplete="current-password">
      <div id="msg"></div>
      <button class="btn primary full vv-login-button" style="margin-top:18px">${tr('login')}</button>
    </form>`;
    $('#loginForm').onsubmit=e=>{
      e.preventDefault();
      const f=new FormData(e.target);
      const u=get(K.users).find(x=>x.email.toLowerCase()===String(f.get('email')).toLowerCase()&&x.password===f.get('password'));
      if(!u){$('#msg').innerHTML=`<div class="notice error">${tr('wrong')}</div>`;return;}
      localStorage.setItem(K.session,u.id);
      dashboard();
    };
  };

  window.auth=auth=function(){
    const w=get(K.waste),cities=new Set(w.map(x=>`${x.city}/${x.state}`)),urgent=w.filter(x=>x.priority==='urgent').length;
    $('#app').innerHTML=`<div class="auth vv-auth">
      <section class="hero vv-hero">
        <div class="vv-logo-card">${logo()}</div>
        <div class="vv-hero-copy">
          <span class="vv-kicker">VIDA VERDE TRACE360 · TEST</span>
          <h2>${tr('title')}</h2>
          <p>${tr('sub')}</p>
        </div>
        <div class="stats vv-stats">
          <div class="stat"><b>${w.length}</b><span>${tr('streams')}</span></div>
          <div class="stat"><b>${cities.size}</b><span>${tr('cities')}</span></div>
          <div class="stat"><b>${urgent}</b><span>${tr('urgent')}</span></div>
        </div>
      </section>
      <section class="authpanel vv-authpanel">
        <div class="card vv-card">
          <div class="toprow vv-toprow">
            <div><span class="vv-panel-kicker">Vida Verde BioTech LTDA</span><b>Trace360 Waste Intelligence</b></div>
            <div class="lang"><button data-lang="pt" class="${lang==='pt'?'active':''}">PT</button><button data-lang="en" class="${lang==='en'?'active':''}">EN</button></div>
          </div>
          <div class="tabs"><button id="tabLogin" class="active">${tr('login')}</button><button id="tabReg">${tr('register')}</button></div>
          <div id="authForm"></div>
          <div class="vv-install-box">
            <div class="vv-install-text"><strong>${lang==='pt'?'Instalar no telefone':'Install on phone'}</strong><span>${lang==='pt'?'Acesso rápido em tela cheia, direto pelo ícone Vida Verde.':'Fast full-screen access from the Vida Verde icon.'}</span></div>
            <button type="button" id="installPrimary" class="btn secondary full vv-install-button">${tr('install')}</button>
          </div>
          <div class="help vv-help">
            <b>${tr('support')}</b><br>
            <a href="mailto:contact@vidaverdebiotech.com.br">contact@vidaverdebiotech.com.br</a><br>
            <a href="https://wa.me/5551999261234" target="_blank" rel="noopener">WhatsApp +55 51 99926-1234</a><br>
            <a href="https://www.vidaverdebiotech.com.br" target="_blank" rel="noopener">www.vidaverdebiotech.com.br</a><br><br>
            <button class="ghost" id="publicReq">${tr('request')}</button>
          </div>
        </div>
      </section>
    </div>`;
    document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem(K.lang,lang);auth();});
    $('#tabLogin').onclick=showLogin;
    $('#tabReg').onclick=showReg;
    $('#publicReq').onclick=showPublicRequest;
    $('#installPrimary').onclick=installAction;
    showLogin();
  };

  const originalDashboard=window.dashboard;
  if(typeof originalDashboard==='function'){
    window.dashboard=dashboard=function(){
      originalDashboard();
      const brand=document.querySelector('.appbrand');
      if(brand){
        brand.innerHTML=`${logo()}<span>Vida Verde · Trace360</span>`;
      }
    };
  }

  if(typeof current==='function' && current()) dashboard(); else auth();
})();
