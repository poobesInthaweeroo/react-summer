import { useEffect, useRef } from 'react';

const STATS = [
  { num: 22,  label: 'Articles' },
  { num: 11, label: 'Journals'     },
  { num: 1,  label: 'Book'  },
  { num: 22,  label: 'Articles' },
];

const INFO = [
  ['Name',          'Somrak Petchartee'],
  ['Email',         'somrak.petchartee@gmail.com'],
  ['Research',      'Development Department']
];

function useScrollReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ref]);
}

function useCounters(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const nums = ref.current.querySelectorAll('[data-count]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nums.forEach(el => {
          const target = parseInt(el.dataset.count);
          let start = null;
          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 2000, 1);
            el.textContent = Math.floor(p * target);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target;
          };
          requestAnimationFrame(step);
        });
        obs.disconnect();
      });
    }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
}

function useSkillBars(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        obs.disconnect();
      });
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
}

export default function About() {
  const pageRef  = useRef(null);
  const statsRef = useRef(null);
  const skillRef = useRef(null);

  useScrollReveal(pageRef);
  useCounters(statsRef);
  useSkillBars(skillRef);

  return (
    <section id="about" className="page-section page-section--alt" ref={pageRef}>
      <div className="section-header fade-up">
        <p className="section-eyebrow">หัวหน้างาน</p>
        <h2 className="section-title">Manager <span className="accent">NT</span></h2>
        <div className="section-divider" />
      </div>

      <div className="about-grid">
        {/* Image */}
        <div className="about-img-wrap fade-up">
          <img src="https://img1.pic.in.th/images/Screenshot-2026-05-13-095617.png" alt="Bolby Doe" />
          <div className="about-badge">
            <span>20+</span>Years of<br />Experience
          </div>
        </div>

        {/* Content */}
        <div className="fade-up" ref={skillRef}>
          <h3>ดร. สมรักษ์ เพชรชาตรี</h3>
          <p style={{ marginTop: 14 }}>เป็นผู้เชี่ยวชาญด้านวิศวกรรมโทรคมนาคมและการวิจัย ( Brownien Lab ) ดำรงตำแหน่ง Senior Director/Research Operations Manager ที่ Digital Innovation Center บริษัท NT Telecom PCL (กสท โทรคมนาคม เดิม) เชี่ยวชาญด้าน IoT, หุ่นยนต์, และปัญญาประดิษฐ์ (AI/GPT) โดยมีประสบการณ์สูงทั้งด้านการวิจัยทางวิชาการและการประยุกต์ใช้ในอุตสาหกรรม</p>

          <div className="about-info" style={{ marginTop: 20 }}>
            {INFO.map(([k, v]) => (
              <div className="about-info-item" key={k}>
                <strong>{k}:</strong>{v}
              </div>
            ))}
          </div>

          <a href="https://www.ntplc.co.th/home" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: 24 }}>
            <i className="fas fa-angle-right" /> โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row fade-up" ref={statsRef}>
        {STATS.map(({ num, label }) => (
          <div className="stat-item" key={label}>
            <div className="stat-num" data-count={num}>0</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
