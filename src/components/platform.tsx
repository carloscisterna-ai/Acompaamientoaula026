"use client";

import { useMemo, useState } from "react";
import { Icon } from "./icons";

type View = "inicio" | "agenda" | "observacion" | "retro" | "docentes";

const observations = [
  { teacher: "María José Herrera", initials: "MH", subject: "Lenguaje", course: "5° Básico A", date: "14 sep", time: "09:30", status: "Agendado", color: "peach" },
  { teacher: "Alejandro Muñoz", initials: "AM", subject: "Matemática", course: "8° Básico B", date: "16 sep", time: "11:15", status: "Por observar", color: "blue" },
  { teacher: "Paula Sandoval", initials: "PS", subject: "Ciencias", course: "2° Medio A", date: "18 sep", time: "10:00", status: "Agendado", color: "lilac" },
];

const teachers = ["María José Herrera", "Alejandro Muñoz", "Paula Sandoval", "Carolina Silva", "Rodrigo Pérez", "Francisca Soto"];

export function Platform() {
  const [view, setView] = useState<View>("inicio");
  const [period, setPeriod] = useState("2° período");
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<"schedule" | "feedback" | null>(null);
  const [notes, setNotes] = useState("La docente comunica el propósito de la clase y activa conocimientos previos mediante preguntas abiertas. Se observa participación sostenida del curso.");

  const title = useMemo(() => ({ inicio: "Inicio", agenda: "Agenda de acompañamientos", observacion: "Observaciones de aula", retro: "Retroalimentaciones", docentes: "Equipo docente" }[view]), [view]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 3000); };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span>J</span><span>F</span><span>K</span></div><div><strong>Acompaña</strong><small>Gestión docente 2026</small></div></div>
      <nav aria-label="Navegación principal">
        <p className="nav-label">GESTIÓN</p>
        <Nav icon="grid" label="Inicio" active={view === "inicio"} onClick={() => setView("inicio")} />
        <Nav icon="calendar" label="Agenda" count="3" active={view === "agenda"} onClick={() => setView("agenda")} />
        <Nav icon="clipboard" label="Observaciones" active={view === "observacion"} onClick={() => setView("observacion")} />
        <Nav icon="chat" label="Retroalimentación" count="5" active={view === "retro"} onClick={() => setView("retro")} />
        <p className="nav-label second">ADMINISTRACIÓN</p>
        <Nav icon="users" label="Docentes" active={view === "docentes"} onClick={() => setView("docentes")} />
        <Nav icon="book" label="Indicadores" active={false} onClick={() => notify("Los 32 indicadores están disponibles en la pauta de observación")} />
      </nav>
      <div className="side-note"><Icon name="spark"/><strong>Asistencia IA</strong><p>Transforma tus notas de aula en una retroalimentación clara y formativa.</p></div>
      <button className="profile"><span className="avatar coral">CC</span><span><strong>Carlos Cisterna</strong><small>Jefe de UTP · Admin</small></span><span className="dots">•••</span></button>
    </aside>

    <main>
      <header className="topbar"><div><span className="mobile-brand">Acompaña</span><h1>{title}</h1></div><div className="top-actions"><label className="search"><Icon name="search"/><input aria-label="Buscar" placeholder="Buscar docente..." /></label><button className="icon-btn" aria-label="Notificaciones"><Icon name="bell"/><i /></button></div></header>
      {view === "inicio" && <Dashboard period={period} setPeriod={setPeriod} openSchedule={() => setModal("schedule")} go={setView} notify={notify} />}
      {view === "agenda" && <Agenda openSchedule={() => setModal("schedule")} />}
      {view === "observacion" && <Observation notes={notes} setNotes={setNotes} notify={notify} />}
      {view === "retro" && <Feedback open={() => setModal("feedback")} />}
      {view === "docentes" && <Teachers />}
    </main>
    {modal === "schedule" && <ScheduleModal close={() => setModal(null)} save={() => { setModal(null); notify("Acompañamiento agendado correctamente"); }} />}
    {modal === "feedback" && <FeedbackModal notes={notes} close={() => setModal(null)} save={() => { setModal(null); notify("Retroalimentación enviada a Jefatura UTP"); }} />}
    {toast && <div className="toast"><span><Icon name="check"/></span>{toast}</div>}
  </div>;
}

function Nav({ icon, label, count, active, onClick }: { icon: string; label: string; count?: string; active: boolean; onClick: () => void }) {
  return <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}><Icon name={icon}/><span>{label}</span>{count && <b>{count}</b>}</button>;
}

function Dashboard({ period, setPeriod, openSchedule, go, notify }: { period:string; setPeriod:(v:string)=>void; openSchedule:()=>void; go:(v:View)=>void; notify:(m:string)=>void }) {
  return <div className="content fade-in">
    <section className="welcome"><div><span className="eyebrow">VIERNES, 11 DE SEPTIEMBRE</span><h2>Buenos días, Carlos <span>👋</span></h2><p>Aquí tienes el pulso del acompañamiento docente de este período.</p></div><button className="primary" onClick={openSchedule}><Icon name="plus"/> Agendar acompañamiento</button></section>
    <div className="filters"><select value={period} onChange={e=>setPeriod(e.target.value)}><option>2° período</option><option>1° período</option><option>Todo el año</option></select><select><option>Todos los niveles</option><option>Educación básica</option><option>Educación media</option></select><select><option>Todas las asignaturas</option><option>Lenguaje</option><option>Matemática</option><option>Ciencias</option></select><button onClick={()=>notify("Filtros restablecidos")}>Limpiar filtros</button></div>
    <section className="metrics">
      <Metric color="coral" icon="users" value="79%" label="Docentes acompañados" detail="34 de 43 docentes" progress={79}/>
      <Metric color="mint" icon="chat" value="68%" label="Retroalimentados" detail="23 de 34 acompañados" progress={68}/>
      <Metric color="gold" icon="clipboard" value="87%" label="Claramente observado" detail="+8% respecto al período 1" progress={87}/>
      <Metric color="blue" icon="calendar" value="3" label="Próximos acompañamientos" detail="En los próximos 7 días" progress={42}/>
    </section>
    <section className="grid-main">
      <article className="card process"><CardHead title="Estado del proceso" subtitle="Distribución de 43 docentes"/><div className="process-body"><Donut/><div className="legend"><Legend color="#ee745f" label="Cerrado" value="18"/><Legend color="#59aa93" label="Retroalimentado" value="5"/><Legend color="#efb751" label="Pendiente retro." value="7"/><Legend color="#6e8fc1" label="Realizado" value="4"/><Legend color="#d8dce3" label="Agendado" value="9"/></div></div><button className="card-link" onClick={()=>go("agenda")}>Ver detalle del proceso <Icon name="arrow"/></button></article>
      <article className="card upcoming"><CardHead title="Próximos acompañamientos" subtitle="Tu agenda de los próximos días" action="Ver agenda" onAction={()=>go("agenda")}/>{observations.map((o,i)=><div className="event" key={o.teacher}><div className="date"><strong>{o.date.split(" ")[0]}</strong><span>SEP</span></div><span className={`avatar ${o.color}`}>{o.initials}</span><div className="event-info"><strong>{o.teacher}</strong><small>{o.subject} · {o.course}</small></div><time>{o.time}</time>{i===0 && <span className="tag">Próximo</span>}</div>)}</article>
    </section>
    <section className="grid-lower">
      <article className="card"><CardHead title="Evolución de cobertura" subtitle="Docentes acompañados durante 2026"/><LineChart/></article>
      <article className="card"><CardHead title="Nivel de logro" subtitle="Resultado general de los indicadores"/><div className="achievement"><Bar label="Claramente observado" value={87} color="#58aa92"/><Bar label="Parcialmente observado" value={10} color="#efb751"/><Bar label="Ausente" value={3} color="#ee745f"/></div></article>
    </section>
  </div>;
}

function Metric({color,icon,value,label,detail,progress}:{color:string;icon:string;value:string;label:string;detail:string;progress:number}) { return <article className="metric card"><div className={`metric-icon ${color}`}><Icon name={icon}/></div><div><strong className="metric-value">{value}</strong><h3>{label}</h3><p>{detail}</p><div className="mini-progress"><i className={color} style={{width:`${progress}%`}}/></div></div></article> }
function CardHead({title,subtitle,action,onAction}:{title:string;subtitle:string;action?:string;onAction?:()=>void}) { return <div className="card-head"><div><h3>{title}</h3><p>{subtitle}</p></div>{action&&<button onClick={onAction}>{action} <Icon name="arrow"/></button>}</div> }
function Legend({color,label,value}:{color:string;label:string;value:string}) { return <div className="legend-row"><i style={{background:color}}/><span>{label}</span><strong>{value}</strong></div> }
function Donut(){return <div className="donut" aria-label="79 por ciento completado"><div><strong>79%</strong><span>cobertura</span></div></div>}
function Bar({label,value,color}:{label:string;value:number;color:string}){return <div className="bar-row"><div><span>{label}</span><strong>{value}%</strong></div><div className="bar"><i style={{width:`${value}%`,background:color}}/></div></div>}
function LineChart(){return <div className="chart"><div className="y-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><svg viewBox="0 0 600 190" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ee745f" stopOpacity=".23"/><stop offset="1" stopColor="#ee745f" stopOpacity="0"/></linearGradient></defs><g className="gridlines"><path d="M0 10H600M0 52H600M0 94H600M0 136H600M0 178H600"/></g><path className="area" d="M20 145 C80 132,90 115,145 113 S220 91,270 88 S360 58,395 55 S485 35,580 25 L580 178 L20 178Z"/><path className="line" d="M20 145 C80 132,90 115,145 113 S220 91,270 88 S360 58,395 55 S485 35,580 25"/><g className="points"><circle cx="20" cy="145" r="5"/><circle cx="145" cy="113" r="5"/><circle cx="270" cy="88" r="5"/><circle cx="395" cy="55" r="5"/><circle cx="580" cy="25" r="5"/></g></svg><div className="x-labels"><span>Mar</span><span>May</span><span>Jul</span><span>Ago</span><span>Sep</span></div></div>}

function Agenda({openSchedule}:{openSchedule:()=>void}) { return <div className="content fade-in"><section className="page-intro"><div><h2>Agenda del período</h2><p>Organiza y revisa cada acompañamiento programado.</p></div><button className="primary" onClick={openSchedule}><Icon name="plus"/> Nuevo acompañamiento</button></section><article className="card table-card"><div className="table-tools"><strong>Septiembre 2026</strong><div><button>‹</button><button>Hoy</button><button>›</button></div></div><div className="data-table"><div className="table-row header"><span>DOCENTE</span><span>CLASE</span><span>FECHA Y HORA</span><span>ESTADO</span><span></span></div>{observations.concat([{teacher:"Carolina Silva",initials:"CS",subject:"Historia",course:"3° Medio B",date:"21 sep",time:"08:30",status:"Agendado",color:"mint"}]).map(o=><div className="table-row" key={o.teacher}><span className="person"><i className={`avatar ${o.color}`}>{o.initials}</i><b>{o.teacher}</b></span><span>{o.subject}<small>{o.course}</small></span><span>{o.date} · {o.time}</span><span><em className="status">{o.status}</em></span><button className="more">•••</button></div>)}</div></article></div> }

function Observation({notes,setNotes,notify}:{notes:string;setNotes:(s:string)=>void;notify:(s:string)=>void}) { const [levels,setLevels]=useState(["Claro","Parcial","Claro","Claro","Ausente"]); const criteria=["Comunica objetivos de aprendizaje comprensibles.","Activa y conecta conocimientos previos.","Formula preguntas que promueven reflexión.","Genera un ambiente de respeto y participación.","Ofrece retroalimentación oportuna durante la clase."]; return <div className="content fade-in"><section className="page-intro"><div><span className="eyebrow">OBSERVACIÓN EN CURSO</span><h2>Registro de aula</h2><p>María José Herrera · Lenguaje · 5° Básico A</p></div><button className="primary" onClick={()=>notify("Observación guardada y enviada a retroalimentación")}><Icon name="check"/> Finalizar observación</button></section><div className="observation-layout"><article className="card rubric"><CardHead title="Indicadores seleccionados" subtitle="Dimensión cognitiva · 5 indicadores"/>{criteria.map((c,i)=><div className="criterion" key={c}><span>{i+1}</span><p>{c}</p><div className="segmented">{["Claro","Parcial","Ausente"].map(v=><button key={v} className={levels[i]===v?v.toLowerCase():""} onClick={()=>setLevels(x=>x.map((a,j)=>j===i?v:a))}>{v}</button>)}</div></div>)}</article><aside className="card notes"><div className="ai-label"><Icon name="spark"/> Notas para asistencia IA</div><h3>Evidencias observadas</h3><p>Registra hechos concretos; la IA los usará para preparar la etapa de retroalimentación.</p><textarea value={notes} onChange={e=>setNotes(e.target.value)}/><div className="tip"><strong>Sugerencia</strong><p>Incluye acciones del docente y respuestas observables de los estudiantes.</p></div></aside></div></div> }

function Feedback({open}:{open:()=>void}) { return <div className="content fade-in"><section className="page-intro"><div><h2>Etapa 2 · Retroalimentación</h2><p>Revisa propuestas generadas desde las evidencias y acuerda acciones de mejora.</p></div></section><section className="feedback-list">{observations.slice(0,2).map((o,i)=><article className="card feedback-card" key={o.teacher}><span className={`avatar ${o.color}`}>{o.initials}</span><div><strong>{o.teacher}</strong><p>{o.subject} · {o.course} · Observado el {o.date}</p></div><span className={i===0?"pill pending":"pill draft"}>{i===0?"Pendiente":"Borrador IA listo"}</span><button onClick={open}>{i===0?"Iniciar retroalimentación":"Revisar borrador"}<Icon name="arrow"/></button></article>)}</section></div> }

function Teachers(){return <div className="content fade-in"><section className="page-intro"><div><h2>Equipo docente</h2><p>43 docentes activos · 34 acompañados en el período</p></div><button className="primary"><Icon name="plus"/> Agregar docente</button></section><section className="teacher-grid">{teachers.map((t,i)=><article className="card teacher" key={t}><span className={`avatar ${["peach","blue","lilac","mint"][i%4]}`}>{t.split(" ").map(x=>x[0]).slice(0,2).join("")}</span><div><strong>{t}</strong><p>{["Lenguaje","Matemática","Ciencias","Historia"][i%4]}</p></div><div className="coverage"><span>{i<4?"Acompañado":"Pendiente"}</span><i className={i<4?"done":""}/></div></article>)}</section></div>}

function ScheduleModal({close,save}:{close:()=>void;save:()=>void}){return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><button className="modal-close" onClick={close}>×</button><span className="eyebrow">NUEVO REGISTRO</span><h2>Agendar acompañamiento</h2><p>Completa los datos de la clase que será observada.</p><div className="form-grid"><label>Docente<select><option>Seleccionar docente</option>{teachers.map(t=><option key={t}>{t}</option>)}</select></label><label>Docente acompañante<select><option>Carlos Cisterna</option><option>Fabiola Rodríguez</option><option>Alejandro Escobar</option></select></label><label>Curso<select><option>5° Básico A</option><option>8° Básico B</option><option>2° Medio A</option></select></label><label>Asignatura<select><option>Lenguaje</option><option>Matemática</option><option>Ciencias</option></select></label><label>Fecha<input type="date" defaultValue="2026-09-23"/></label><label>Hora<input type="time" defaultValue="09:30"/></label></div><div className="modal-actions"><button onClick={close}>Cancelar</button><button className="primary" onClick={save}>Confirmar agenda</button></div></div></div>}

function FeedbackModal({notes,close,save}:{notes:string;close:()=>void;save:()=>void}){return <div className="overlay"><div className="modal wide"><button className="modal-close" onClick={close}>×</button><span className="ai-label"><Icon name="spark"/> Propuesta generada con IA</span><h2>Registro de retroalimentación</h2><p>María José Herrera · La propuesta es editable antes de enviarla.</p><label>¿Qué fortalezas se evidenciaron?<textarea defaultValue="Se evidenció una comunicación clara del propósito de aprendizaje y una activación efectiva de conocimientos previos. Las preguntas abiertas favorecieron la participación y permitieron recoger distintas perspectivas del curso."/></label><label>¿Qué aspectos se pueden fortalecer?<textarea defaultValue="Se sugiere diversificar las estrategias de comprobación de comprensión durante el desarrollo, incorporando pausas breves que permitan ajustar la enseñanza según las respuestas de todo el grupo."/></label><label>Acuerdo y próximo paso<input defaultValue="Incorporar una estrategia de ticket de salida en las próximas dos clases."/></label><details><summary>Ver evidencias originales</summary><p>{notes}</p></details><div className="modal-actions"><button onClick={close}>Guardar borrador</button><button className="primary" onClick={save}>Enviar a Jefatura UTP</button></div></div></div>}
