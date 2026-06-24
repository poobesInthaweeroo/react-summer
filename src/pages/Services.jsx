import { useEffect, useRef } from 'react';

const SERVICES = [
  { icon: 'fa-solid fa-person-chalkboard',   title: 'Present',           desc: 'การฝึกงานครั้งนี้ช่วยให้ผมพัฒนาทักษะด้าน Presentation ได้ดีขึ้น ทั้งการเตรียมเนื้อหา การพูดนำเสนอ และการตอบคำถามระหว่างการประชุม' },
  { icon: 'fas fa-code',            title: 'Python',            desc: 'การฝึกงานช่วยให้ผมได้ฝึกใช้ Python ในการทำงานร่วมกับระบบและเครื่องมือต่าง ๆ ภายในองค์กร' },
  { icon: 'fa-solid fa-brain',      title: 'Logical Thinking',   desc: 'การทำงานระหว่างฝึกงานช่วยพัฒนาทักษะด้าน Logic และการคิดวิเคราะห์ เพื่อประยุกต์ใช้ในการเขียนโปรแกรมและการแก้ไขปัญหา' },
  { icon: 'fa-solid fa-users',      title: 'Teamwork',          desc: 'การฝึกงานครั้งนี้ช่วยให้ผมได้พัฒนาทักษะการทำงานร่วมกับผู้อื่น และเรียนรู้การทำงานเป็นทีมในสภาพแวดล้อมการทำงานจริง' },
  { icon: 'fas fa-search',          title: 'การค้นคว้าและศึกษาด้วยตนเอง',     desc: 'การทำงานจริงช่วยให้ผมพัฒนาทักษะการศึกษาค้นคว้า การวิเคราะห์ข้อมูล และการแก้ปัญหาด้วยตนเอง' },
  { icon: 'fas fa-chart-line',      title: 'ความละเอียดรอบคอบ', desc: 'การทำงานจริงช่วยให้ผมเรียนรู้ความสำคัญของความถูกต้อง ความแม่นยำ และการตรวจสอบงานก่อนส่งมอบ' },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services"  className="page-section" ref={ref}>
      <div className="section-header fade-up">
        <p className="section-eyebrow">ทักษะที่ได้รับ</p>
        <h2 className="section-title">Skills <span className="accent">acquired</span></h2>
        <div className="section-divider" />
      </div>

      <div className="services-grid">
        {SERVICES.map(({ icon, title, desc }) => (
          <div className="service-card fade-up" key={title}>
            <div className="service-icon"><i className={icon} /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <p className="services-cta fade-up">
        ประสบการณ์และทักษะการเรียนรู้จากการฝึกงานใน NT eService
      </p>
    </section>
  );
}
