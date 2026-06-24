import { useState, useEffect, useRef } from 'react';

// ===== Import รูปจาก src/assets/works/ =====
import week0_1248 from '../assets/works/week0_IMG_1248.jpg';
import week0_1252 from '../assets/works/week0_IMG_1252.jpg';
import week0_1280 from '../assets/works/week0_IMG_1280.jpg';
import week0_1281 from '../assets/works/week0_IMG_1281.jpg';
import week0_1290 from '../assets/works/week0_IMG_1290.jpg';

import week1_1309 from '../assets/works/week1_IMG_1309.jpg';
import week1_1310 from '../assets/works/week1_IMG_1310.jpg';
import week1_1311 from '../assets/works/week1_IMG_1311.jpg';
import week1_1318 from '../assets/works/week1_IMG_1318.jpg';
import week1_1326 from '../assets/works/week1_IMG_1326.jpg';
import week1_1328 from '../assets/works/week1_IMG_1328.jpg';
import week1_1331 from '../assets/works/week1_IMG_1331.jpg';
import week1_1332 from '../assets/works/week1_IMG_1332.jpg';

import week3_1427 from '../assets/works/week3_IMG_1427.jpg';
import week3_1429 from '../assets/works/week3_IMG_1429.jpg';
import week3_1461 from '../assets/works/week3_IMG_1461.jpg';
import week3_1462 from '../assets/works/week3_IMG_1462.jpg';
import week3_1463 from '../assets/works/week3_IMG_1463.jpg';

import week4_1491 from '../assets/works/week4_IMG_1491.jpg';

import week6_1642 from '../assets/works/week6_IMG_1642.jpg';
import week6_1650 from '../assets/works/week6_IMG_1650.jpg';
import week6_1651 from '../assets/works/week6_IMG_1651.jpg';
import week6_1652 from '../assets/works/week6_IMG_1652.jpg';
import week6_1653 from '../assets/works/week6_IMG_1653.jpg';
import week6_1654 from '../assets/works/week6_IMG_1654.jpg';
import week6_1655 from '../assets/works/week6_IMG_1655.jpg';
import week6_1656 from '../assets/works/week6_IMG_1656.jpg';
import week6_1658 from '../assets/works/week6_IMG_1658.jpg';
import week6_1742 from '../assets/works/week6_IMG_1742.jpg';
import week6_1743 from '../assets/works/week6_IMG_1743.jpg';

import week7_1776 from '../assets/works/week7_IMG_1776.jpg';

// ===== ข้อมูลผลงาน แบ่งตามสัปดาห์ (ตาม EXIF date) =====
const WORKS = [
  // Week 1
  { id: 1,  cat: ['week0'], week: 'week 1', title: 'ภาพที่ 1', img: week0_1248 },
  { id: 2,  cat: ['week0'], week: 'week 1', title: 'ภาพที่ 2', img: week0_1252 },
  { id: 3,  cat: ['week0'], week: 'week 1', title: 'ภาพที่ 3', img: week0_1280 },
  { id: 4,  cat: ['week0'], week: 'week 1', title: 'ภาพที่ 4', img: week0_1281 },
  { id: 5,  cat: ['week0'], week: 'week 1', title: 'ภาพที่ 5', img: week0_1290 },

  // Week 2 (5–7 พ.ค.)
  { id: 6,  cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 1', img: week1_1309 },
  { id: 7,  cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 2', img: week1_1310 },
  { id: 8,  cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 3', img: week1_1311 },
  { id: 9,  cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 4', img: week1_1318 },
  { id: 10, cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 5', img: week1_1326 },
  { id: 11, cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 6', img: week1_1328 },
  { id: 12, cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 7', img: week1_1331 },
  { id: 13, cat: ['week2'], week: 'Week 2', title: 'ภาพที่ 8', img: week1_1332 },

  // Week 3 (20–25 พ.ค.)
  { id: 14, cat: ['week3'], week: 'Week 3', title: 'ภาพที่ 1', img: week3_1427 },
  { id: 15, cat: ['week3'], week: 'Week 3', title: 'ภาพที่ 2', img: week3_1429 },
  { id: 16, cat: ['week3'], week: 'Week 3', title: 'ภาพที่ 3', img: week3_1461 },
  { id: 17, cat: ['week3'], week: 'Week 3', title: 'ภาพที่ 4', img: week3_1462 },
  { id: 18, cat: ['week3'], week: 'Week 3', title: 'ภาพที่ 5', img: week3_1463 },

  // Week 4 (29 พ.ค.)
  { id: 19, cat: ['week4'], week: 'Week 4', title: 'ภาพที่ 1', img: week4_1491 },

  // Week 6 (10–15 มิ.ย.)
  { id: 20, cat: ['week6'], week: 'Week 6', title: 'ภาพที่ 1',  img: week6_1642 },
  { id: 29, cat: ['week6'], week: 'Week 6', title: 'ภาพที่ 10', img: week6_1742 },
  { id: 30, cat: ['week6'], week: 'Week 6', title: 'ภาพที่ 11', img: week6_1743 },

  // Week 7-8 (19 มิ.ย.)
  { id: 31, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 1', img: week7_1776 },
  { id: 21, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 2',  img: week6_1650 },
  { id: 22, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 3',  img: week6_1651 },
  { id: 23, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 4',  img: week6_1652 },
  { id: 24, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 5',  img: week6_1653 },
  { id: 25, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 6',  img: week6_1654 },
  { id: 26, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 7',  img: week6_1655 },
  { id: 27, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 8',  img: week6_1656 },
  { id: 28, cat: ['week7'], week: 'Week 7', title: 'ภาพที่ 9',  img: week6_1658 },
];

const FILTERS = [
  { key: 'all',   label: 'ทั้งหมด' },
  { key: 'week0', label: 'Week 1' },
  { key: 'week2', label: 'Week 2' },
  { key: 'week3', label: 'Week 3' },
  { key: 'week4', label: 'Week 4' },
  { key: 'week6', label: 'Week 6' },
  { key: 'week7', label: 'Week 7-8' },
];

export default function Works() {
  const [active, setActive] = useState('all');
  const ref = useRef(null);

  const visible = active === 'all'
    ? WORKS
    : WORKS.filter(w => w.cat.includes(active));

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 60);
      });
    }, { threshold: 0.05 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [visible]);

  return (
    <section id="works" className="page-section" ref={ref}>
      <div className="section-header fade-up">
        <p className="section-eyebrow">My Portfolio</p>
        <h2 className="section-title">ภาพประกอบ<span className="accent">การฝึกงาน</span></h2>
        <div className="section-divider" />
      </div>

      <div className="filter-group fade-up">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${active === key ? 'active' : ''}`}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="works-grid">
        {visible.map(({ id, week, title, img }) => (
          <div className="work-item fade-up" key={id}>
            <img src={img} alt={title} loading="lazy" />
            <div className="work-overlay">
              <div className="work-cat">{week}</div>
              <div className="work-title">{title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}