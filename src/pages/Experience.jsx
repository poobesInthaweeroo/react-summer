import { useState, useEffect, useRef } from 'react';

const WEEKS = [
  {
    id: 1,
    label: 'Week 1',
    title: 'Jupyter & Conducting Polymer',
    subtitle: 'ติดตั้งระบบ และศึกษา Jupyter & Conducting Polymer',
    icon: 'fas fa-laptop-code',
    color: '#6366f1',
    activities: [
      { icon: 'fas fa-download',  title: 'ติดตั้งระบบ',        desc: 'ลงระบบ WSL และ Conda สำหรับพัฒนา' },
      { icon: 'fas fa-book',      title: 'ศึกษา Polymer',      desc: 'ศึกษาเรื่อง Conducting Polymer Mechanisms' },
      { icon: 'fas fa-flask',     title: 'สำรวจ Lab',          desc: 'สำรวจระบบและอุปกรณ์ห้อง Lab' },
      { icon: 'fab fa-github',    title: 'Clone GitHub',       desc: 'Clone Amazon-Braket จาก GitHub' },
      { icon: 'fas fa-code',      title: 'Jupyter Notebook',   desc: 'ศึกษาวิธีใช้งาน Jupyter Notebook' },
      { icon: 'fas fa-atom',      title: 'Soliton Theory',     desc: 'ศึกษา Soliton solutions in polaron theory' },
    ],
    problem: 'เนื้อหาเกี่ยวกับ Polaron และ Soliton ค่อนข้างเข้าใจยากในช่วงแรก | ศึกษาจากงานวิจัยและเอกสารเพิ่มเติมเพื่อทำความเข้าใจเนื้อหาให้มากขึ้น',
  },
  {
    id: 2,
    label: 'Week 2',
    title: 'AWS & Quantum Computing',
    subtitle: 'ทำคู่มือ AWS และทดลองรัน Quantum Lab',
    icon: 'fab fa-aws',
    color: '#f97316',
    activities: [
      { icon: 'fas fa-book-open',   title: 'คู่มือ AWS',         desc: 'ทำคู่มือการใช้งาน aws.amazon.com' },
      { icon: 'fas fa-atom',        title: 'Quantum Computing',  desc: 'Amazon-Qiskit Quantum Computing (.py)' },
      { icon: 'fas fa-play-circle', title: 'Lab Code',           desc: 'Edit & Run lab_code ควอนตัม h, cx' },
      { icon: 'fas fa-server',      title: 'เช็คสเปกเซิร์ฟเวอร์', desc: 'ตรวจสอบสเปกเครื่องเซิร์ฟเวอร์' },
      { icon: 'fas fa-robot',       title: 'OpenAI & AWS',       desc: 'ศึกษาการเชื่อมต่อ OpenAI กับ AWS' },
      { icon: 'fas fa-cube',        title: 'Ollama & Llama',     desc: 'ติดตั้ง Ollama, Llama บน Server' },
      { icon: 'fas fa-eye',         title: 'VLM & Gemma',        desc: 'ศึกษา VLM และ Gemma 4' },
    ],
    problem: 'ยังไม่คุ้นเคยกับการใช้งาน AWS และบริการต่าง ๆ ภายในระบบ | ศึกษาคู่มือการใช้งานและทดลองใช้งานจริงด้วยตนเอง',
  },
  {
    id: 3,
    label: 'Week 3',
    title: 'AI Benchmarking',
    subtitle: 'ทดสอบประสิทธิภาพ Llama4 และ GPU Card',
    icon: 'fas fa-brain',
    color: '#8b5cf6',
    activities: [
      { icon: 'fas fa-tachometer-alt', title: 'Benchmarking',      desc: 'Test Benchmarking Llama4 Scout' },
      { icon: 'fas fa-microchip',      title: 'Xilinx Alveo U50',  desc: 'หาข้อมูลการ์ด Xilinx Alveo U50LVU' },
      { icon: 'fas fa-chart-bar',      title: 'MMLU Test',         desc: 'Test MMLU ด้วย Llama4 Scout' },
    ],
    problem: 'การวิเคราะห์ผล Benchmark และการเปรียบเทียบประสิทธิภาพของโมเดลใช้เวลาค่อนข้างมาก | ศึกษาเกณฑ์การประเมินและบันทึกผลการทดสอบอย่างเป็นระบบ',
  },
  {
    id: 4,
    label: 'Week 4',
    title: 'AI RAG System',
    subtitle: 'สร้างระบบ RAG ด้วย Llama4 Scout',
    icon: 'fas fa-database',
    color: '#10b981',
    activities: [
      { icon: 'fas fa-project-diagram', title: 'RAG Llama4',   desc: 'ทำ RAG ด้วย Llama4 Scout' },
      { icon: 'fas fa-file-powerpoint', title: 'Slide RAG',    desc: 'จัดทำ Slide เนื้อหาการทำ RAG' },
    ],
    problem: 'ผลลัพธ์ของ RAG ในช่วงแรกยังตอบไม่ตรงกับข้อมูลที่ต้องการ | ปรับปรุงชุดข้อมูลและทดลองปรับแต่งการตั้งค่าหลายรูปแบบ',
  },
  {
    id: 5,
    label: 'Week 5',
    title: 'นำเสนอผลงาน AI',
    subtitle: 'พรีเซนต์ผลการวิจัยด้าน AI',
    icon: 'fas fa-chalkboard-teacher',
    color: '#ec4899',
    activities: [
      { icon: 'fa-brands fa-slideshare', title: 'พรีเซนต์ AI', desc: 'นำเสนอผลงานและความคืบหน้าด้าน AI' },
    ],
    problem: 'การสรุปเนื้อหาจำนวนมากเพื่อใช้ในการนำเสนอค่อนข้างท้าทาย | จัดลำดับเนื้อหาใหม่และฝึกซ้อมการนำเสนอหลายรอบ',
  },
  {
    id: 6,
    label: 'Week 6',
    title: 'Fine-tune & Quantum Docs',
    subtitle: 'Fine-tune โมเดลและจัดทำเอกสาร Quantum',
    icon: 'fas fa-sliders-h',
    color: '#f59e0b',
    activities: [
      { icon: 'fas fa-cogs',       title: 'Fine-tune HITL',    desc: 'Fine-tune Human in the Loop' },
      { icon: 'fab fa-markdown',   title: 'Markdown Quantum',  desc: 'จัดทำเอกสาร Markdown เรื่องควอนตัม' },
    ],
    problem: 'แนวคิด Human in the Loop มีรายละเอียดหลายส่วนที่ต้องศึกษาเพิ่มเติม | ศึกษาตัวอย่างการใช้งานจริงและสอบถามข้อมูลเพิ่มเติมจากพี่เลี้ยง',
  },
  {
    id: 7,
    label: 'Week 7',
    title: 'อัปเกรด Server & RAG Gemma',
    subtitle: 'เพิ่ม RAM เซิร์ฟเวอร์และทำ RAG สำหรับ Gemma4',
    icon: 'fas fa-server',
    color: '#ef4444',
    activities: [
      { icon: 'fas fa-memory',          title: 'Upgrade RAM',   desc: 'อัปเกรด RAM เซิร์ฟเวอร์' },
      { icon: 'fas fa-project-diagram', title: 'RAG Gemma4',    desc: 'สร้างระบบ RAG สำหรับ Gemma4' },
    ],
    problem: 'การพัฒนา RAG สำหรับ Gemma 4 ต้องทดลองหลายวิธีเพื่อให้ได้ผลลัพธ์ที่เหมาะสม | ปรับแต่ง Prompt และทดสอบร่วมกับชุดข้อมูลหลายรูปแบบ',
  },
  {
    id: 8,
    label: 'Week 8',
    title: 'Docs & Test Gemma4',
    subtitle: 'จัดทำเอกสารและทดสอบ User กับ Gemma4',
    icon: 'fas fa-file-alt',
    color: '#6366f1',
    activities: [
      { icon: 'fab fa-markdown', title: 'Markdown Gemma4', desc: 'จัดทำเอกสาร Markdown สำหรับ Gemma4' },
      { icon: 'fas fa-users',    title: 'Test User',       desc: 'ทดสอบการใช้งานกับผู้ใช้จริง' },
    ],
    problem: 'ผลการทดสอบจากผู้ใช้งานแต่ละคนมีความแตกต่างกัน ทำให้ประเมินผลได้ยาก | รวบรวมข้อเสนอแนะจากผู้ใช้งานและนำมาปรับปรุงระบบ',
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const week = WEEKS[activeTab];

  // fade-up observer
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.fade-up');
    els.forEach(el => el.classList.remove('visible'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 60);
      });
    }, { threshold: 0.05 });
    requestAnimationFrame(() => {
      els.forEach(el => obs.observe(el));
    });
    return () => obs.disconnect();
  }, [activeTab]);

  return (
    <section id="experience" className="page-section page-section--alt" ref={ref}>

      {/* Header */}
      <div className="section-header fade-up" style={{ textAlign: 'center' }}>
        <span className="exp-eyebrow-pill">บันทึกการฝึกปฏิบัติงานรายสัปดาห์</span>
        <h2 className="section-title" style={{ marginTop: 14 }}>
          ระยะเวลาฝึกงานทั้งหมด <span className="accent">{WEEKS.length} สัปดาห์</span>
        </h2>
        <p className="exp-header-desc">
          บันทึกรวบรวมหน้าที่การทำงาน ความทักษะที่ได้พัฒนา สิ่งที่ได้เรียนรู้<br />
          และภาพประกอบการทำงานในแต่ละช่วงสัปดาห์
        </p>
        <div className="section-divider" style={{ margin: '14px auto 0' }} />
      </div>

      {/* Tabs */}
      <div className="exp-tabs fade-up">
        {WEEKS.map((w, i) => (
          <button
            key={w.id}
            className={`exp-tab-btn ${activeTab === i ? 'active' : ''}`}
            style={activeTab === i ? { background: w.color, borderColor: w.color } : {}}
            onClick={() => setActiveTab(i)}
          >
            {w.label}
          </button>
        ))}
      </div>

      {/* Week Card */}
      <div className="exp-card fade-up" style={{ '--week-color': week.color }}>

        {/* Card Header */}
        <div className="exp-card-header">
          <span className="exp-week-pill" style={{ background: `${week.color}20`, color: week.color }}>
            <i className={week.icon} /> WEEK {String(week.id).padStart(2, '0')}
          </span>
          <h3 className="exp-card-title">{week.title}</h3>
          <p className="exp-card-subtitle">{week.subtitle}</p>
        </div>

        {/* Activities */}
        <div className="exp-activities-header">
          <i className="fas fa-thumbtack" style={{ color: week.color }} /> กิจกรรมในสัปดาห์นี้
          <div className="exp-activities-underline" style={{ background: week.color }} />
        </div>

        <div className="exp-activities-grid">
          {week.activities.map(({ icon, title, desc }) => (
            <div className="exp-activity-card fade-up" key={title}>
              <div className="exp-activity-icon" style={{ background: `${week.color}15`, color: week.color }}>
                <i className={icon} />
              </div>
              <div className="exp-activity-blob" style={{ background: `${week.color}08` }} />
              <div className="exp-activity-title">{title}</div>
              <div className="exp-activity-desc">{desc}</div>
            </div>
          ))}
        </div>

        {/* Problem */}
        <div className="exp-problem-box" style={{ borderColor: `${week.color}40`, background: `${week.color}08` }}>
          <div className="exp-problem-title" style={{ color: week.color }}>
            <i className="fas fa-exclamation-circle" /> ปัญหาที่พบเจอ & วิธีแก้ไข
          </div>
          <p className="exp-problem-desc">{week.problem}</p>
        </div>

      </div>
    </section>
  );
}