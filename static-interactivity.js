/**
 * ItaloStudy — Static Interactivity Script
 * GDPR-compliant cookie consent + mobile menu for static HTML clones.
 * Replaces the dead React CookieConsent component with a fully functional
 * Vanilla JS equivalent including Manage Preferences with toggle switches.
 */

(function () {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    var COOKIE_KEY = 'italostudy_cookie_consent';

    /* ─── URL Utilities ────────────────────────────────────────── */
    function getProxiedUrl(url) {
        if (!url) return '';
        if (url.startsWith('data:')) return url;
        
        // If it's already a full URL including protocol, return as is (or handle specific proxies)
        if (url.startsWith('http')) {
            // Optional: Add logic here if specific transformations are needed for Cloudinary/Supabase
            return url;
        }
        
        // Handle Supabase/Relative paths if any
        return url;
    }

    /* ─── Translations ──────────────────────────────────────────── */
    var T = {
        en: {
            title: 'Cookie Preferences',
            badge: 'GDPR \u00b7 EU Standard',
            desc: 'We use cookies to improve your experience and personalise content. You can manage your choices below.',
            privacy: 'Privacy Policy',
            accept: 'Accept All Cookies',
            reject: 'Reject Optional',
            manage: 'Manage',
            save: 'Save Choices',
            necessary: 'Necessary',
            necessaryDesc: 'Core site functions. Always active.',
            required: 'Required',
            analytics: 'Analytics',
            analyticsDesc: 'Helps us understand site usage.',
            marketing: 'Marketing',
            marketingDesc: 'Personalised ads across websites.'
        },
        it: {
            title: 'Preferenze Cookie',
            badge: 'GDPR \u00b7 Standard UE',
            desc: 'Utilizziamo i cookie per migliorare la tua esperienza e personalizzare i contenuti. Puoi gestire le tue scelte qui sotto.',
            privacy: 'Privacy Policy',
            accept: 'Accetta Tutti',
            reject: 'Rifiuta Opzionali',
            manage: 'Gestisci',
            save: 'Salva Scelte',
            necessary: 'Necessari',
            necessaryDesc: 'Funzioni essenziali del sito. Sempre attivi.',
            required: 'Obbligatorio',
            analytics: 'Analitici',
            analyticsDesc: 'Ci aiutano a capire come viene utilizzato il sito.',
            marketing: 'Marketing',
            marketingDesc: 'Annunci personalizzati su diversi siti web.'
        },
        tr: {
            title: '\u00c7erez Tercihleri',
            badge: 'GDPR \u00b7 AB Standard\u0131',
            desc: 'Deneyiminizi geli\u015ftirmek ve i\u00e7eri\u011fi ki\u015fiselle\u015ftirmek i\u00e7in \u00e7erezler kullan\u0131yoruz. Se\u00e7imlerinizi a\u015fa\u011f\u0131dan y\u00f6netebilirsiniz.',
            privacy: 'Gizlilik Politikas\u0131',
            accept: 'Hepsini Kabul Et',
            reject: '\u0130ste\u011fe Ba\u011fl\u0131 Reddet',
            manage: 'Y\u00f6net',
            save: 'Se\u00e7imleri Kaydet',
            necessary: 'Gerekli',
            necessaryDesc: 'Temel site i\u015flevleri. Her zaman aktif.',
            required: 'Zorunlu',
            analytics: 'Analitik',
            analyticsDesc: 'Site kullan\u0131m\u0131n\u0131 anlamamıza yard\u0131mc\u0131 olur.',
            marketing: 'Pazarlama',
            marketingDesc: 'Web sitelerinde ki\u015fisel reklamlar.'
        }
    };

    /* ─── Init ──────────────────────────────────────────────────── */
    function init() {
        console.log('--- Static Interactivity Re-hydrated ---');
        killGhostModals();
        initCookieBanner();
        initMobileMenu();
        initHeaderScroll();
        initNavDropdowns();
        initBlog();
        initMocks();
    }

    /* ─── Header Scroll Animation ────────────────────────────── */
    function initHeaderScroll() {
        var header = document.querySelector('header.fixed');
        var container = header ? header.querySelector('.container') : null;
        if (!header) return;

        function update() {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
                if (container) {
                    container.classList.remove('md:h-24');
                    container.classList.add('md:h-16');
                }
            } else {
                header.classList.remove('scrolled');
                if (container) {
                    container.classList.remove('md:h-16');
                    container.classList.add('md:h-24');
                }
            }
        }

        window.addEventListener('scroll', update);
        update(); // Initial check
    }

    /* ─── Nav Dropdowns (Desktop) ────────────────────────────── */
    function initNavDropdowns() {
        console.log('[static] Initializing Nav Dropdowns');
        var triggers = document.querySelectorAll('.nav-dropdown-trigger');
        if (triggers.length === 0) console.warn('[static] No nav-dropdown-trigger found');

        triggers.forEach(function (trigger) {
            var menu = trigger.querySelector('.nav-dropdown-menu');
            if (!menu) return;

            var timeout;
            var isVisible = false;

            function show() {
                clearTimeout(timeout);
                if (isVisible) return;
                isVisible = true;
                
                menu.classList.remove('hidden');
                menu.style.display = 'block';
                
                // Use requestAnimationFrame for smooth transition
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        menu.style.opacity = '1';
                        menu.style.transform = 'translate(-50%, 0) scale(1)';
                        menu.classList.remove('opacity-0', 'scale-95');
                        menu.classList.add('opacity-100', 'scale-100');
                    });
                });
            }

            function hide() {
                timeout = setTimeout(function () {
                    isVisible = false;
                    menu.style.opacity = '0';
                    menu.style.transform = 'translate(-50%, 10px) scale(0.95)';
                    menu.classList.remove('opacity-100', 'scale-100');
                    menu.classList.add('opacity-0', 'scale-95');
                    
                    setTimeout(function() {
                        if (!isVisible) {
                            menu.style.display = 'none';
                            menu.classList.add('hidden');
                        }
                    }, 200);
                }, 150);
            }

            // Hover for desktop
            trigger.addEventListener('mouseenter', show);
            trigger.addEventListener('mouseleave', hide);

            // Click for mobile/fallback
            var link = trigger.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth < 1024) {
                        // On mobile, the mobile menu handles things differently usually, 
                        // but if we're in desktop mode at small width, toggle it.
                        e.preventDefault();
                        isVisible ? hide() : show();
                    }
                });
            }
        });
    }

    /* ─── Kill ALL React ghost cookie modals ───────────────────── */
    function killGhostModals() {
        // Our banner hasn't been created yet, so we can safely nuke everything cookie-related.
        // Walk from deepest elements up so we catch the outermost wrapper.
        var found = [];
        document.querySelectorAll('div').forEach(function (el) {
            var txt = el.textContent || '';
            if (
                (txt.indexOf('Cookie Preferences') !== -1 ||
                 txt.indexOf('Preferenze Cookie') !== -1 ||
                 txt.indexOf('\u00c7erez Tercihleri') !== -1) &&
                (txt.indexOf('Accept') !== -1 || txt.indexOf('Accetta') !== -1 || txt.indexOf('Kabul') !== -1) &&
                el.querySelector('button')
            ) {
                found.push(el);
            }
        });
        // Remove the outermost match (it wraps inner ones)
        found.forEach(function (el) {
            if (el.parentNode) {
                el.remove();
                console.log('[static] Removed ghost cookie modal');
            }
        });
        // Also nuke by class patterns
        document.querySelectorAll('[class*="CookieConsent"], [data-sonner-toaster], [class*="sonner"]').forEach(function (el) {
            el.remove();
        });
    }

    /* ─── Cookie Banner (GDPR compliant) ───────────────────────── */
    function initCookieBanner() {
        if (localStorage.getItem(COOKIE_KEY)) return;

        var lang = (document.documentElement.getAttribute('lang') || 'en').substring(0, 2);
        var t = T[lang] || T.en;

        var prefs = { necessary: true, analytics: false, marketing: false };
        var expanded = false;

        // ── Create banner container ──
        var banner = document.createElement('div');
        banner.id = 'static-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', t.title);
        Object.assign(banner.style, {
            position: 'fixed', bottom: '12px', right: '12px', zIndex: '99999',
            width: '420px', maxWidth: 'calc(100vw - 24px)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            animation: 'scb-in 0.22s ease-out'
        });

        // Inject keyframe animation
        if (!document.getElementById('scb-keyframes')) {
            var styleEl = document.createElement('style');
            styleEl.id = 'scb-keyframes';
            styleEl.textContent =
                '@keyframes scb-in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}' +
                '.scb-toggle{position:relative;display:inline-flex;width:44px;height:24px;border-radius:9999px;border:2px solid transparent;cursor:pointer;transition:background 0.15s;flex-shrink:0;}' +
                '.scb-toggle[aria-checked="true"]{background:#4f46e5;}' +
                '.scb-toggle[aria-checked="false"]{background:#e2e8f0;}' +
                '.scb-toggle[disabled]{opacity:0.5;cursor:not-allowed;}' +
                '.scb-toggle-knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:9999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1);transition:transform 0.15s;}' +
                '.scb-toggle[aria-checked="true"] .scb-toggle-knob{transform:translateX(20px);}' +
                '.scb-btn{display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:12px;border:none;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:background 0.1s,color 0.1s,transform 0.1s;}' +
                '.scb-btn:active{transform:scale(0.98);}' +
                '.scb-manage-panel{max-height:0;overflow:hidden;transition:max-height 0.28s cubic-bezier(0.4,0,0.2,1);}' +
                '.scb-manage-panel.open{max-height:500px;}';
            document.head.appendChild(styleEl);
        }

        function render() {
            banner.innerHTML =
                '<div style="border-radius:20px;background:#fff;border:1px solid #e2e8f0;box-shadow:0 20px 60px -10px rgba(0,0,0,0.18);overflow:hidden;">' +
                    '<div style="height:3px;background:linear-gradient(to right,#6366f1,#a855f7,#f43f5e);"></div>' +
                    '<div style="padding:20px;">' +
                        /* Header */
                        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;">' +
                            '<div style="display:flex;align-items:center;gap:10px;">' +
                                '<div style="width:32px;height:32px;border-radius:12px;background:#eef2ff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>' +
                                '</div>' +
                                '<div>' +
                                    '<p style="font-size:11px;font-weight:900;color:#0f172a;text-transform:uppercase;letter-spacing:0.1em;line-height:1.2;margin:0;">' + t.title + '</p>' +
                                    '<p style="font-size:10px;color:#94a3b8;font-weight:600;margin:2px 0 0 0;">' + t.badge + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<button id="scb-close" style="padding:6px;border-radius:12px;border:none;background:transparent;color:#cbd5e1;cursor:pointer;" aria-label="Close">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                            '</button>' +
                        '</div>' +
                        /* Description */
                        '<p style="font-size:12px;color:#64748b;font-weight:500;line-height:1.6;margin:0 0 16px 0;">' + t.desc +
                            ' <a href="/privacy" style="color:#4f46e5;font-weight:700;text-decoration:none;">' + t.privacy + '</a>' +
                        '</p>' +
                        /* Manage panel (collapsible) */
                        '<div id="scb-manage-panel" class="scb-manage-panel' + (expanded ? ' open' : '') + '">' +
                            '<div style="display:flex;flex-direction:column;gap:8px;padding-bottom:16px;">' +
                                renderCategory('necessary', t.necessary, t.necessaryDesc, true) +
                                renderCategory('analytics', t.analytics, t.analyticsDesc, false) +
                                renderCategory('marketing', t.marketing, t.marketingDesc, false) +
                            '</div>' +
                        '</div>' +
                        /* Buttons */
                        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
                            '<button id="scb-accept" class="scb-btn" style="grid-column:1/-1;background:#4f46e5;color:#fff;font-size:11px;padding:12px;box-shadow:0 4px 14px rgba(79,70,229,0.15);">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
                                t.accept +
                            '</button>' +
                            '<button id="scb-reject" class="scb-btn" style="background:#f1f5f9;color:#475569;">' + t.reject + '</button>' +
                            (expanded
                                ? '<button id="scb-save" class="scb-btn" style="background:#f1f5f9;color:#475569;">' + t.save + '</button>'
                                : '<button id="scb-manage" class="scb-btn" style="background:#f1f5f9;color:#475569;">' + t.manage +
                                    ' <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
                                  '</button>'
                            ) +
                        '</div>' +
                    '</div>' +
                '</div>';

            // Wire up events
            wire();
        }

        function renderCategory(key, title, desc, locked) {
            var checked = prefs[key];
            return '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:12px;background:#f8fafc;border:1px solid #f1f5f9;">' +
                '<div style="display:flex;align-items:center;gap:10px;min-width:0;">' +
                    '<div style="width:28px;height:28px;border-radius:8px;background:#fff;border:1px solid #f1f5f9;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                        categoryIcon(key) +
                    '</div>' +
                    '<div style="min-width:0;">' +
                        '<p style="font-size:10px;font-weight:900;color:#0f172a;text-transform:uppercase;letter-spacing:0.06em;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                            title +
                            (locked ? ' <span style="margin-left:6px;padding:1px 4px;background:#f1f5f9;color:#94a3b8;font-size:8px;border-radius:4px;font-weight:900;text-transform:uppercase;">' + (T[lang] || T.en).required + '</span>' : '') +
                        '</p>' +
                        '<p style="font-size:10px;color:#94a3b8;font-weight:500;margin:2px 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + desc + '</p>' +
                    '</div>' +
                '</div>' +
                '<button class="scb-toggle" role="switch" aria-checked="' + checked + '" data-key="' + key + '"' + (locked ? ' disabled' : '') + '>' +
                    '<span class="scb-toggle-knob"></span>' +
                '</button>' +
            '</div>';
        }

        function categoryIcon(key) {
            if (key === 'necessary') return '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
            if (key === 'analytics') return '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
            return '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>';
        }

        function dismiss(p) {
            localStorage.setItem(COOKIE_KEY, JSON.stringify(p));
            banner.style.animation = 'none';
            banner.style.transition = 'opacity 0.2s, transform 0.2s';
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(16px)';
            setTimeout(function () { banner.remove(); }, 220);
        }

        function wire() {
            var a = document.getElementById('scb-accept');
            var r = document.getElementById('scb-reject');
            var c = document.getElementById('scb-close');
            var m = document.getElementById('scb-manage');
            var s = document.getElementById('scb-save');

            if (a) a.addEventListener('click', function () {
                dismiss({ necessary: true, analytics: true, marketing: true });
            });
            if (r) r.addEventListener('click', function () {
                dismiss({ necessary: true, analytics: false, marketing: false });
            });
            if (c) c.addEventListener('click', function () {
                dismiss({ necessary: true, analytics: false, marketing: false });
            });
            if (m) m.addEventListener('click', function () {
                expanded = true;
                render();
            });
            if (s) s.addEventListener('click', function () {
                dismiss(prefs);
            });

            // Toggle switches
            document.querySelectorAll('.scb-toggle:not([disabled])').forEach(function (toggle) {
                toggle.addEventListener('click', function () {
                    var key = this.getAttribute('data-key');
                    prefs[key] = !prefs[key];
                    var isOn = prefs[key];
                    this.setAttribute('aria-checked', String(isOn));
                });
            });
        }

        document.body.appendChild(banner);
        render();
    }

    /* ─── Mobile Menu Toggle ───────────────────────────────────── */
    function initMobileMenu() {
        var openBtn = document.getElementById('mobile-menu-open');
        var closeBtn = document.getElementById('mobile-menu-close');
        var panel = document.getElementById('mobile-menu-panel');

        if (!openBtn || !panel) {
            // Fallback for legacy class-based detection
            openBtn = openBtn || document.querySelector('button.lg\\:hidden');
            if (openBtn && !panel) {
                var header = openBtn.closest('header');
                if (header) {
                    var divs = header.querySelectorAll('div');
                    for (var i = 0; i < divs.length; i++) {
                        if (divs[i].className && divs[i].className.indexOf('lg:hidden') !== -1 && divs[i].querySelectorAll('a').length > 3) {
                            panel = divs[i];
                            break;
                        }
                    }
                }
            }
        }

        if (openBtn && panel) {
            openBtn.addEventListener('click', function () {
                panel.classList.remove('hidden');
                panel.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                    panel.classList.add('hidden');
                    panel.style.display = 'none';
                    document.body.style.overflow = '';
                });
            }

            // Close on link click
            panel.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    panel.classList.add('hidden');
                    panel.style.display = 'none';
                    document.body.style.overflow = '';
                });
            });
        }
    }

    /* ─── Blog Pagination & Filtering (Dynamic) ───────────────────────────── */
    function initBlog() {
        var grid = document.getElementById('blog-grid');
        if (!grid) return;

        // 1. Supabase Initialization
        var supabaseUrl = 'https://jyjhpqtqbwtxxgijxetq.supabase.co';
        var supabaseKey = 'sb_publishable_LZduUlJ96GYtgyo0l-iTzw_P-8Glk_v';
        
        if (typeof supabase === 'undefined') {
            console.error('Supabase library not loaded. Dynamic blog updates disabled.');
            return;
        }

        var supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        var searchInput = document.getElementById('blog-search-input');
        var catBtns = Array.from(document.querySelectorAll('.blog-category-btn'));
        var prevBtn = document.getElementById('blog-prev-btn');
        var nextBtn = document.getElementById('blog-next-btn');
        var pageBtns = Array.from(document.querySelectorAll('.blog-page-btn'));
        var paginationWrapper = document.getElementById('blog-pagination');
        var scrollAnchor = document.getElementById('blog-search-input') || grid; 

        var POSTS_PER_PAGE = 15;
        var currentPage = 1;
        var currentCategory = 'all';
        var currentSearch = '';
        var allPosts = []; // Will store fetched data

        // Helper: Category Emoji Mapping
        var emojiMap = {
            'exams': '\ud83d\udcdd',
            'life-abroad': '\ud83c\udf0d',
            'study-tips': '\ud83d\udca1',
            'imat': '\ud83c\udfe5',
            'tolc': '\ud83c\udf93'
        };

        // Initial Loading State
        grid.innerHTML = '<div class="col-span-full py-20 text-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div><p class="text-slate-500 font-bold">Loading blogs...</p></div>';

        async function fetchContent() {
            try {
                // Fetch Categories to update the buttons if needed (optional but good for consistency)
                var catRes = await supabaseClient.from('blog_categories').select('name, slug');
                if (catRes.data) {
                    // Update buttons with emojis if slugs match
                    catBtns.forEach(function(btn) {
                        var slug = btn.getAttribute('data-category');
                        if (slug !== 'all') {
                            var match = catRes.data.find(c => c.slug === slug);
                            if (match && btn.innerText.indexOf('\ud83d') === -1) {
                                btn.innerText = (emojiMap[slug] || '\ud83d\udccc') + ' ' + match.name;
                            }
                        }
                    });
                }

                // Fetch Posts - latest first
                var { data, error } = await supabaseClient
                    .from('blog_posts')
                    .select('*, blog_categories(name, slug)')
                    .order('created_at', { ascending: false })
                    .order('published_at', { ascending: false });

                if (error) throw error;
                allPosts = data || [];
                console.log('Blog Sync — Fetched ' + allPosts.length + ' posts:', allPosts);
                render();
            } catch (err) {
                console.error('Error fetching blog data:', err);
            }
        }

        function render() {
            // Filter
            var filtered = allPosts.filter(function(post) {
                var title = (post.title || '').toLowerCase();
                var cat = (post.blog_categories && post.blog_categories.slug) || 'none';
                var matchSearch = currentSearch === '' || title.indexOf(currentSearch) !== -1;
                var matchCat = currentCategory === 'all' || cat === currentCategory;
                return matchSearch && matchCat;
            });

            console.log('Blog Sync — Rendering ' + filtered.length + ' posts (Page ' + currentPage + ')');
            var totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE) || 1;
            if (currentPage > totalPages) currentPage = Math.max(1, totalPages);

            var start = (currentPage - 1) * POSTS_PER_PAGE;
            var end = start + POSTS_PER_PAGE;

            // Render Grid Content
            if (filtered.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[3rem]"><div class="text-6xl mb-4">\ud83d\udca3</div><h3 class="text-2xl font-black text-slate-900 mb-2">No posts found</h3><p class="text-slate-500 font-bold">Try adjusting your search or filters!</p></div>';
            } else {
                var html = `
                <style>
                    .card-body { display: flex; width: 100%; background-color: white; }
                    .date-time-container { writing-mode: vertical-lr; transform: rotate(180deg); padding: 1rem 0.5rem; background-color: #f8fafc; border-right: 1px solid #f1f5f9; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
                    .date-time { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #334155; letter-spacing: 0.1em; }
                    .separator { width: 1px; height: 24px; background-color: #cbd5e1; }
                    .content { display: flex; flex: 1; flex-direction: column; justify-content: space-between; }
                    .infos { padding: 1.5rem; }
                    .title { font-weight: 900; text-transform: uppercase; font-size: 1.1rem; line-height: 1.3; color: #0f172a; text-decoration: none; display: block; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
                    .description { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; font-size: 0.875rem; line-height: 1.6; color: #64748b; font-weight: 500; }
                    .action-btn { background-color: #fde047; padding: 1rem; text-align: center; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #0f172a; transition: all 0.2s; }
                    .action-btn:hover { background-color: #facc15; color: black; }
                </style>
                `;
                html += filtered.slice(start, end).map(function(post, idx) {
                    var date = new Date(post.published_at || post.created_at);
                    var year = date.getFullYear();
                    var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                    var image = post.featured_image || '';
                    var categorySlug = (post.blog_categories && post.blog_categories.slug) || 'none';

                    var imgHtml = image 
                        ? '<img src="' + image + '" alt="' + post.title + '" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">'
                        : '<div class="w-full h-full bg-slate-100 flex items-center justify-center"><span class="text-4xl">\ud83c\udf92</span></div>';

                    return `
                        <div class="blog-post-card animate-fade-in" style="animation-delay: ${idx * 0.1}s">
                            <div class="card-wrapper group h-full flex flex-col bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-100">
                                <a class="block relative aspect-video overflow-hidden" href="/blog/${post.slug}">
                                    ${imgHtml}
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                                <div class="card-body flex flex-1">
                                    <div class="date-time-container">
                                        <time class="date-time" datetime="${date.toISOString().split('T')[0]}">
                                            <span>${year}</span>
                                            <span class="separator"></span>
                                            <span>${dateStr}</span>
                                        </time>
                                    </div>
                                    <div class="content">
                                        <div class="infos">
                                            <a href="/blog/${post.slug}">
                                                <span class="title group-hover:text-indigo-600 transition-colors">${post.title}</span>
                                            </a>
                                            <p class="description">${post.excerpt || ''}</p>
                                        </div>
                                        <a class="action-btn" href="/blog/${post.slug}">Read Article</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                grid.innerHTML = html;
            }

            // Update Pagination UI
            if (paginationWrapper) {
                paginationWrapper.style.display = totalPages <= 1 ? 'none' : 'flex';
                if (prevBtn) {
                    prevBtn.disabled = currentPage === 1;
                    prevBtn.style.opacity = currentPage === 1 ? '0.3' : '1';
                }
                if (nextBtn) {
                    nextBtn.disabled = currentPage === totalPages;
                    nextBtn.style.opacity = currentPage === totalPages ? '0.3' : '1';
                }
                
                // Clear and rebuild page buttons for dynamic total
                var pageNumbersContainer = document.getElementById('blog-page-numbers');
                if (pageNumbersContainer) {
                    var pagesHtml = '';
                    for (var i = 1; i <= totalPages; i++) {
                        var activeClass = i === currentPage 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'bg-white text-slate-400 hover:text-indigo-600 border-2 border-slate-100 hover:border-indigo-100';
                        pagesHtml += `<button data-page="${i}" class="blog-page-btn w-10 h-10 rounded-xl font-black text-xs transition-all ${activeClass}">${i}</button>`;
                    }
                    pageNumbersContainer.innerHTML = pagesHtml;
                    
                    // Re-attach listeners to new buttons
                    pageNumbersContainer.querySelectorAll('.blog-page-btn').forEach(function(btn) {
                        btn.addEventListener('click', function(e) {
                            e.preventDefault();
                            var p = parseInt(this.getAttribute('data-page'), 10);
                            if (p) { currentPage = p; render(); doScroll(); }
                        });
                    });
                }
            }

            // Update Category Buttons UI
            catBtns.forEach(function(btn) {
                var cat = btn.getAttribute('data-category');
                if (cat === currentCategory) {
                    btn.className = 'blog-category-btn px-6 py-3 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all shadow-sm bg-indigo-600 border-indigo-600 text-white';
                } else {
                    btn.className = 'blog-category-btn px-6 py-3 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all shadow-sm bg-white border-slate-100 text-slate-600 hover:border-indigo-400 hover:text-indigo-600';
                }
            });
        }

        function doScroll() {
            if (scrollAnchor) {
                var y = scrollAnchor.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }

        // Search Listener
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                currentSearch = e.target.value.toLowerCase();
                currentPage = 1;
                render();
            });
        }

        // Category Listeners
        catBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var cat = this.getAttribute('data-category');
                if (cat) {
                    currentCategory = cat;
                    currentPage = 1;
                    render();
                }
            });
        });

        // Prev/Next Listeners
        if (prevBtn) prevBtn.addEventListener('click', function(e) { 
            e.preventDefault();
            if (currentPage > 1) { currentPage--; render(); doScroll(); } 
        });
        
        if (nextBtn) nextBtn.addEventListener('click', function(e) { 
            e.preventDefault();
            if (currentPage < Math.ceil(allPosts.length / POSTS_PER_PAGE)) {
                currentPage++; render(); doScroll(); 
            }
        });

        // Initial Fetch
        fetchContent();
    }

    /* ─── Mock Tests (CEnT-S & IMAT)  ───────────────────────────── */
    function initMocks() {
        var path = window.location.pathname;
        var isCents = path.indexOf('/cent-s-mock') !== -1;
        var isImat = path.indexOf('/imat-mock') !== -1;
        
        if (!isCents && !isImat) return;

        var container = document.getElementById('mock-list-container');
        if (!container) return;

        var examType = isCents ? 'cent-s-prep' : 'imat-prep';

        if (typeof window.supabase === 'undefined') {
            container.innerHTML = '<div class="text-center py-20 text-red-500 font-bold">Error: Supabase client not loaded.</div>';
            return;
        }

        var sbUrl = 'https://jyjhpqtqbwtxxgijxetq.supabase.co';
        var sbKey = 'sb_publishable_LZduUlJ96GYtgyo0l-iTzw_P-8Glk_v';
        var sbClient = window.supabase.createClient(sbUrl, sbKey);

        container.innerHTML = '<div class="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200"><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-6"></div><p class="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Loading simulations...</p></div>';

        // Check auth status synchronously based on the auth-check script
        var isLogged = !!window.__IS_LOGGED_IN;

        function handleStartSimulation(sessionId, isPast) {
            if (!isLogged) {
                // Not logged in -> go to auth page with redirect back here or directly to waiting room
                window.location.href = '/auth'; // User wants them to be redirected
                return;
            }
            if (isPast) {
                window.location.href = '/mock-guidelines?session_id=' + sessionId + '&exam_type=' + examType;
            } else {
                window.location.href = '/waiting-room/' + sessionId;
            }
        }
        window.handleStartSimulation = handleStartSimulation; // Export to global for inline onclick

        // Icons SVG definitions (tailored from Lucide)
        var clockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
        var targetIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
        var medalIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.61 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><polyline points="12 18 12 19 13 20"/></svg>';

        function renderCard(session, isNewest, totalCount, index) {
            var isUpcoming = session.statusFlag === 'upcoming' || session.statusFlag === 'live';
            var indexStr = (totalCount - index).toString().padStart(2, '0');
            var borderClass = isNewest ? "border-indigo-600 ring-4 ring-indigo-50 shadow-2xl" : "border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50";
            
            var badgeHtml = isNewest 
                ? '<div class="px-3 py-1 bg-indigo-600 rounded-full text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest">New</div>'
                : (isUpcoming 
                    ? '<div class="px-3 py-1 bg-emerald-100 rounded-full text-[8px] md:text-[9px] font-black text-emerald-600 uppercase tracking-widest">Upcoming</div>'
                    : '<div class="px-3 py-1 bg-slate-100 rounded-full text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Archive</div>');

            var btnText = 'Start Simulation';
            if (!isLogged) btnText = 'Login to Start';
            if (session.statusFlag === 'upcoming') btnText = 'Register Now';

            var isPast = session.statusFlag === 'past';

            return `
            <div class="group bg-white rounded-[2rem] md:rounded-[2.5rem] border-2 p-6 md:p-8 flex flex-col transition-all duration-500 relative overflow-hidden ${borderClass}">
                <div class="flex items-center justify-between mb-6 md:mb-8">
                    <div class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        Simulator #${indexStr}
                    </div>
                    ${badgeHtml}
                </div>
                <h3 class="text-xl md:text-2xl font-black text-slate-900 mb-6 leading-[1.2] group-hover:text-indigo-600 transition-colors">
                    ${session.title}
                </h3>
                <div class="space-y-4 mb-8 md:mb-10 flex-grow">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">${clockIcon}</div>
                        <span class="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">110 Minutes / Sectioned</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">${targetIcon}</div>
                        <span class="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">55 Questions / +1/-0.25 Scoring</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">${medalIcon}</div>
                        <span class="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Ranking & Analysis Enabled</span>
                    </div>
                </div>
                <button onclick="handleStartSimulation('${session.id}', ${isPast})" class="w-full inline-flex items-center justify-center h-12 md:h-14 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 bg-indigo-600 text-white hover:bg-indigo-700">
                    ${btnText}
                </button>
            </div>
            `;
        }

        async function fetchMocks() {
            try {
                var res = await sbClient.from('mock_sessions')
                    .select('*')
                    .eq('is_active', true)
                    .eq('exam_type', examType)
                    .order('start_time', { ascending: false });
                
                if (res.error) throw res.error;
                var sessions = res.data || [];
                var now = new Date();
                
                sessions.forEach(function(s) {
                    var st = new Date(s.start_time);
                    var et = new Date(s.end_time);
                    if (st > now) s.statusFlag = 'upcoming';
                    else if (et < now) s.statusFlag = 'past';
                    else s.statusFlag = 'live';
                });

                var upcoming = sessions.filter(function(s) { return s.statusFlag === 'upcoming' || s.statusFlag === 'live'; });
                var archive = sessions.filter(function(s) { return s.statusFlag === 'past'; });

                if (sessions.length === 0) {
                    container.innerHTML = '<div class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center"><p class="text-slate-400 font-bold">The exam archive is currently being updated. Please check back later!</p></div>';
                    return;
                }

                var html = '';
                
                if (upcoming.length > 0) {
                    html += '<div class="mb-12"><h3 class="text-xl font-black mb-6 text-slate-900 border-b border-indigo-100 pb-2 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Upcoming / Live Simulations</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">';
                    upcoming.forEach(function(s, i) { html += renderCard(s, false, sessions.length, i); });
                    html += '</div></div>';
                }

                if (archive.length > 0) {
                    html += '<div class="mb-12"><h3 class="text-xl font-black mb-6 text-slate-900 border-b border-slate-200 pb-2">Archive / Past Simulations</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">';
                    archive.forEach(function(s, i) { html += renderCard(s, i === 0, archive.length, i); });
                    html += '</div></div>';
                }

                container.innerHTML = html;
            } catch (err) {
                console.error('Error fetching mock sessions:', err);
                container.innerHTML = '<div class="text-center py-20 text-red-500 font-bold">Failed to load mock tests. Code: ' + err.message + '</div>';
            }
        }

        fetchMocks();
    }
})();
