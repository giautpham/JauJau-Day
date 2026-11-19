/* Static journal with separate art & audio for each post. No build tools required. */
(() => {
  'use strict';
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const config = window.BLOG_CONFIG || {};
  const root = document.getElementById('mainContent');
  const player = document.getElementById('playerCard');
  const audio = document.getElementById('audio');
  const art = document.getElementById('albumArt');
  const nowPlaying = document.getElementById('nowPlaying');
  const hint = document.getElementById('playbackHint');
  const playButton = document.getElementById('playPause');
  const playIcon = document.getElementById('playIcon');
  const progress = document.getElementById('seekBar');
  const muteButton = document.getElementById('muteTrack');
  const volumeIcon = document.getElementById('volumeIcon');
  let selected = null;
  let currentSlug = null;
  const defaultTitle = 'Tự trào văn đoàn'; // Keep public branding consistent even if private-editor config is older.
  const trackCount = document.querySelector('.player-topline > span:last-child');
  if (trackCount) trackCount.textContent = posts.length ? `001 — ${String(posts.length).padStart(3, '0')}` : '000 — 000';

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const formatInline = input => escapeHTML(input).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
  const homeLink = '#/';
  const postLink = post => `#/post/${encodeURIComponent(post.slug)}`;
  function currentPostFromUrl() {
    const match = location.hash.match(/^#\/post\/([^/?#]+)/);
    if (!match) return null;
    try { return posts.find(p => p.slug === decodeURIComponent(match[1])) || null; }
    catch { return null; }
  }
  function readingMinutes(post) {
    const words = (post.body || []).join(' ').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words/200));
  }
  function postRow(post, i) {
    const active = selected?.slug === post.slug;
    return `<a class="post-row ${active?'active':''}" href="${postLink(post)}" data-route="post" aria-label="Đọc ${escapeHTML(post.title)}">
      <span class="row-number">${String(i+1).padStart(2,'0')}</span>
      <span class="post-info"><strong class="post-row-title">${escapeHTML(post.title)}</strong><span class="post-row-sub">${escapeHTML(post.subtitle || 'Một bài viết, một câu chuyện, một bản nhạc.')}</span></span>
      <span class="post-meta-right"><time>${escapeHTML(post.date)}</time><span class="post-count" title="Số lượt xem ghi thủ công, không phải bộ đếm thật">◉ ${escapeHTML(post.views || '—')} <span aria-hidden="true">· ${escapeHTML(post.time || '')}</span></span></span>
      <span class="row-arrow" aria-hidden="true">↗</span>
    </a>`;
  }
  function renderHome() {
    document.title = defaultTitle;
    root.innerHTML = `<section class="home-header">
       <div class="kicker">The Journal / Một góc nhỏ trên internet</div>
       <h1 class="home-title">${escapeHTML(defaultTitle.replace(/\.$/,''))}<span class="period">.</span></h1>
       <p class="home-intro">${escapeHTML(config.tagline || 'Những câu chuyện nhỏ, những bài nhạc cũ. Đọc chậm thôi, cứ để chiếc đĩa xoay.')}</p>
       <div class="home-heading-bottom"><div class="tiny-chips"><span class="chip"><b>✳</b> WORDS & SOUNDS</span><span class="chip"><b>${String(posts.length).padStart(2,'0')}</b> BÀI VIẾT</span></div><span class="home-private-note">JUST STORIES & SOUNDTRACKS ✳</span></div>
     </section>
     <section class="archive-section"><div class="section-header"><h2>From the archive <span aria-hidden="true">✳</span></h2><span>Latest notes &nbsp; / &nbsp; ${posts.length} total</span></div>
       <nav class="posts-list" aria-label="Danh sách bài viết">${posts.length?posts.map(postRow).join(''):'<p>Chưa có bài viết nào.</p>'}</nav>
       <div class="bottom-message">A tiny corner of the internet, pressed onto vinyl.</div>

     </section>`;
  }
  function renderArticle(post) {
    const i = posts.findIndex(p=>p.slug===post.slug);
    const next = posts[(i+1)%posts.length];
    document.title = `${post.title} — ${defaultTitle}`;
    const bodyHTML = (post.body || []).map(p => {
      const raw=String(p ?? '');
      const klass = raw.startsWith('--- Ba linh hồn') ? 'end-mark' : raw.startsWith('---') ? 'announcement' : '';
      return `<p${klass?` class="${klass}"`:''}>${formatInline(raw)}</p>`;
    }).join('');
    root.innerHTML = `<div class="article-topbar"><a class="back-link" href="${homeLink}" data-route="home"><span aria-hidden="true">←</span> Quay đầu / Về trang chủ</a><span class="article-index">STORY ${String(i+1).padStart(2,'0')} / ${String(posts.length).padStart(2,'0')}</span></div>
      <article><header class="article-header"><div class="kicker">Words / Letters from the archive</div>
        <h1 class="post-title">${escapeHTML(post.title)}</h1>
        <div class="post-meta"><time>${escapeHTML(post.date)}</time><span class="sep">✳</span><span>${escapeHTML(post.time || '')}</span><span class="sep">✳</span><span class="views">◉ ${escapeHTML(post.views || '—')}</span><span class="sep">✳</span><span>~ ${readingMinutes(post)} phút đọc</span></div>
        ${post.subtitle?`<p class="post-subtitle">${escapeHTML(post.subtitle)}</p>`:''}
        <div class="article-divider"><span>✳</span></div></header>
        <div class="article-body">${bodyHTML}</div>
        <nav class="post-end" aria-label="Điều hướng bài viết"><a href="${homeLink}" data-route="home">← Tất cả bài viết<small>TRỞ LẠI ARCHIVE</small></a>${posts.length>1?`<a class="next-title" href="${postLink(next)}" data-route="post">${escapeHTML(next.title)} ↗<small>ĐỌC BÀI TIẾP THEO</small></a>`:''}</nav>
      </article>`;
  }
  const clock = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}` : '0:00';
  function updateProgress() {
    const duration = audio.duration;
    const pct = Number.isFinite(duration) && duration > 0 ? Math.min(100,Math.max(0, audio.currentTime/duration*100)) : 0;
    progress.value = String(pct);
    progress.style.setProperty('--pct',`${pct}%`);
    document.getElementById('timeCurrent').textContent = clock(audio.currentTime);
    document.getElementById('timeDuration').textContent = clock(duration);
  }
  function updatePlayer() {
    const playing = !audio.paused && !audio.ended;
    player.classList.toggle('is-playing',playing);
    playButton.setAttribute('aria-label', playing ? 'Tạm dừng nhạc' : 'Phát nhạc');
    playIcon.innerHTML = playing ? '<rect x="8" y="6" width="3" height="12" rx=".5"/><rect x="15" y="6" width="3" height="12" rx=".5"/>' : '<path class="play-arrow" d="m9 6 10 6-10 6z"/>';
  }
  function chooseTrack(post) {
    if (!post) return;
    selected = post;
    art.src = post.cover || 'assets/covers/three.svg';
    art.alt = `Bìa nhạc: ${post.title}`;
    nowPlaying.textContent = post.title;
    if (currentSlug === post.slug) return;
    audio.pause();
    currentSlug = post.slug;
    // Relative URLs work under both github.io/user-site and github.io/project-site.
    audio.src = post.audio || '';
    audio.load();
    hint.textContent = '';
    updateProgress(); updatePlayer();
  }
  function attemptPlay() {
    if (!selected?.audio) {hint.textContent = 'Bài này chưa có file nhạc.'; return;}
    try {
      const promise = audio.play();
      if (promise && typeof promise.catch === 'function') {
        promise.then(()=>{hint.textContent='';updatePlayer();}).catch(err=>{
          updatePlayer();
          hint.textContent = err?.name==='NotAllowedError' ? 'Trình duyệt chặn tự động phát nhạc. Chạm nút ▶ để nghe nhé.' : 'Không thể mở bài nhạc. Hãy kiểm tra đường dẫn hoặc file MP3.';
        });
      }
    } catch {hint.textContent='Không thể phát nhạc. Hãy thử bấm nút ▶.';}
  }
  function renderRoute(autoplay = true) {
    const post=currentPostFromUrl();
    if(post){renderArticle(post);chooseTrack(post);if(autoplay)attemptPlay();}
    else {if (!selected && posts.length) chooseTrack(posts[0]);renderHome();}
  }
  function navigate(to, autoplay = false) {
    history.pushState({},'',to);
    renderRoute(autoplay);
    window.scrollTo({top:0,behavior:'instant'});
    root.focus({preventScroll:true});
  }
  root.addEventListener('click',event=>{
    const link=event.target.closest('a[data-route]');
    if(!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button!==0) return;
    event.preventDefault();
    navigate(link.getAttribute('href'),link.dataset.route==='post');
  });
  playButton.addEventListener('click',()=>{
    if(!selected)return;
    if(audio.paused)attemptPlay(); else {audio.pause();hint.textContent='';}
  });
  function stepTrack(step) {
    if(!posts.length)return;
    const index=Math.max(0,posts.findIndex(p=>p.slug===selected?.slug));
    const next=posts[(index+step+posts.length)%posts.length];
    if(currentPostFromUrl()) navigate(postLink(next),true);
    else {chooseTrack(next);renderHome();attemptPlay();}
  }
  document.getElementById('prevTrack').addEventListener('click',()=>stepTrack(-1));
  document.getElementById('nextTrack').addEventListener('click',()=>stepTrack(1));
  progress.addEventListener('input',()=>{
    if(Number.isFinite(audio.duration) && audio.duration>0) audio.currentTime=audio.duration*(Number(progress.value)/100);
    updateProgress();
  });
  muteButton.addEventListener('click',()=>{
    audio.muted=!audio.muted;
    muteButton.setAttribute('aria-label',audio.muted?'Bật tiếng':'Tắt tiếng');
    volumeIcon.innerHTML=audio.muted?'<path d="M11 5 6 9H3v6h3l5 4V5ZM16 9l6 6M22 9l-6 6"/>':'<path d="M11 5 6 9H3v6h3l5 4V5ZM15 9c1 .6 1.5 1.6 1.5 3S16 14.4 15 15M18 6c2 1.6 3 3.5 3 6s-1 4.4-3 6"/>';
  });
  ['timeupdate','durationchange','loadedmetadata'].forEach(e=>audio.addEventListener(e,updateProgress));
  ['play','pause','ended'].forEach(e=>audio.addEventListener(e,updatePlayer));
  audio.addEventListener('error',()=>{hint.textContent='Không tìm thấy nhạc. Kiểm tra tên file trong data/posts.js.';updatePlayer();});
  art.addEventListener('error',()=>{art.alt='Ảnh bìa không khả dụng';});
  window.addEventListener('popstate',()=>renderRoute(true));
  window.addEventListener('hashchange',()=>renderRoute(true));
  // Theme mode is optional and remembered per browser.
  const themeButton=document.getElementById('themeToggle');
  const setTheme=theme=>{document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-pressed',String(theme==='dark'));};
  try {if(localStorage.getItem('journal-theme')==='dark')setTheme('dark');}catch{}
  themeButton.addEventListener('click',()=>{
    const newTheme=document.documentElement.dataset.theme==='dark'?'light':'dark';
    setTheme(newTheme);try{localStorage.setItem('journal-theme',newTheme);}catch{}
  });
  renderRoute(true);
})();
