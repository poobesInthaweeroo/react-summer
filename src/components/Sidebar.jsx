import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setOpen(false);
  }, [window.location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Hamburger */}
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>

      {/* Overlay */}
      <div
        className={`overlay ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          Poobes.<span>i</span>
        </div>

        <div className="sidebar-avatar">
          <img src="https://img2.pic.in.th/IMG_9496.jpg" alt="poobes_inthaweero" />
        </div>

        <div className="sidebar-name">ภูเบศ อินทวีโร</div>
        <div className="sidebar-role">ผู้ช่วยนักวิจัย &amp; NT eService</div>

        <div className="sidebar-social ">
          {[
            { icon: 'fab fa-facebook-f', href: 'https://web.facebook.com/poobes.inthaweero/' },
            { icon: 'fab fa-instagram',  href: 'https://www.instagram.com/poobes_/' },
            { icon: 'fab fa-google',   href: '#' },
          ].map(({ icon, href }) => (
            <a key={icon} href={href} aria-label={icon}>
              <i className={icon} />
            </a>
          ))}
        </div>

        <nav className="sidebar-nav">
          <ul>
            {[
              { to: '#',           icon: 'fas fa-home',          label: 'Home'       },
              { to: '#about',      icon: 'fas fa-user',          label: 'About'      },
              { to: '#services',   icon: 'fas fa-briefcase',     label: 'Services'   },
              { to: '#experience', icon: 'fa-solid fa-align-right',label: 'Experience' },
              { to: '#works',      icon: 'fas fa-th',            label: 'Works'      },
              { to: '#contact',    icon: 'fas fa-envelope',      label: 'Contact'    },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <a href={to} onClick={() => setOpen(false)}> <i className={icon} /> {label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="sidebar-footer">© 2026 : Poobes Inthaweero</p>
      </aside>
    </>
  );
}
