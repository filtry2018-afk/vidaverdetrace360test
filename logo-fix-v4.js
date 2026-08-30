window.logo = function(){
  return '<img src="assets/logo-final-v5.jpg?v=5" alt="Vida Verde BioTech LTDA">';
};
try {
  if (typeof current === 'function' && current()) dashboard();
  else auth();
} catch (e) {
  console.error('Vida Verde logo refresh failed', e);
}
