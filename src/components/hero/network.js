// The care network behind the home hero: roles on an octagon around the headline, a soft light that
// wanders along the lines, a split-flap board, and the goal cards that re-arrange the network.
// Ported from the approved prototype (behaviour modelled on the docs.abdm.gov.in hero).
// startNetwork() is called by Hero.tsx once the markup is on the page; it returns a cleanup function.

export function startNetwork() {
  let stopped = false;
  const cleanups = [];
  const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); cleanups.push(() => target.removeEventListener(type, fn, opts)); };
  const HOME = 'Curengo RMIS';

  /* ---------- content ---------- */
  // Role icons: Healthicons (MIT, github.com/resolvetosavelives/healthicons), outline style, inlined
  const ICONS = {
      "patient": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M32 9a1 1 0 0 1-1-1V6h-2v2c0 1.306.835 2.418 2 2.83V12h-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-1v-1h5v12.066H20.11a.3.3 0 0 1-.218-.09l-.366-.37l.369-.367a3.77 3.77 0 0 0 .001-5.333l-1.8-1.8a3.77 3.77 0 0 0-5.333-.003l-.704.704a3.95 3.95 0 0 0-3.892 1.021a4.034 4.034 0 0 0 0 5.676l.833.839V34H6v2h3.05a3.5 3.5 0 1 0 4.899 0h20.102a3.5 3.5 0 1 0 4.899 0H42v-2h-4v-3h.066C40.24 31 42 29.224 42 27.033a3.97 3.97 0 0 0-2-3.455V11a2 2 0 0 0-2-2zm-18.174 7.868l4.29 4.32l.365-.364a1.77 1.77 0 0 0 0-2.504l-1.8-1.8a1.77 1.77 0 0 0-2.504-.002zm2.45 13.8c.21.212.497.332.796.332H36v3H11v-8.644zm2.198-6.283c.431.434 1.02.681 1.636.681h17.956c1.052 0 1.934.865 1.934 1.967S39.119 29 38.066 29H17.438l-7.852-7.905a2.034 2.034 0 0 1 0-2.857a1.953 1.953 0 0 1 2.782 0zM13 38.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M36.5 40a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M31 18v-4h2v4z\" clip-rule=\"evenodd\"/></svg>",
      "partner": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><g fill=\"currentColor\"><path d=\"M16 9v3h-3v2h3v3h2v-3h3v-2h-3V9z\"/><path fill-rule=\"evenodd\" d=\"M13 6a3 3 0 0 0-3 3v1H6v19h22V10h-4V9a3 3 0 0 0-3-3zm8 14a3 3 0 0 0 3-3v-1h2v11h-5v-6h-8v6H8V16h2v1a3 3 0 0 0 3 3zM12 9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1zm-4 3h2v2H8zm18 2h-2v-2h2zm-7 9v4h-4v-4zm11 5a4 4 0 0 1 4-4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4m4-2a2 2 0 1 0 0 4a2 2 0 1 0 0-4m0 7c-2.67 0-8 1.462-8 4.364V40h-9c-.729 0-1.202-.263-1.503-.602C15.18 39.041 15 38.537 15 38v-3.586l3.293 3.293l1.414-1.414L14 30.586l-5.707 5.707l1.414 1.414L13 34.414V38c0 .963.32 1.959 1.003 2.727C14.702 41.513 15.729 42 17 42h25v-4.636C42 34.462 36.67 33 34 33m-5.706 3.867c-.283.285-.294.441-.294.497V40h12v-2.636c0-.056-.01-.212-.294-.497c-.3-.303-.805-.634-1.506-.94C36.788 35.308 35.06 35 34 35s-2.788.31-4.2.926c-.701.306-1.205.638-1.506.941\" clip-rule=\"evenodd\"/></g></svg>",
      "physio": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><g fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"><path d=\"M26.343 14.974a4.487 4.487 0 1 0 0-8.974a4.487 4.487 0 0 0 0 8.974m0-2a2.487 2.487 0 1 0 0-4.974a2.487 2.487 0 0 0 0 4.974M10 28a2 2 0 0 0-2 2v12H6V30a4 4 0 0 1 4-4h6.911c-.494-5.03.56-9.083 3.631-10.731a1 1 0 0 1 .12-.054l.024-.01c1.306-.485 2.713-.458 3.977.196c1.202.621 2.011 1.67 2.519 2.76q.281.602.523 1.13a73 73 0 0 0 1.026 2.169c.435.865.75 1.364 1.024 1.683c.231.27.426.402.676.5c.3.117.8.229 1.709.256A2.61 2.61 0 0 1 34.622 26H38a4 4 0 0 1 4 4v12h-2V30a2 2 0 0 0-2-2h-3.797a2.61 2.61 0 0 1-2.22 1.117c-1.224-.037-2.383-.194-3.451-.612A7 7 0 0 1 27.5 28h-2.126l-.004.023l3.88 3.828c.26.257.463.565.596.904l2.23 5.68a2.61 2.61 0 1 1-4.86 1.908l-2.027-5.165l-7.037-6.944a3 3 0 0 1-.21-.234zm10.762 0l5.983 5.904a1 1 0 0 1 .229.346l2.104 5.362a.61.61 0 1 0 1.136-.445l-2.23-5.68a.6.6 0 0 0-.139-.212l-4.26-4.204a1 1 0 0 1-.28-.9l.033-.171zm2.959-2l.464-2.429a1 1 0 0 1 1.868-.277c.402.766.803 1.416 1.258 1.947c.543.631 1.162 1.094 1.948 1.401c.775.303 1.682.443 2.784.476a.61.61 0 1 0 .037-1.22c-1.029-.03-1.782-.16-2.377-.392c-.582-.228-1.041-.565-1.466-1.06c-.435-.507-.836-1.18-1.293-2.087a75 75 0 0 1-1.05-2.219l-.005-.012q-.242-.527-.52-1.123c-.38-.815-.924-1.465-1.625-1.828c-.701-.362-1.5-.404-2.313-.115c-1.9 1.066-3.021 3.959-2.518 8.854l.016.084z\"/><path d=\"M18.557 30.9a1 1 0 0 0-1.651.437l-.983 3.318l-1.918 2.889a3 3 0 0 0 4.999 3.318l2.167-3.264a3 3 0 0 0 .377-.807l.524-1.77a1 1 0 0 0-.266-1.005zm-.76 4.467l.56-1.888l1.625 1.558l-.352 1.186q-.042.144-.125.269l-2.167 3.264a1 1 0 0 1-1.667-1.106l2.001-3.014q.083-.125.126-.27\"/></g></svg>",
      "pharmacy": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M18.862 8.353c-.568 1.332-.614 3.037-.557 4.647H37c.552 0 1.006.45.943.998c-.385 3.365-2.699 6.293-6.066 8.097c.085.393.123.798.123 1.208c0 1.819-1.377 3.255-2.849 4.167A10.6 10.6 0 0 1 26 28.759v-2.067a8.6 8.6 0 0 0 2.099-.923C29.377 24.978 30 24.066 30 23.303q0-.185-.014-.356c-1.497.557-3.14.912-4.871 1.019V32h-2v-8.022c-6.898-.338-12.442-4.6-13.058-9.98c-.063-.548.39-.998.943-.998h5.304c-.057-1.633-.021-3.698.718-5.431c.424-.995 1.09-1.91 2.113-2.566C20.155 4.35 21.452 4 23.058 4c1.967 0 3.567.714 4.656 1.406c.547.347.975.695 1.27.959a8 8 0 0 1 .466.455l.01.01l.002.004l.002.001s0 .002-.734.653l.735-.651a1 1 0 0 1-1.495 1.328l-.01-.011l-.058-.06a6 6 0 0 0-.253-.24a8 8 0 0 0-1.007-.76C25.762 6.536 24.533 6 23.058 6c-1.316 0-2.215.284-2.843.686c-.624.4-1.055.967-1.353 1.667M12.306 15c1.175 3.76 5.667 7 11.694 7s10.52-3.24 11.694-7z\" clip-rule=\"evenodd\"/><path d=\"M16 42v2h16v-2h-3.019c.66-.812 1.019-1.835 1.019-3c0-1.545-.632-2.84-1.757-3.724C27.143 34.413 25.655 34 24 34c-1.483 0-2.8-.13-3.719-.539c-.441-.196-.747-.438-.946-.722c-.194-.277-.335-.664-.335-1.24c0-.574.14-.96.335-1.238c.199-.284.505-.526.946-.722c.477-.212 1.06-.35 1.719-.432v-2.014c-.894.096-1.77.28-2.531.618c-.684.304-1.315.75-1.773 1.403c-.462.66-.696 1.461-.696 2.386s.234 1.726.696 2.386c.458.653 1.09 1.099 1.773 1.403c1.33.591 3.014.71 4.531.71c1.346 0 2.356.338 3.007.85c.625.49.993 1.196.993 2.15c0 .956-.368 1.661-.993 2.152c-.457.359-1.09.632-1.892.763V38h-2v4z\"/></g></svg>",
      "diet": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M5.027 12.004c.15 2.691.916 4.357 2.038 5.384a1.9 1.9 0 0 0-.749 1.832c.572 3.635 2.003 11.323 4.937 19.989a1.827 1.827 0 0 0 3.494 0c2.933-8.666 4.365-16.354 4.937-19.989a1.9 1.9 0 0 0-.749-1.832c1.122-1.027 1.888-2.693 2.038-5.384a.954.954 0 0 0-.974-.998c-1.629.024-2.922.123-3.93.462c-.417-1.099-1.258-2.136-2.523-3.082a.91.91 0 0 0-1.092 0c-1.255.939-2.093 1.966-2.513 3.055c-.98-.289-2.262-.404-3.937-.433a.954.954 0 0 0-.977.996m9.854 1.973l-.683-1.8c-.189-.499-.558-1.06-1.198-1.65c-.634.584-1.002 1.14-1.193 1.634l-.663 1.72l-1.768-.522c-.522-.154-1.234-.256-2.235-.311c.297 1.928 1.012 2.743 1.663 3.164c.932.603 2.29.786 4.166.788h.06c1.877-.002 3.234-.185 4.165-.788c.652-.421 1.368-1.237 1.665-3.17c-.97.051-1.651.152-2.154.321zM8.306 19h9.388c-.287 1.807-.784 4.6-1.57 8H12v2h3.645c-.69 2.782-1.56 5.882-2.645 9.13a115 115 0 0 1-.995-3.13H13v-2h-1.582a126 126 0 0 1-2.197-9H12v-2H8.827a107 107 0 0 1-.521-3\" clip-rule=\"evenodd\"/><path d=\"M38.242 28.03a1 1 0 0 1 .728 1.212a6.43 6.43 0 0 1-4.728 4.728a1 1 0 0 1-.485-1.94a4.43 4.43 0 0 0 3.273-3.273a1 1 0 0 1 1.212-.727\"/><path fill-rule=\"evenodd\" d=\"M32.65 21.027c-1.108-2.593-.916-5.347 1.057-7.32l-1.414-1.414c-2.33 2.33-2.734 5.377-1.953 8.178C25.764 18.4 21 22.208 21 28c0 5.523 4.925 10 11 10s11-4.477 11-10c0-6.22-5.495-10.151-10.35-6.973M32 24.061l-1.25-1c-1.858-1.486-3.688-1.403-5.074-.547C24.21 23.419 23 25.357 23 28c0 4.243 3.846 8 9 8s9-3.757 9-8c0-2.642-1.21-4.58-2.676-5.486c-1.386-.856-3.217-.939-5.075.548z\" clip-rule=\"evenodd\"/><path d=\"M34 18c3 0 5-2 5-5c-3 0-5 2-5 5\"/></g></svg>",
      "nurse": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><g fill=\"currentColor\"><path d=\"M27 13v-2h-2V9h-2v2h-2v2h2v2h2v-2z\"/><path fill-rule=\"evenodd\" d=\"m31.32 16.767l1.978-5.606c.536-1.52-.228-3.24-1.829-3.747C29.61 6.824 26.57 6 24 6s-5.61.824-7.47 1.414c-1.6.508-2.364 2.228-1.828 3.747l1.979 5.606a8 8 0 1 0 14.639 0M24 8c-2.24 0-5.029.738-6.865 1.32c-.46.146-.73.658-.547 1.176l2.024 5.734c3.587-1.14 7.189-1.14 10.776 0l2.024-5.734c.183-.518-.087-1.03-.547-1.175C29.029 8.738 26.239 8 24 8m5.806 10.481h-.001a1 1 0 0 1-.156-.045c-3.774-1.415-7.524-1.415-11.298 0a1 1 0 0 1-.157.045a6 6 0 1 0 11.613 0\" clip-rule=\"evenodd\"/><path d=\"M34 34h2v2h-2v2h-2v-2h-2v-2h2v-2h2z\"/><path fill-rule=\"evenodd\" d=\"M16.879 28S6 31.393 6 35.467V42h36v-6.533C42 31.393 31.121 28 31.121 28l-5.972 4.193a2 2 0 0 1-2.298 0zm14.562 2.22l-5.142 3.61a4 4 0 0 1-4.597 0l-5.143-3.61a38 38 0 0 0-4.227 1.776c-1.296.646-2.482 1.363-3.316 2.092C8.115 34.875 8 35.343 8 35.467V40h32v-4.533c0-.124-.115-.592-1.016-1.38c-.834-.728-2.02-1.445-3.317-2.092a38 38 0 0 0-3.547-1.528q-.376-.14-.679-.248\" clip-rule=\"evenodd\"/></g></svg>",
      "doctor": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M34 16c0 5.523-4.477 10-10 10s-10-4.477-10-10S18.477 6 24 6s10 4.477 10 10m-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0M17.914 28.855l.011.022l.075.147h11.749c.229-.434.748-1.126 1.251-1.011c1.13.257 2.268.615 3.361 1.056l.033-.016l.011.022l.008.015C38.528 30.762 42 33.596 42 36.57V42H6v-5.43c0-3.775 5.596-7.327 11-8.557c.441-.1.703.42.914.842m14.79 1.728a20 20 0 0 0-1.301-.407l-.446.848H16.793l-.414-.787l-.36.108q-.011.098-.016.224c-.013.345.013.754.07 1.17a8 8 0 0 0 .28 1.281a3 3 0 1 1-1.957.444l-.008-.028a10 10 0 0 1-.297-1.426a10 10 0 0 1-.084-.928c-1.236.528-2.389 1.166-3.355 1.87C8.73 34.356 8 35.668 8 36.57V40h32v-3.43c0-.903-.73-2.215-2.652-3.617a16.6 16.6 0 0 0-2.666-1.562A10.5 10.5 0 0 1 34.434 33H35a1 1 0 0 1 .894.553l1 2c.07.139.106.292.106.447v2a1 1 0 0 1-1 1h-2v-2h1v-.764L34.382 35h-2.764L31 36.236V37h1v2h-2a1 1 0 0 1-1-1v-2c0-.155.036-.308.106-.447l1-2A1 1 0 0 1 31 33h1.362l.037-.124c.094-.321.178-.72.235-1.136c.056-.412.082-.815.07-1.157M17 36c0 .574-.462 1.015-1 1.015s-1-.44-1-1.015c0-.574.462-1.015 1-1.015s1 .44 1 1.015\" clip-rule=\"evenodd\"/></svg>"
  };
  // Eight participants on an octagon. Angle in degrees, 0 = right, counter-clockwise.
  const ROLES = [
    {id:'patient', label:'Patient',        icon:'patient',  at:112.5, small:true},
    {id:'partner', label:'Partner doctor', icon:'partner',  at:67.5},
    {id:'physio',  label:'Physio',         icon:'physio',   at:22.5,  small:true},
    {id:'pharmacy',label:'Pharmacy',       icon:'pharmacy', at:-22.5},
    {id:'diet',    label:'Dietitian',      icon:'diet',     at:-67.5, small:true},
    {id:'nurse',   label:'Nurse',          icon:'nurse',    at:-112.5,small:true},
    {id:'curengo', label:'Curengo',        icon:null,              at:-157.5},
    {id:'doctor',  label:'Doctor',         icon:'doctor',   at:157.5, small:true}
  ];
  const LINES = {
    patient:'Recovery tracked end to end',
    partner:['Follow every referral','Progress reports on your phone'],
    physio:'Progress you can measure',
    pharmacy:'Orders straight to dispensing',
    diet:'Calorie and protein plans',
    nurse:'Task lists for every shift',
    curengo:HOME,
    doctor:'Voice orders, drafted summaries'
  };
  const INTENTS = {
    RMIS:{gateway:'RMIS', hub:'curengo', primary:['doctor','nurse','physio','diet','curengo'], context:['pharmacy','patient'], stages:[
      {label:'Assess',    line:'Baseline on standard scales', route:['doctor','curengo','physio']},
      {label:'Plan',      line:'One care plan for the team',  route:['physio','curengo','nurse']},
      {label:'Nourish',   line:'Diet plan with protein goals',route:['diet','curengo','nurse']},
      {label:'Discharge', line:'Summary drafted for review',  route:['nurse','curengo','doctor']}]},
    PARTNER:{gateway:'Partner app', hub:'curengo', primary:['partner','curengo','doctor','patient'], context:['physio'], stages:[
      {label:'Refer',  line:'Patient referred to rehab',   route:['partner','curengo','doctor']},
      {label:'Follow', line:'Progress visible every week', route:['patient','curengo','partner']},
      {label:'Return', line:'Discharge summary sent back', route:['doctor','curengo','partner']}]},
    PATIENT:{gateway:'Patient app', hub:'curengo', primary:['patient','curengo','physio','diet'], context:['doctor'], stages:[
      {label:'Exercise', line:'Home exercise plan in the app', route:['physio','curengo','patient']},
      {label:'Eat well', line:'Meal plan with daily targets',  route:['diet','curengo','patient']},
      {label:'Report',   line:'Progress shared with the team', route:['patient','curengo','physio']}]}
  };

  /* ---------- helpers ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  // phones and iPads: no pointer/hover reactions (the light only wanders role to role) and dimmer lines
  const coarse = matchMedia('(pointer: coarse)');
  const narrow = matchMedia('(max-width: 900px)');
  const touchy = () => coarse.matches || narrow.matches;
  const N = Math.cos(22.5 * Math.PI / 180);
  const idx = id => ROLES.findIndex(r => r.id === id);
  const HUB = idx('curengo');
  const falloff = (d, r) => { const k = Math.max(0, 1 - d / r); return k * k; };
  const ease = t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  const glide = t => (1 - Math.cos(Math.PI * t)) / 2;   // gentle sine ease for the wandering light
  const angDiff = (a, b) => ((b - a) % 360 + 540) % 360 - 180;
  const unit = deg => { const c = Math.cos(deg * Math.PI / 180), s = -Math.sin(deg * Math.PI / 180), k = N / Math.max(Math.abs(c), Math.abs(s)); return {ux:c * k, uy:s * k}; };
  const PAIRS = ROLES.flatMap((_, i) => ROLES.slice(i + 1).map((__, j) => [i, i + 1 + j]));
  const key = (a, b) => 8 * Math.min(a, b) + Math.max(a, b);
  const roleOf = (intent, id) => intent.primary.includes(id) ? 'primary' : intent.context.includes(id) ? 'context' : 'background';

  /* ---------- split-flap board ---------- */
  const flapRow = document.getElementById('flapRow'), flapLabel = document.querySelector('.flap__label');
  const CELLS = Math.max(HOME.length, ...Object.values(LINES).flat().map(s => s.length), ...Object.values(INTENTS).flatMap(i => i.stages.map(s => s.line.length)));
  const fit = t => { const n = Math.max(0, CELLS - t.length); return (' '.repeat(Math.floor(n / 2)) + t).padEnd(CELLS, ' ').slice(0, CELLS).toUpperCase(); };
  const glyph = c => c === ' ' ? '' : c;
  let board = fit(HOME);
  flapRow.innerHTML = [...board].map(c => `<span class="flap__cell"><span class="flap__face">${glyph(c)}</span></span>`).join('');
  function setBoard(text){
    const next = fit(text);
    if (next === board) return;
    flapLabel.textContent = text;
    [...flapRow.children].forEach((cell, i) => {
      const a = board[i], b = next[i];
      if (a === b || reduce.matches) { cell.innerHTML = `<span class="flap__face">${glyph(b)}</span>`; return; }
      const d = `animation-delay:${26 * i}ms`;
      cell.innerHTML = `<span class="flap__face flap__face--out" style="${d}">${glyph(a)}</span><span class="flap__face flap__face--in" style="${d}">${glyph(b)}</span>`;
    });
    board = next;
  }
  const lineTurns = {};
  function boardFor(id){
    if (id === null) return setBoard(HOME);
    const l = LINES[id];
    if (typeof l === 'string') return setBoard(l);
    lineTurns[id] = (lineTurns[id] || 0) + 1;
    setBoard(l[(lineTurns[id] - 1) % l.length]);
  }

  /* ---------- nodes ---------- */
  const web = document.getElementById('web'), cv = document.getElementById('cv'), ctx = cv.getContext('2d');
  const curtain = document.getElementById('curtain'), copy = document.getElementById('copy'), nodesNav = document.getElementById('nodes'), disclaimer = document.getElementById('disclaimer');
  const els = ROLES.map(r => {
    const a = document.createElement('a');
    a.className = 'node'; a.href = '#'; a.dataset.participant = r.id;
    a.innerHTML = (r.icon ? ICONS[r.icon] : '<span class="hubmark" aria-hidden="true"></span>') +
      `<span class="node__label">${r.label}</span><span class="node__notes" aria-hidden="true"><span class="node__via"></span><span class="node__stage"></span></span>`;
    on(a, 'click', e => e.preventDefault());
    nodesNav.append(a);
    return a;
  });
  const stageEls = els.map(e => e.querySelector('.node__stage')), viaEls = els.map(e => e.querySelector('.node__via'));

  // geometry
  let W = 0, H = 0, ring = {cy:0, x:0, y:0}, room = {needX:0, needY:0, roomX:0, up:0, down:0}, blocks = [];
  const home = ROLES.map(r => r.at);
  const ang = home.slice(), angTo = home.slice();            // current / target angle per node
  const out = ROLES.map(() => 0), outTo = ROLES.map(() => 0); // outward push in px
  const circ = ROLES.map(() => 0), circTo = ROLES.map(() => 0); // 0 = on the ring, 1 = on the intent circle
  const startAt = ROLES.map(() => 0);
  const circle = {radius:0, lift:0}; let circleTo = {radius:0, lift:0};
  let pts = [];

  function measure(){
    const d = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
    // Phones / iPad portrait: the ring fills the first screen (stage height in Hero.tsx), rows top to bottom:
    // patient + partner / doctor + physio / board + headline + description / curengo + pharmacy / nurse + dietitian.
    const stage = document.getElementById('webStage');
    if (narrow.matches && stage) {
      const labelHalf = 50;
      const flap = copy.children[0], lede = copy.children[2], goals = copy.children[3];
      copy.style.marginTop = ''; goals.style.marginTop = '';
      lede.style.marginTop = `${-parseFloat(getComputedStyle(copy).rowGap || '0') + 2}px`;   // the description sits right under the headline (cancels the column gap)
      const st = stage.getBoundingClientRect(), top0 = flap.getBoundingClientRect().top, hb = lede.getBoundingClientRect().bottom - top0;
      const yT = st.top + 30, yB = st.bottom - 44;                        // top / bottom rows (icon centres; even space above and below)
      // matched gaps: a small even margin around the text (doctor/physio -> board, description ->
      // curengo/pharmacy); the two outer gaps (top row -> doctor/physio, curengo/pharmacy -> bottom row)
      // take all the remaining height equally, so the ring always fills the stage
      const free = yB - yT - 34 - 52 * 2 - 18 - hb;                        // 34 = label under a top icon, 52 = side row, 18 = half a bottom icon
      // short phones: the gaps shrink (outer first, down to 10px; inner down to 14px)
      let inner = 22, outer = Math.max(22, Math.min(56, st.height * 0.07));
      const short = free - 2 * inner - 2 * outer;
      if (short < 0) { outer = Math.max(10, outer + short / 2); inner = Math.max(14, (free - 2 * outer) / 2); }
      const extra = Math.max(0, free - 2 * inner - 2 * outer);
      const g1 = outer - 3 + extra / 2;                                    // a top label sits a little lower than a side one: even out what the eye sees
      const yU = yT + 34 + g1 + 18, blockTop = yU + 34 + inner, yL = blockTop + hb + inner + 18;
      copy.style.marginTop = `${Math.round(blockTop - top0)}px`;
      // the goal cards start just below the first screen (never peeking under the ring on tall phones)
      const firstScreen = innerHeight - scrollY + 8, goalsTop = Math.max(stage.getBoundingClientRect().bottom + 24, firstScreen);
      goals.style.marginTop = `${Math.round(goalsTop - lede.getBoundingClientRect().bottom)}px`;
      const cy = (yT + yB) / 2 - r.top, R = (yB - yT) / 2;
      ring = {cy:Math.round(cy), x:Math.round((W / 2 - labelHalf) / N), y:Math.round(R / N)};
      blocks = []; room = {needX:ring.x * N, needY:R, roomX:W / 2 - labelHalf, up:0, down:0};
      // side roles: their angle puts them exactly on the doctor/physio and curengo/pharmacy rows
      const deg = off => Math.min(44, Math.atan(Math.abs(off) / R) * 180 / Math.PI);
      const up = deg((yT + yB) / 2 - yU), down = deg(yL - (yT + yB) / 2);
      ROLES.forEach((role, n) => {
        if (Math.abs(role.at) > 45 && Math.abs(role.at) < 135) return;
        const a = role.at > 0 ? up : down;
        ang[n] = angTo[n] = Math.sign(role.at) * (Math.abs(role.at) < 90 ? a : 180 - a);
      });
      web.dataset.mode = 'tall';
      // lines fade behind the whole text block (board, headline and description)
      const m = `radial-gradient(48% ${Math.round((hb / H) * 100 * 0.8)}% at 50% ${((blockTop + hb / 2 - r.top) / H) * 100}%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 70%, #000 100%)`;
      cv.style.maskImage = m; cv.style.webkitMaskImage = m;
      web.dataset.ring = 'clear';
      place();
      return;
    }
    if (web.dataset.mode === 'tall') ROLES.forEach((role, n) => { ang[n] = angTo[n] = home[n]; });   // back from the phone layout
    copy.style.marginTop = ''; [...copy.children].forEach(c => (c.style.marginTop = ''));
    cv.style.maskImage = cv.style.webkitMaskImage = '';
    delete web.dataset.mode;
    const c = copy.getBoundingClientRect(), cy = c.top + c.height / 2 - r.top;
    const over = (a, b) => Math.max(0, a - b) / N, pick = (need, avail) => avail < need ? avail : (need + avail) / 2;
    const needX = (c.width / 2 + 48) / N, needY = (c.height / 2 + 30) / N, availX = over(W / 2, 48), availY = over(Math.min(cy, H - cy), 30);
    ring = {cy:Math.round(cy), x:Math.round(pick(needX, availX)), y:Math.round(pick(needY, availY))};
    const barBottom = curtain.getBoundingClientRect().top + document.getElementById('siteBar').offsetHeight - r.top;
    blocks = [...copy.children].map(e => { const b = e.getBoundingClientRect(); return {l:b.left - r.left - W / 2 - 48, r:b.right - r.left - W / 2 + 48, t:b.top - r.top - cy - 30, b:b.bottom - r.top - cy + 30}; });
    room = {needX:needX * N, needY:needY * N, roomX:availX * N, up:cy - barBottom - 30 - 12, down:H - cy - 30 - 52};
    web.dataset.ring = availX >= needX && availY >= needY ? 'clear' : 'crowded';
    place();
  }
  function place(){
    pts = ROLES.map((_, i) => {
      const {ux, uy} = unit(ang[i]), q = circ[i];
      let x = W / 2 + (ring.x + out[i]) * ux, y = ring.cy + (ring.y + out[i]) * uy;
      if (q >= 5e-4) {
        const a = ang[i] * Math.PI / 180;
        x = W / 2 + (ring.x + out[i]) * ux * (1 - q) + q * circle.radius * Math.cos(a);
        y = ring.cy + (ring.y + out[i]) * uy * (1 - q) + q * (circle.lift - circle.radius * Math.sin(a));
      }
      els[i].style.left = x + 'px'; els[i].style.top = y + 'px';
      return {x, y};
    });
  }

  /* ---------- intent: re-arrange the network ---------- */
  function arrange(intent){
    const all = ROLES.map((_, i) => i);
    const prim = all.filter(i => roleOf(intent, ROLES[i].id) === 'primary'), rest = all.filter(i => !prim.includes(i));
    const n = prim.length, step = 360 / Math.max(1, n), {needY, roomX, up, down} = room;
    const fits = (turn, size, shift) => {
      for (let k = 0; k < n; k++) {
        const a = (turn - k * step) * Math.PI / 180, x = size * Math.cos(a), y = -size * Math.sin(a) + shift;
        if (Math.abs(x) > roomX || y < -up || y > down || blocks.some(b => x > b.l && x < b.r && y > b.t && y < b.b) || (y > 0 && y < needY + 32)) return false;
      }
      return true;
    };
    let best = null;
    [90 % step, (90 + step / 2) % step].forEach((turn, ti) => {
      for (let size = 160; size <= Math.max(roomX, up + down); size += 4)
        for (let shift = -240; shift <= 240; shift += 4) {
          if (!fits(turn, size, shift)) continue;
          const score = 1e6 * ti + 4 * Math.abs(shift) + Math.abs(size - ring.y);
          if (!best || score < best.score) best = {turn, size, shift, score};
        }
    });
    best = best || {turn:90 % step, size:Math.min(up, down, roomX), shift:0};
    circleTo = {radius:best.size, lift:best.shift};
    // rotate primaries the shortest way onto the circle's slots
    let rot = {cost:Infinity, shift:0};
    for (let s = 0; s < n; s++) {
      let cost = 0; prim.forEach((p, i) => cost += Math.abs(angDiff(home[p], best.turn - ((i + s) % n) * step)));
      if (cost < rot.cost) rot = {cost, shift:s};
    }
    polygon.clear();
    prim.forEach((p, i) => { const q = prim[(i + 1) % n]; if (n > 2 || i === 0) polygon.add(key(p, q)); });
    let reach = ring.x * N + 44;
    prim.forEach((p, i) => {
      angTo[p] = home[p] + angDiff(home[p], best.turn - ((i + rot.shift) % n) * step);
      circTo[p] = 1; outTo[p] = 0;
      reach = Math.max(reach, best.size * Math.cos(angTo[p] * Math.PI / 180));
    });
    // everyone else steps aside into a column on the right
    const push = Math.min(W / 2 - 60, reach + 70) / N - ring.x, bottom = Math.min(ring.cy + ring.y * N, H - 90);
    rest.forEach((p, i) => {
      const v = Math.max(-N, Math.min(N, (bottom - (rest.length - 1 - i) * 74 - ring.cy) / (ring.y + push)));
      angTo[p] = 180 * Math.atan2(-v, N) / Math.PI; outTo[p] = push; circTo[p] = 0;
    });
    if (circ.every(q => q < .01)) { circle.radius = best.size; circle.lift = best.shift; }
    const now = performance.now();
    rest.forEach((p, i) => startAt[p] = now + 110 * i);
    prim.forEach(p => startAt[p] = now + 110 * rest.length + 350);
  }
  function release(){
    ROLES.forEach((_, i) => { angTo[i] = home[i]; outTo[i] = 0; circTo[i] = 0; startAt[i] = 0; });
  }

  /* ---------- state ---------- */
  let pointer = {x:-9999, y:-9999}, movedAt = 0;
  let light = {x:-9999, y:-9999}, legStart = 0, legFrom = HUB, legTo = HUB, pauseUntil = 0, hops = 0, arrived = false;
  let phase = null, phaseAt = 0, lightA = 1;   // wander phases: 'out' (fade where it is) -> 'in' (appear on a role) -> 'move' / 'rest' along the lines
  let lastNear = -1, pointed = -1, last = 0;
  let wanted = null, active = null, intent = null, mix = 0, leaving = false, moving = false;
  let stage = 0, stageAt = 0, stageShown = false, stageNode = -1;
  const routeEdges = new Set(), polygon = new Set();

  on(window, 'pointermove', e => { if (touchy()) return; const r = cv.getBoundingClientRect(); pointer = {x:e.clientX - r.left, y:e.clientY - r.top}; movedAt = performance.now(); phase = null; lightA = 1; }, {passive:true});

  let intentTimer = 0;
  function want(k){
    clearTimeout(intentTimer);
    intentTimer = setTimeout(() => { wanted = k; if (k === null) boardFor(null); }, k ? 6000 : 250);
  }
  document.querySelectorAll('.goal').forEach(g => {
    on(g, 'pointerenter', () => !touchy() && want(g.dataset.intent));
    on(g, 'pointerleave', () => want(null));
    on(g, 'focus', () => !touchy() && want(g.dataset.intent));
    on(g, 'blur', () => want(null));
  });

  const nearest = p => { let i = -1, d = Infinity; pts.forEach((q, k) => { const h = Math.hypot(q.x - p.x, q.y - p.y); if (h < d) { d = h; i = k; } }); return {i, d}; };

  function frame(t){
    if (stopped) return;
    raf = requestAnimationFrame(frame);
    if (!W || web.dataset.ring === 'crowded' || getComputedStyle(web).display === 'none' || !heroOnScreen) { last = t; return; }
    const dt = last ? Math.min(t - last, 50) : 0; last = t;
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--glow').trim();
    const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);

    // the light: follows the pointer; after 3s idle it wanders role to role, every third stop at Curengo
    // smooth and simple: no pull toward roles, no sudden jumps; the light always glides toward where it is heading
    const touch = touchy(), dim = narrow.matches ? .22 : touch ? .36 : .62;   // lines: lighter everywhere, lightest on phones
    const idle = touch || t - movedAt > 3000;
    let aim = pointer, onLine = false;
    if (idle && !reduce.matches && !active) {
      // the light only ever travels along a line between two roles, using their live positions
      const pickNext = from => { hops++; if (hops % 3 === 0 && from !== HUB) return HUB; let n; do n = Math.floor(Math.random() * ROLES.length); while (n === from); return n; };
      if (!phase) { phase = light.x > -9000 ? 'out' : 'in'; phaseAt = t; if (phase === 'in') { legFrom = HUB; legTo = pickNext(HUB); light = {...pts[HUB]}; } }
      if (phase === 'out') {
        aim = {...light}; lightA = Math.max(0, 1 - (t - phaseAt) / 350);
        if (lightA === 0) { legFrom = nearest(light).i; legTo = pickNext(legFrom); light = {...pts[legFrom]}; phase = 'in'; phaseAt = t; }
      }
      if (phase === 'in') {
        aim = pts[legFrom]; onLine = true; lightA = Math.min(1, (t - phaseAt) / 450);
        if (lightA === 1) { phase = 'move'; legStart = t; arrived = false; }
      } else if (phase === 'move') {
        const k = Math.min(1, (t - legStart) / 6000), e = glide(k), a = pts[legFrom], b = pts[legTo];
        aim = {x:a.x + (b.x - a.x) * e, y:a.y + (b.y - a.y) * e}; onLine = true;
        if (k >= .97 && !arrived) { arrived = true; if (!active) boardFor(ROLES[legTo].id); }
        if (k >= 1) { phase = 'rest'; pauseUntil = t + 1500; }
      } else if (phase === 'rest') {
        aim = pts[legTo]; onLine = true;
        if (t >= pauseUntil) { legFrom = legTo; legTo = pickNext(legFrom); phase = 'move'; legStart = t; arrived = false; }
      }
    } else if (phase) { phase = null; lightA = 1; }
    if (aim.x > -9000) {
      if (light.x < -9000 || reduce.matches || onLine) light = {...aim};
      else { const f = 1 - Math.exp(-dt / 140); light = {x:light.x + (aim.x - light.x) * f, y:light.y + (aim.y - light.y) * f}; }
    }

    const near = nearest(light), isNear = near.i >= 0 && near.d <= 76;

    // intent switching: enter at once, leave only after the network has settled back
    if (wanted !== active) {
      if (wanted || !active || (mix < .05 && !moving) || reduce.matches) {
        active = wanted; intent = active ? INTENTS[active] : null;
        stage = 0; stageAt = performance.now() + 1100; stageShown = false; stageNode = -1;
        stageEls.forEach(s => { s.classList.remove('is-on'); s.textContent = ''; });
        routeEdges.clear();
        if (intent) intent.stages.forEach(s => s.route.slice(1).forEach((id, k) => routeEdges.add(key(idx(s.route[k]), idx(id)))));
        if (intent) web.dataset.intent = intent.gateway; else delete web.dataset.intent;
        els.forEach((el, i) => { if (intent) el.dataset.role = roleOf(intent, ROLES[i].id); else delete el.dataset.role; viaEls[i].textContent = intent && intent.hub === ROLES[i].id ? intent.gateway + ' gateway' : ''; });
        leaving = false;
        if (intent && !reduce.matches) arrange(intent); else release();
        if (intent) disclaimer.setAttribute('data-on', ''); else disclaimer.removeAttribute('data-on');
      } else if (!leaving) { leaving = true; release(); }
    }
    const target = active && active === wanted ? 1 : 0;
    mix = reduce.matches ? target : mix + (target - mix) * (1 - Math.exp(-dt / 180));
    const base = 1 - mix;

    // move nodes: push out, rotate, come back in (or slide onto / off the intent circle)
    const settle = 1 - Math.exp(-dt / (leaving || !intent ? 80 : 150)), boost = leaving || !intent ? 1.8 : 1;
    const stepBy = (d, rate) => Math.sign(d) * Math.min(Math.abs(d) * settle, rate * boost * dt / 1000);
    moving = false;
    ROLES.forEach((_, n) => {
      if (t < startAt[n]) return;
      const turn = angDiff(ang[n], angTo[n]), q = circ[n], qTo = circTo[n];
      if (qTo > 0 && out[n] > .5) { out[n] += stepBy(-out[n], 450); moving = true; return; }
      if (qTo > 0 || (q > 5e-4 && outTo[n] === 0)) {
        if (Math.abs(turn) > .05 || Math.abs(qTo - q) > .001) { ang[n] += stepBy(turn, 110); circ[n] = q + stepBy(qTo - q, 1.4); moving = true; }
        else if (ang[n] !== angTo[n] || q !== qTo) { ang[n] = angTo[n]; circ[n] = qTo; moving = true; }
        return;
      }
      if (q > 5e-4) { circ[n] = Math.abs(q) < .001 ? 0 : q + stepBy(-q, 1.4); moving = true; return; }
      const rotating = Math.abs(turn) > .05, goal = rotating ? 44 : outTo[n], gap = goal - out[n];
      if (Math.abs(gap) > .5) { out[n] += stepBy(gap, 450); moving = true; }
      else if (rotating) { out[n] = goal; ang[n] += stepBy(turn, 110); moving = true; }
      else if (ang[n] !== angTo[n] || out[n] !== goal) { ang[n] = angTo[n]; out[n] = goal; moving = true; }
    });
    if (Math.abs(circle.radius - circleTo.radius) > .5 || Math.abs(circle.lift - circleTo.lift) > .5) {
      circle.radius += stepBy(circleTo.radius - circle.radius, 450); circle.lift += stepBy(circleTo.lift - circle.lift, 450); moving = true;
    }
    if (moving) place();

    // the board names a role while the pointer is near it (the light is not pulled toward it)
    if (!idle && isNear && near.i !== pointed) { pointed = near.i; if (!active && !wanted) boardFor(ROLES[near.i].id); }
    if (!idle && !isNear && pointed !== -2) { pointed = -2; if (!active && !wanted) boardFor(null); }
    const v = light;
    const nv = nearest(v);
    if (nv.i >= 0 && nv.d <= 76 && nv.i !== lastNear) lastNear = nv.i;   // the reference replays a second dot along the same line here; dropped so only one dot travels

    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    ctx.strokeStyle = accent;

    // every participant linked to every other
    PAIRS.forEach(([i, j]) => {
      const a = pts[i], b = pts[j], m = {x:(a.x + b.x) / 2, y:(a.y + b.y) / 2};
      const lit = falloff(Math.hypot(m.x - v.x, m.y - v.y), 416), route = !!intent && routeEdges.has(key(i, j)), stepping = out[i] > 1 || out[j] > 1;
      ctx.globalAlpha = ((.13 + .35 * lit) * base + (stepping ? 0 : .022 * mix)) * dim;
      ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      const edge = !!intent && polygon.has(key(i, j));
      if ((route || edge) && mix > .01 && !stepping) { ctx.globalAlpha = mix * (route ? .24 : .13); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    });
    // tethers to the two nearest
    pts.map((p, i) => ({i, d:Math.hypot(p.x - v.x, p.y - v.y)})).sort((a, b) => a.d - b.d).slice(0, 2).forEach(({i, d}) => {
      if (d > 260) return;
      ctx.globalAlpha = (.15 + .5 * falloff(d, 260)) * base * lightA * dim; ctx.lineWidth = 1.25;
      ctx.beginPath(); ctx.moveTo(v.x, v.y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
    });
    // the light
    if (v.x > -9000 && base > .01) {
      const R = narrow.matches ? 170 : 390;   // phones: a smaller pool of light around the lit role
      const g = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, R);
      (dark ? [[0, .16], [.35, .07], [.7, .02], [1, 0]] : [[0, .34], [.13, .15], [.36, .05], [.7, .012], [1, 0]]).forEach(([o, a]) => g.addColorStop(o, `rgba(${rgb},${a})`));
      ctx.globalAlpha = base * lightA; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(v.x, v.y, R, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = .9 * base * lightA; ctx.fillStyle = `rgb(${rgb})`; ctx.beginPath(); ctx.arc(v.x, v.y, 3.5, 0, Math.PI * 2); ctx.fill();
    }
    // stages: trace each route, label the role it ends on
    let dot = null;
    if (intent && mix > .01 && t >= stageAt && !moving) {
      const s = intent.stages[stage], route = s.route.map(idx), legs = route.length - 1, dur = reduce.matches ? 0 : 750 * legs;
      if (!stageShown) {
        stageAt = t; stageShown = true; stageNode = route[legs];
        stageEls[stageNode].textContent = s.label; stageEls[stageNode].classList.add('is-on');
        setBoard(s.line);
      }
      const p = (dur ? Math.min(1, (t - stageAt) / dur) : 1) * legs;
      ctx.lineWidth = 1.5; ctx.fillStyle = accent;
      for (let k = 0; k < legs; k++) {
        const f = Math.min(1, p - k); if (f <= 0) break;
        const e = ease(f), a = pts[route[k]], b = pts[route[k + 1]], q = {x:a.x + (b.x - a.x) * e, y:a.y + (b.y - a.y) * e};
        ctx.globalAlpha = .6 * mix; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        if (f < 1) dot = q;
      }
      if (dot) { ctx.globalAlpha = mix; ctx.beginPath(); ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2); ctx.fill(); }
      if (t - stageAt > dur + (reduce.matches ? 3200 : 1700)) {
        stageEls[stageNode].classList.remove('is-on');
        stage = (stage + 1) % intent.stages.length; stageAt = t + 300; stageShown = false;
      }
    }
    els.forEach((el, i) => {
      const p = pts[i];
      const near = Math.max(falloff(Math.hypot(p.x - v.x, p.y - v.y), 260), i === lastNear ? .5 : 0);
      const traced = Math.max(dot ? falloff(Math.hypot(p.x - dot.x, p.y - dot.y), 90) : 0, intent && i === stageNode && stageShown ? .45 : 0);
      el.style.setProperty('--lit', (near * base + mix * traced).toFixed(3));
    });
    ctx.globalAlpha = 1;
  }

  // the network only animates while the hero is on screen
  let heroOnScreen = true;
  const io = new IntersectionObserver(([e]) => { heroOnScreen = e.isIntersecting; });
  io.observe(curtain);

  /* ---------- theme toggle ---------- */

  measure();
  // phones: the address bar showing/hiding while scrolling only changes the height, so don't re-lay out for that
  // so on phones the layout (and the board + headline inside the ring) is only redone when the width really changes
  let lastW = innerWidth;
  const relayout = () => { if (narrow.matches && innerWidth === lastW) return; lastW = innerWidth; measure(); };
  on(window, 'resize', relayout);
  // the hero stays hidden on phones until the text has been placed inside the ring (Hero.tsx), then fades in at once
  const hero = document.getElementById('hero');
  const reveal = () => { if (!stopped) requestAnimationFrame(() => hero?.setAttribute('data-ready', '')); };
  const fallback = setTimeout(reveal, 1200);   // never keep it hidden if the font is slow
  (document.fonts?.ready ?? Promise.resolve()).then(() => { if (stopped) return; measure(); clearTimeout(fallback); reveal(); });   // once, after the web font has loaded
  const ro = new ResizeObserver(() => (narrow.matches ? relayout() : measure()));
  ro.observe(copy);
  let raf = requestAnimationFrame(frame);

  return () => {
    stopped = true; cancelAnimationFrame(raf); clearTimeout(fallback); hero?.removeAttribute('data-ready'); clearTimeout(intentTimer); io.disconnect(); ro.disconnect(); cleanups.forEach(off => off());
    // remove what this run added, so a second start (React dev mode, fast refresh) never leaves a doubled network behind
    els.forEach(el => el.remove()); flapRow.innerHTML = ''; copy.style.marginTop = ''; [...copy.children].forEach(c => (c.style.marginTop = '')); 
  };
}
