(async()=>{
  const host=document.getElementById('brandLogoHost');
  if(!host)return;
  const files=['logo/part01.txt','logo/part02.txt','logo/part03.txt','logo/part04.txt','logo/part05.txt','logo/part06.txt','logo/part07.txt','logo/part08.txt','logo/part09.txt'];
  try{
    const parts=await Promise.all(files.map(f=>fetch(f+'?v=102',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(f);return r.text();})));
    const test=new Image();
    test.alt='Vida Verde BioTech LTDA';
    test.className='brand-logo';
    test.onload=()=>{host.replaceChildren(test);host.classList.add('logo-ready');};
    test.onerror=()=>{host.replaceChildren();host.classList.add('logo-error');};
    test.src='data:image/jpeg;base64,'+parts.join('').replace(/\s+/g,'');
  }catch(e){
    console.error('Logo load error',e);
    host.replaceChildren();
    host.classList.add('logo-error');
  }
})();
