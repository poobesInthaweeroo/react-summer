import { useEffect, useRef } from 'react';

const PHRASES = ['ผู้ช่วยนักวิจัย', 'สายเทคโนโลยีและเอไอ', 'งานดิจิทัลและนวัตกรรม', 'กำลังพัฒนาทักษะด้านไอทีและงานวิจัย'];

export default function Home() {
  const typedRef = useRef(null);
  const state = useRef({ phraseIdx: 0, charIdx: 0, deleting: false, timer: null });

  useEffect(() => {
    function tick() {
      const s = state.current;
      const current = PHRASES[s.phraseIdx];
      s.charIdx += s.deleting ? -1 : 1;
      if (typedRef.current) {
        typedRef.current.textContent = current.substring(0, s.charIdx);
      }
      let delay = s.deleting ? 60 : 100;
      if (!s.deleting && s.charIdx === current.length) { delay = 1800; s.deleting = true; }
      if (s.deleting && s.charIdx === 0) {
        s.deleting = false;
        s.phraseIdx = (s.phraseIdx + 1) % PHRASES.length;
        delay = 400;
      }
      s.timer = setTimeout(tick, delay);
    }
    tick();
    const savedState = state.current;
    return () => clearTimeout(savedState.timer);
  }, []);

  return (
    <section id="home" className="home-section">
      <div className="home-inner">
        <p className="home-greeting">สวัสดีครับ</p>
        <h1 className="home-name">ภูเบศ <span className="accent">อินทวีโร</span></h1>
        <div className="home-typed">
          <span ref={typedRef} />
          <span className="typed-cursor" />
        </div>
        <p className="home-desc">
          ผู้ช่วยนักวิจัยที่ NT โทรคมนาคม สนใจด้านเทคโนโลยี ระบบเครือข่าย และงานดิจิทัล ชอบเรียนรู้สิ่งใหม่ ๆ
          รวมถึงพัฒนาไอเดียและโปรเจกต์ให้สามารถใช้งานได้จริงผ่านเทคโนโลยีสมัยใหม่
          พร้อมทั้งสนุกกับการแก้ปัญหาและสร้างสรรค์งานที่ช่วยให้การทำงานมีประสิทธิภาพมากขึ้น
        </p>
        <div className="home-btns">
          <a href="#contact" className="btn btn-primary">
            <i className="fas fa-paper-plane" /> ติดต่อฉัน
          </a>
          <a href="#works" className="btn btn-outline">
            <i className="fas fa-eye" /> ผลงานของฉัน
          </a>
        </div>
      </div>
      <a href="#about" className="home-scroll">เลื่อนลง</a>
    </section>
  );
}