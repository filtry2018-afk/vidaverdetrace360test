window.logo = function(){
  return '<img src="assets/logo-final-v6.jpg?v=6" alt="Vida Verde BioTech LTDA">';
};
try {
  if (typeof current === 'function' && current()) dashboard();
  else auth();
} catch (e) {
  console.error('Vida Verde logo refresh failed', e);
}
