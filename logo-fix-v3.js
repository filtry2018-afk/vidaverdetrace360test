window.logo = function(){
  return '<img src="assets/logo-official-v3.png?v=3" alt="Vida Verde BioTech LTDA">';
};
try {
  if (typeof current === 'function' && current()) dashboard();
  else auth();
} catch (e) {
  console.error('Vida Verde logo refresh failed', e);
}
