window.logo = function(){
  return '<img src="assets/logo-original-lossless.png?v=7" alt="Vida Verde BioTech LTDA">';
};
try {
  if (typeof current === 'function' && current()) dashboard();
  else auth();
} catch (e) {
  console.error('Vida Verde logo refresh failed', e);
}
