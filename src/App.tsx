import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Cable,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Command,
  FileText,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  LogOut,
  Mail,
  Moon,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import tecveqLightMark from '@assets/image_1788600937085.png';
import tecveqDarkMark from '@assets/image_1788600949851.png';
import './index.css';

type Icon = typeof Activity;
type Theme = 'light' | 'dark';
type RouteName = 'overview' | 'workspace' | 'workflows' | 'connections' | 'analytics' | 'knowledge' | 'team' | 'settings';

const navItems: Array<{ label: string; path: string; icon: Icon }> = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'AI employees', path: '/workspace', icon: WandSparkles },
  { label: 'Workflowing', path: '/workflows', icon: Workflow },
  { label: 'Connections', path: '/connections', icon: Cable },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Knowledge base', path: '/knowledge', icon: BookOpen },
  { label: 'Team members', path: '/team', icon: Users },
];

const workspaces = [
  { name: 'Orchard Labs', detail: 'Personal workspace', initials: 'O', color: '#6535b1' },
  { name: 'Northstar Ops', detail: 'Team workspace', initials: 'N', color: '#287f83' },
];

const initialEmployees = [
  { name: 'Inbox Triage', role: 'Sorts incoming requests and routes the work that matters.', icon: Mail, color: '#6b41bd', runs: '1,284 runs', time: '42.8 hrs saved' },
  { name: 'Brief Builder', role: 'Turns scattered notes into decision-ready daily briefs.', icon: FileText, color: '#b05b89', runs: '356 runs', time: '18.4 hrs saved' },
  { name: 'Signal Scout', role: 'Monitors customer signals and calls out meaningful changes.', icon: Target, color: '#347f86', runs: '89 runs', time: '11.6 hrs saved' },
];

const knowledgeItems = [
  { title: 'Q3 customer research synthesis', type: 'Brief', updated: 'Updated 2h ago', tone: 'lilac' },
  { title: 'Support escalation playbook', type: 'Playbook', updated: 'Updated yesterday', tone: 'mint' },
  { title: 'Product voice and writing guide', type: 'Guide', updated: 'Updated 4 days ago', tone: 'amber' },
  { title: 'Launch readiness checklist', type: 'Checklist', updated: 'Updated 6 days ago', tone: 'rose' },
];

const initialWorkflows = [
  { name: 'Customer signal → team brief', trigger: 'When a new customer signal is found', lastRun: '2 minutes ago', steps: '4 steps', status: 'Running' },
  { name: 'Inbox triage → assigned owner', trigger: 'When a support request arrives', lastRun: '18 minutes ago', steps: '3 steps', status: 'Running' },
  { name: 'Weekly operations pulse', trigger: 'Every Monday at 9:00 AM', lastRun: 'Yesterday', steps: '6 steps', status: 'Paused' },
];

function TecveqMark({ theme = 'light' }: { theme?: Theme }) {
  return (
    <div className="brand-mark" aria-hidden="true">
      <img src={theme === 'dark' ? tecveqDarkMark : tecveqLightMark} alt="" />
    </div>
  );
}

function Logo({ theme }: { theme: Theme }) {
  return <div className="brand" data-testid="brand-logo"><TecveqMark theme={theme} /><span className="brand-name">Tecveq</span></div>;
}

function ThemeToggle({ theme, onToggle, className = '' }: { theme: Theme; onToggle: () => void; className?: string }) {
  return (
    <button className={`icon-btn ${className}`} onClick={onToggle} aria-label="Toggle appearance" data-testid="button-theme-toggle">
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

function AuthScreen({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<'sign-in' | 'create'>('sign-in');
  const [submitted, setSubmitted] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [authError, setAuthError] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === 'create' && form.password !== form.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    setAuthError('');
    setSubmitted(true);
    window.setTimeout(() => setLocation('/'), 450);
  };
  return (
    <main className="auth-wrap">
      <ThemeToggle theme={theme} onToggle={onToggle} className="auth-theme" />
      <section className="auth-card" data-testid="auth-card">
        <div className="auth-brand"><TecveqMark theme={theme} /><span className="brand-name">Tecveq</span></div>
        <h1>Make room for<br /><em>meaningful work.</em></h1>
        <p>A calm command center for the repetitive work your team should not have to carry alone.</p>
        <div className="auth-tabs" role="tablist">
          <button className={`auth-tab ${mode === 'sign-in' ? 'active' : ''}`} onClick={() => { setMode('sign-in'); setAuthError(''); setForgotSent(false); }} data-testid="tab-sign-in">Sign in</button>
          <button className={`auth-tab ${mode === 'create' ? 'active' : ''}`} onClick={() => { setMode('create'); setAuthError(''); setForgotSent(false); }} data-testid="tab-create-account">Create account</button>
        </div>
        <form onSubmit={submit}>
          {mode === 'create' && <div className="form-field"><label htmlFor="auth-username">Username</label><input id="auth-username" autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="maya.chen" data-testid="input-username" required /></div>}
          <div className="form-field"><label htmlFor="auth-email">Work email</label><input id="auth-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" data-testid="input-email" required /></div>
          <div className="form-field"><label htmlFor="auth-password">{mode === 'sign-in' ? 'Passcode' : 'Create a passcode'}</label><input id="auth-password" type="password" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="6+ characters" minLength={6} data-testid="input-password" required /></div>
          {mode === 'create' && <div className="form-field"><label htmlFor="auth-confirm-password">Confirm password</label><input id="auth-confirm-password" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Repeat your passcode" minLength={6} data-testid="input-confirm-password" required /></div>}
          {mode === 'sign-in' && <div className="auth-support-row"><button type="button" className="forgot-link" onClick={() => setForgotSent(true)} data-testid="button-forgot-password">{forgotSent ? 'Reset link sent' : 'Forgot password?'}</button></div>}
          {authError && <p className="auth-error" role="alert">{authError}</p>}
          <button className="btn btn-primary auth-submit" type="submit" data-testid="button-auth-submit">{submitted ? <Check size={14} /> : mode === 'sign-in' ? <><LogIn size={14} /> Enter workspace <ArrowUpRight size={13} /></> : <><Sparkles size={14} /> Create my workspace</>}</button>
        </form>
        <p className="auth-note"><ShieldCheck size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Your workspace is private by default.</p>
      </section>
    </main>
  );
}

function Sidebar({ route, theme, onToggle, onAddWorkspace, onSignOut, workspaceName, workspaceCount }: { route: RouteName; theme: Theme; onToggle: () => void; onAddWorkspace: () => void; onSignOut: () => void; workspaceName: string; workspaceCount: number }) {
  const [, setLocation] = useLocation();
  return (
    <aside className="app-sidebar">
      <Logo theme={theme} />
      <button className="workspace-switcher" onClick={onAddWorkspace} data-testid="button-workspace-switcher"><span className="workspace-orb">{workspaceName.slice(0, 1).toUpperCase()}</span><span style={{ minWidth: 0, flex: 1 }}><small>{workspaceCount} active workspace{workspaceCount === 1 ? '' : 's'}</small><strong>{workspaceName}</strong></span><ChevronDown size={14} color="var(--muted)" /></button>
      <div className="sidebar-label">Command center</div>
      <nav className="nav-list">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = route === pathToRoute(item.path);
          return <button key={item.path} className={`nav-item ${active ? 'active' : ''}`} onClick={() => setLocation(item.path)} data-testid={`link-${item.label.toLowerCase().replaceAll(' ', '-')}`}><IconComponent size={15} /><span>{item.label}</span>{item.path === '/workspace' && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: 5, background: 'var(--lilac)' }} />}</button>;
        })}
      </nav>
      <div className="nav-spacer" />
      <button className="sidebar-add" onClick={onAddWorkspace} data-testid="button-add-workspace"><Plus size={14} /> Add new workspace</button>
      <div className="sidebar-label">Manage</div>
      <button className={`nav-item ${route === 'settings' ? 'active' : ''}`} onClick={() => setLocation('/settings')} data-testid="link-settings"><Settings2 size={15} /><span>Settings</span></button>
      <div className="profile"><span className="avatar">MC</span><span style={{ minWidth: 0 }}><strong style={{ display: 'block', fontSize: 10 }}>Maya Chen</strong><small>Admin account</small></span><ThemeToggle theme={theme} onToggle={onToggle} /><button onClick={onSignOut} aria-label="Sign out" data-testid="button-sign-out"><LogOut size={13} /></button></div>
    </aside>
  );
}

function Topbar({ route, theme, onToggle }: { route: RouteName; theme: Theme; onToggle: () => void }) {
  const [, setLocation] = useLocation();
  const names: Record<RouteName, string> = { overview: 'Overview', workspace: 'AI employees', workflows: 'Workflowing', connections: 'Connections', analytics: 'Analytics', knowledge: 'Knowledge base', team: 'Team members', settings: 'Settings' };
  return <header className="topbar"><button className="icon-btn" onClick={() => setLocation('/')} aria-label="Go to overview" data-testid="button-home"><PanelLeft size={14} /></button><div className="crumb"><span>Orchard Labs</span><ChevronRight size={12} /><strong>{names[route]}</strong></div><div className="topbar-actions"><label className="search"><Search size={13} /><input placeholder="Search workspace" aria-label="Search workspace" data-testid="input-search-workspace" /><span style={{ font: '9px var(--font-mono)' }}>⌘K</span></label><ThemeToggle theme={theme} onToggle={onToggle} /><button className="icon-btn" aria-label="Notifications" data-testid="button-notifications"><Bell size={14} /></button><span className="avatar">MC</span></div></header>;
}

function Metric({ icon: IconComponent, label, value, suffix, delta }: { icon: Icon; label: string; value: string; suffix?: string; delta: string }) {
  return <article className="panel metric" data-testid={`metric-${label.toLowerCase().replaceAll(' ', '-')}`}><div className="metric-top"><span>{label}</span><span className="metric-icon"><IconComponent size={13} /></span></div><div className="metric-value">{value}{suffix && <span>{suffix}</span>}</div><div className="delta"><TrendingUp size={11} />{delta}<span>vs last month</span></div></article>;
}

function Overview({ onAddWorkspace }: { onAddWorkspace: () => void }) {
  return <div>
    <div className="page-heading"><div><div className="eyebrow">Wednesday, May 22, 2024</div><h1>Good morning, <span style={{ color: 'var(--purple)' }}>Maya.</span></h1><p>Here is what is moving across Orchard Labs today.</p></div><div className="heading-actions"><button className="btn btn-primary" onClick={onAddWorkspace} data-testid="button-ask-ai"><Sparkles size={13} /> Ask the operator <ArrowUpRight size={13} /></button></div></div>
    <section className="metrics-grid"><Metric icon={Gauge} label="Operational score" value="84.6" suffix="/ 100" delta="12.4%" /><Metric icon={BrainCircuit} label="AI interactions" value="2,846" delta="24.8%" /><Metric icon={CheckCircle2} label="Tasks completed" value="1,209" delta="On track" /><Metric icon={Clock3} label="Time returned" value="184" suffix="hrs" delta="18.2%" /></section>
    <section className="dashboard-grid">
      <article className="panel chart-panel"><div className="panel-head"><div><div className="eyebrow">Workspace pulse</div><h2 className="panel-title">Operational momentum</h2></div><button className="select-like" data-testid="button-chart-range">Last 30 days <ChevronDown size={11} style={{ verticalAlign: 'middle' }} /></button></div><div className="chart-value">84.6 <small>↗ +24.8%</small></div><div className="bar-chart">{Array.from({ length: 10 }, (_, index) => <span className="bar" key={index} />)}</div><div className="chart-labels"><span>May 01</span><span>May 11</span><span>May 22</span></div></article>
      <article className="panel feed-panel"><div className="panel-head"><div><div className="eyebrow">Live feed</div><h2 className="panel-title">Recent activity</h2></div><Bell size={15} color="var(--muted)" /></div><div className="feed-list"><Feed icon={FileText} title="Q3 strategy brief" detail="Updated by Brief Builder" time="2m" /><Feed icon={BrainCircuit} title="Customer signal found" detail="Signal Scout marked 4 mentions" time="18m" /><Feed icon={Users} title="New team member joined" detail="Alex Morgan joined Product" time="1h" /></div><button className="btn btn-quiet" style={{ paddingLeft: 0, marginTop: 2 }} data-testid="button-view-activity">View all activity <ArrowUpRight size={12} /></button></article>
    </section>
    <section style={{ marginTop: 28 }}><div className="panel-head" style={{ marginBottom: 11 }}><div><div className="eyebrow">At a glance</div><h2 className="panel-title">A little more room to think.</h2></div><button className="btn btn-quiet" data-testid="button-open-workspace">Open AI employees <ArrowUpRight size={12} /></button></div><div className="triptych"><InfoCard icon={WandSparkles} title="Work, on autopilot" text="Three digital teammates are running quietly in the background." /><InfoCard icon={Lightbulb} title="Signals, not noise" text="Your team sees what needs a decision, not another inbox." /><InfoCard icon={Zap} title="184 hours returned" text="Time saved this month, ready to be spent on the work that compounds." /></div></section>
  </div>;
}

function Feed({ icon: IconComponent, title, detail, time }: { icon: Icon; title: string; detail: string; time: string }) {
  return <div className="feed-item"><span className="feed-dot"><IconComponent size={13} /></span><div className="feed-copy"><strong>{title}</strong><br />{detail}</div><span className="feed-time">{time}</span></div>;
}

function InfoCard({ icon: IconComponent, title, text }: { icon: Icon; title: string; text: string }) {
  return <article className="panel info-card"><span className="small-icon"><IconComponent size={13} /></span><h3>{title}</h3><p>{text}</p></article>;
}

function WorkspacePage({ employees, onAddEmployee, onAddWorkspace }: { employees: typeof initialEmployees; onAddEmployee: () => void; onAddWorkspace: () => void }) {
  return <div><div className="page-heading"><div><div className="eyebrow">AI command center</div><h1>Your team’s thinking partner.</h1><p>Delegate repetitive work to digital teammates that keep context and show their receipts.</p></div><div className="heading-actions"><button className="btn btn-primary" onClick={onAddEmployee} data-testid="button-add-employee"><Plus size={13} /> Add AI employee</button><button className="btn btn-quiet" onClick={onAddWorkspace} data-testid="button-workspace-from-page"><BriefcaseBusiness size={13} /> New workspace</button></div></div><section className="panel hero-panel"><div className="hero-icon"><WandSparkles size={19} /></div><div className="eyebrow" style={{ marginTop: 20 }}>Working quietly, every day</div><h2>Repetitive work out.<br />Better decisions in.</h2><p>Meet the operators keeping Orchard Labs moving while your team stays in the work only humans can do.</p></section><div className="employee-grid">{employees.map((employee) => <article className="panel employee-card" key={employee.name} data-testid={`card-employee-${employee.name.toLowerCase().replaceAll(' ', '-')}`}><div className="employee-head"><span className="employee-avatar" style={{ background: employee.color }}><employee.icon size={18} /></span><span className="status">Running</span></div><h3>{employee.name}</h3><p>{employee.role}</p><div className="employee-meta"><span>{employee.runs}</span><span>{employee.time}</span><MoreHorizontal size={13} /></div></article>)}</div><section className="section-grid" style={{ marginTop: 12 }}><article className="panel wide-panel"><div className="eyebrow">Today’s queue</div><h2 className="panel-title" style={{ marginTop: 10 }}>Nothing waiting on you.</h2><p className="panel-subtitle" style={{ maxWidth: 330, lineHeight: 1.6, marginTop: 8 }}>Your operators have cleared the routine work. Two decisions are ready whenever you are.</p><button className="btn" style={{ marginTop: 22 }} data-testid="button-review-decisions">Review decisions <ArrowUpRight size={12} /></button></article><article className="panel wide-panel"><div className="eyebrow">Coverage</div><h2 className="panel-title" style={{ marginTop: 10 }}>Operator health</h2><div style={{ display: 'grid', gap: 15, marginTop: 23 }}><div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 7 }}><span>Context coverage</span><strong>92%</strong></div><div className="progress-line"><i style={{ width: '92%' }} /></div></div><div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 7 }}><span>Automation confidence</span><strong>87%</strong></div><div className="progress-line"><i style={{ width: '87%' }} /></div></div></div></article></section></div>;
}

function WorkflowsPage({ workflows, onCreate, onRun }: { workflows: typeof initialWorkflows; onCreate: () => void; onRun: (name: string) => void }) {
  return <div><div className="page-heading"><div><div className="eyebrow">Workflowing</div><h1>Work that moves itself.</h1><p>Connect triggers, context, and actions into dependable operating loops.</p></div><button className="btn btn-primary" onClick={onCreate} data-testid="button-create-workflow"><Plus size={13} /> Create workflow</button></div><section className="workflow-hero panel"><div><div className="hero-icon"><Workflow size={18} /></div><div className="eyebrow" style={{ marginTop: 17 }}>The operating layer</div><h2>From signal to done.</h2><p>Give every recurring process a clear beginning, a useful middle, and an accountable next step.</p></div><div className="workflow-path"><span>Trigger</span><i /><span>Context</span><i /><span>Action</span></div></section><section className="workflow-list">{workflows.map((item) => <article className="panel workflow-card" key={item.name} data-testid={`card-workflow-${item.name.toLowerCase().replaceAll(' ', '-')}`}><div className="workflow-card-head"><div><span className={`status ${item.status === 'Paused' ? 'status-paused' : ''}`}>{item.status}</span><h2>{item.name}</h2><p>{item.trigger}</p></div><button className="icon-btn" aria-label={`More options for ${item.name}`} data-testid="button-workflow-options"><MoreHorizontal size={15} /></button></div><div className="workflow-meta"><span>{item.steps}</span><span>Last run {item.lastRun}</span><button className="btn btn-quiet" onClick={() => onRun(item.name)} data-testid="button-run-workflow">{item.status === 'Paused' ? 'Resume' : 'Run now'} <ArrowUpRight size={12} /></button></div></article>)}</section></div>;
}

function ConnectionsPage() {
  const [connections, setConnections] = useState([
    { name: 'Slack', detail: 'Messages, channels, and team signals', icon: Cable, color: '#6d4bd7', connected: true },
    { name: 'Gmail', detail: 'Inbox triage and email context', icon: Mail, color: '#b55c79', connected: true },
    { name: 'Notion', detail: 'Knowledge, briefs, and decisions', icon: BookOpen, color: '#48556f', connected: false },
    { name: 'CRM workspace', detail: 'Customer records and account activity', icon: BriefcaseBusiness, color: '#317f80', connected: false },
  ]);
  const toggleConnection = (name: string) => setConnections((current) => current.map((connection) => connection.name === name ? { ...connection, connected: !connection.connected } : connection));
  return <div><div className="page-heading"><div><div className="eyebrow">Connections</div><h1>Bring the work together.</h1><p>Give your AI employees the trusted sources they need to operate with context.</p></div><button className="btn btn-primary" data-testid="button-add-connection"><Plus size={13} /> Add connection</button></div><section className="connection-grid">{connections.map((connection) => { const IconComponent = connection.icon; return <article className="panel connection-card" key={connection.name} data-testid={`card-connection-${connection.name.toLowerCase().replaceAll(' ', '-')}`}><div className="connection-card-top"><span className="connection-icon" style={{ background: connection.color }}><IconComponent size={17} /></span><span className={`connection-state ${connection.connected ? 'is-connected' : ''}`}>{connection.connected ? 'Connected' : 'Available'}</span></div><h2>{connection.name}</h2><p>{connection.detail}</p><button className={`btn ${connection.connected ? 'btn-quiet' : 'btn-primary'}`} onClick={() => toggleConnection(connection.name)} data-testid={`button-connect-${connection.name.toLowerCase().replaceAll(' ', '-')}`}>{connection.connected ? 'Manage connection' : 'Connect source'} <ArrowUpRight size={12} /></button></article>; })}</section><section className="panel connection-note"><div className="hero-icon"><ShieldCheck size={18} /></div><div><div className="eyebrow">Permissioned by design</div><h2 className="panel-title">Your sources stay yours.</h2><p className="panel-subtitle">Connections are scoped to Orchard Labs and can be paused any time. Operators only see the context you choose to share.</p></div></section></div>;
}

function AnalyticsPage() {
  return <div><div className="page-heading"><div><div className="eyebrow">Workspace pulse</div><h1>Analytics that make sense.</h1><p>See where your operators are giving time back, and where to tune the system next.</p></div><div className="heading-actions"><button className="btn" data-testid="button-export-report"><FileText size={13} /> Export report</button><button className="btn btn-primary" data-testid="button-analytics-range">This month <ChevronDown size={12} /></button></div></div><section className="metrics-grid"><Metric icon={Clock3} label="Hours returned" value="184.2" suffix="hrs" delta="18.2%" /><Metric icon={Target} label="Work coverage" value="67.8" suffix="%" delta="9.4%" /><Metric icon={Activity} label="Operator confidence" value="91.6" suffix="%" delta="6.8%" /><Metric icon={TrendingUp} label="Decisions accelerated" value="428" delta="31.2%" /></section><section className="section-grid"><article className="panel wide-panel"><div className="panel-head"><div><div className="eyebrow">Time returned</div><h2 className="panel-title">The compounding effect</h2></div><span className="pill">+42.8 hrs this week</span></div><div className="bar-chart" style={{ height: 190, marginTop: 24 }}>{[40,52,48,66,59,76,71,88,84,95,89,100].map((height, index) => <span className="bar" style={{ height: `${height}%` }} key={index} />)}</div><div className="chart-labels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></article><article className="panel wide-panel"><div className="eyebrow">Work mix</div><h2 className="panel-title" style={{ marginTop: 5 }}>Where your operators spend their attention</h2><div style={{ display: 'grid', gap: 17, marginTop: 26 }}><Mix label="Inbox triage" value="38%" width="78%" color="var(--purple)" /><Mix label="Briefing & research" value="27%" width="56%" color="var(--lilac)" /><Mix label="Customer signals" value="21%" width="43%" color="var(--mint)" /><Mix label="Team operations" value="14%" width="30%" color="var(--amber)" /></div></article></section><section className="panel table-panel" style={{ marginTop: 12 }}><table className="table"><thead><tr><th>Operator</th><th>Runs</th><th>Hours returned</th><th>Confidence</th><th>Status</th></tr></thead><tbody>{initialEmployees.map((employee, index) => <tr key={employee.name}><td><strong>{employee.name}</strong></td><td>{[1284, 356, 89][index]}</td><td>{['42.8 hrs', '18.4 hrs', '11.6 hrs'][index]}</td><td>{['94%', '88%', '91%'][index]}</td><td><span className="pill">Healthy</span></td></tr>)}</tbody></table></section></div>;
}

function Mix({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 7 }}><span>{label}</span><strong>{value}</strong></div><div className="progress-line"><i style={{ width, background: color }} /></div></div>;
}

function KnowledgePage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => knowledgeItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div><div className="page-heading"><div><div className="eyebrow">Collective memory</div><h1>Everything your team knows.</h1><p>Keep briefs, research, and decisions close enough to make the next move obvious.</p></div><div className="heading-actions"><button className="btn btn-primary" data-testid="button-add-knowledge"><Plus size={13} /> Add knowledge</button></div></div><section className="panel" style={{ padding: 14, marginBottom: 12 }}><label className="search" style={{ background: 'var(--surface-alt)', width: '100%', padding: '10px 12px' }}><Search size={14} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search briefs, playbooks, and decisions" aria-label="Search knowledge base" data-testid="input-search-knowledge" style={{ width: '100%', fontSize: 11 }} /></label></section>{filtered.length ? <section className="section-grid">{filtered.map((item) => <article className="panel info-card" key={item.title} data-testid={`card-knowledge-${item.title.toLowerCase().replaceAll(' ', '-')}`}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className={`small-icon ${item.tone}`}><FileText size={13} /></span><ArrowUpRight size={14} color="var(--muted)" /></div><h3>{item.title}</h3><p>{item.type} · {item.updated}</p></article>)}</section> : <div className="empty-state"><Search size={21} /><p>No knowledge matched “{query}”.</p><button className="btn" onClick={() => setQuery('')} data-testid="button-clear-knowledge">Clear search</button></div>}<section className="panel" style={{ padding: 22, marginTop: 12, background: 'linear-gradient(110deg, color-mix(in srgb, var(--purple) 17%, var(--surface)), var(--surface))' }}><div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><div className="hero-icon"><BrainCircuit size={18} /></div><div><div className="eyebrow">Suggested next</div><h2 className="panel-title">Connect your first source</h2><p className="panel-subtitle" style={{ marginTop: 5 }}>Give your operators context they can trust.</p></div><button className="btn" style={{ marginLeft: 'auto' }} data-testid="button-connect-source">Connect source <ArrowUpRight size={12} /></button></div></section></div>;
}

function TeamPage({ onInvite }: { onInvite: () => void }) {
  const members = [{ initials: 'MC', name: 'Maya Chen', role: 'Admin', activity: 'Active now', color: '#8c62d4' }, { initials: 'AM', name: 'Alex Morgan', role: 'Member', activity: 'Active 18m ago', color: '#3a8a88' }, { initials: 'JR', name: 'Jordan Rivera', role: 'Member', activity: 'Active yesterday', color: '#c47b65' }, { initials: 'SK', name: 'Samira Khan', role: 'Viewer', activity: 'Active 3d ago', color: '#9a6ba4' }];
  return <div><div className="page-heading"><div><div className="eyebrow">Your operators, together</div><h1>A team with more room.</h1><p>Give the right people visibility into the work your AI employees are moving.</p></div><button className="btn btn-primary" onClick={onInvite} data-testid="button-invite-member"><Plus size={13} /> Invite teammate</button></div><section className="panel table-panel"><table className="table"><thead><tr><th>Member</th><th>Role</th><th>Last seen</th><th>Access</th><th /></tr></thead><tbody>{members.map((member) => <tr key={member.name}><td><div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><span className="avatar" style={{ background: member.color }}>{member.initials}</span><strong>{member.name}</strong></div></td><td>{member.role}</td><td>{member.activity}</td><td><span className="pill" style={{ background: member.role === 'Viewer' ? 'var(--surface-alt)' : undefined, color: member.role === 'Viewer' ? 'var(--muted)' : undefined }}>{member.role === 'Admin' ? 'Full access' : member.role === 'Viewer' ? 'View only' : 'Can manage'}</span></td><td><button className="icon-btn" aria-label={`More options for ${member.name}`} data-testid={`button-member-options-${member.initials}`}><MoreHorizontal size={15} /></button></td></tr>)}</tbody></table></section><section className="triptych" style={{ marginTop: 12 }}><InfoCard icon={Users} title="4 teammates" text="Your workspace is small, focused, and ready to scale." /><InfoCard icon={ShieldCheck} title="Private by default" text="Only invited members can see workspace activity." /><InfoCard icon={Command} title="One shared context" text="Operators learn once and keep the whole team aligned." /></section></div>;
}

function SettingsPage({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const [toggles, setToggles] = useState({ digest: true, alerts: true, learning: false });
  const flip = (key: keyof typeof toggles) => setToggles((current) => ({ ...current, [key]: !current[key] }));
  return <div><div className="page-heading"><div><div className="eyebrow">Workspace controls</div><h1>Settings that stay out of the way.</h1><p>Shape how Orchard Labs works without losing the calm.</p></div><button className="btn btn-primary" data-testid="button-save-settings"><Check size={13} /> Changes saved</button></div><section className="section-grid"><article className="panel wide-panel"><div className="eyebrow">Preferences</div><div className="settings-list" style={{ marginTop: 5 }}><Setting icon={theme === 'dark' ? Moon : Sun} title="Appearance" description={`Currently using ${theme} mode`} control={<button className="switch on" onClick={onToggle} aria-label="Toggle appearance setting" data-testid="switch-appearance"><i /></button>} /><Setting icon={Bell} title="Daily operator digest" description="A short pulse, delivered at 9:00 AM" control={<button className={`switch ${toggles.digest ? 'on' : ''}`} onClick={() => flip('digest')} aria-label="Toggle daily digest" data-testid="switch-digest"><i /></button>} /><Setting icon={Zap} title="Decision alerts" description="Only notify me when human input is needed" control={<button className={`switch ${toggles.alerts ? 'on' : ''}`} onClick={() => flip('alerts')} aria-label="Toggle decision alerts" data-testid="switch-alerts"><i /></button>} /><Setting icon={BrainCircuit} title="Learning suggestions" description="Let operators suggest new automations" control={<button className={`switch ${toggles.learning ? 'on' : ''}`} onClick={() => flip('learning')} aria-label="Toggle learning suggestions" data-testid="switch-learning"><i /></button>} /></div></article><article className="panel wide-panel"><div className="eyebrow">Workspace details</div><div style={{ display: 'grid', gap: 17, marginTop: 20 }}><div className="form-field"><label>Workspace name</label><input value="Orchard Labs" readOnly data-testid="input-workspace-name" /></div><div className="form-field"><label>Workspace URL</label><input value="orchard-labs.operational.ai" readOnly data-testid="input-workspace-url" /></div><button className="btn" style={{ justifySelf: 'start' }} data-testid="button-manage-billing"><KeyRound size={13} /> Manage plan <ArrowUpRight size={12} /></button></div></article></section><section className="panel" style={{ marginTop: 12, padding: 22 }}><div className="eyebrow">Account safety</div><div className="setting-row"><div><h3>Export workspace data</h3><p>Download a copy of your briefs, activity, and operator history.</p></div><button className="btn" data-testid="button-export-data">Request export <ArrowUpRight size={12} /></button></div><div className="setting-row"><div><h3>Delete workspace</h3><p>This action is permanent and cannot be undone.</p></div><button className="btn" style={{ color: 'var(--rose)' }} data-testid="button-delete-workspace">Delete workspace</button></div></section></div>;
}

function Setting({ icon: IconComponent, title, description, control }: { icon: Icon; title: string; description: string; control: ReactNode }) {
  return <div className="setting-row"><div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}><span className="small-icon"><IconComponent size={13} /></span><div><h3>{title}</h3><p>{description}</p></div></div>{control}</div>;
}

function Modal({ type, onClose, onCreate }: { type: 'workspace' | 'invite' | 'employee' | 'workflow'; onClose: () => void; onCreate: (value: string) => void }) {
  const [value, setValue] = useState('');
  const copy = { workspace: { title: 'Start a new workspace', desc: 'Give a focused team, client, or initiative its own calm command center.', label: 'Workspace name', placeholder: 'e.g. Northstar Ops', action: 'Create workspace' }, invite: { title: 'Invite a teammate', desc: 'They will receive a private invitation to Orchard Labs.', label: 'Work email', placeholder: 'teammate@company.com', action: 'Send invitation' }, employee: { title: 'Add an AI employee', desc: 'Choose a name for the operator you want to put to work first.', label: 'Operator name', placeholder: 'e.g. Renewal Radar', action: 'Create operator' }, workflow: { title: 'Create a workflow', desc: 'Name the operating loop you want your AI employees to run.', label: 'Workflow name', placeholder: 'e.g. New lead follow-up', action: 'Create workflow' } }[type];
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (value.trim()) onCreate(value.trim()); };
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}><div><div className="hero-icon"><Sparkles size={17} /></div><h2>{copy.title}</h2></div><button className="icon-btn" onClick={onClose} aria-label="Close dialog" data-testid="button-close-modal"><X size={16} /></button></div><p>{copy.desc}</p><form onSubmit={submit}><div className="form-field"><label htmlFor="modal-value">{copy.label}</label><input autoFocus id="modal-value" value={value} onChange={(e) => setValue(e.target.value)} placeholder={copy.placeholder} required data-testid={`input-${type}-value`} /></div><div className="modal-actions"><button type="button" className="btn btn-quiet" onClick={onClose} data-testid="button-cancel-modal">Cancel</button><button type="submit" className="btn btn-primary" data-testid="button-submit-modal">{copy.action} <ArrowUpRight size={12} /></button></div></form></div></div>;
}

function pathToRoute(path: string): RouteName {
  if (path === '/workspace') return 'workspace';
  if (path === '/workflows') return 'workflows';
  if (path === '/connections') return 'connections';
  if (path === '/analytics') return 'analytics';
  if (path === '/knowledge') return 'knowledge';
  if (path === '/team') return 'team';
  if (path === '/settings') return 'settings';
  return 'overview';
}

function App() {
  const [location, setLocation] = useLocation();
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('operational-theme') as Theme) || 'light');
  const [modal, setModal] = useState<'workspace' | 'invite' | 'employee' | 'workflow' | null>(null);
  const [workspaceList, setWorkspaceList] = useState(workspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Orchard Labs');
  const [employees, setEmployees] = useState(initialEmployees);
  const [workflowList, setWorkflowList] = useState(initialWorkflows);
  const [toast, setToast] = useState('');
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('operational-theme', theme); }, [theme]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 2500); return () => window.clearTimeout(timer); }, [toast]);
  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');
  if (location === '/auth') return <AuthScreen theme={theme} onToggle={toggleTheme} />;
  const route = pathToRoute(location);
  const addWorkspace = (name: string) => { setWorkspaceList((current) => [...current, { name, detail: 'New workspace', initials: name.slice(0, 1).toUpperCase(), color: '#6d49b3' }]); setSelectedWorkspace(name); setModal(null); setToast(`${name} is ready to run.`); };
  const addEmployee = (name: string) => { setEmployees((current) => [...current, { name, role: 'A new operator learning your workflow.', icon: Bot, color: '#7b67af', runs: '0 runs', time: 'Ready to work' }]); setModal(null); setToast(`${name} is ready for its first task.`); };
  const addWorkflow = (name: string) => { setWorkflowList((current) => [...current, { name, trigger: 'When you choose to run it', lastRun: 'Never run', steps: '2 steps', status: 'Draft' }]); setModal(null); setToast(`${name} is ready to connect.`); };
  const runWorkflow = (name: string) => setToast(`${name} queued for its next run.`);
  const create = (value: string) => modal === 'workspace' ? addWorkspace(value) : modal === 'employee' ? addEmployee(value) : modal === 'workflow' ? addWorkflow(value) : (setModal(null), setToast(`Invitation sent to ${value}.`));
  const page = route === 'overview' ? <Overview onAddWorkspace={() => setModal('workspace')} /> : route === 'workspace' ? <WorkspacePage employees={employees} onAddEmployee={() => setModal('employee')} onAddWorkspace={() => setModal('workspace')} /> : route === 'workflows' ? <WorkflowsPage workflows={workflowList} onCreate={() => setModal('workflow')} onRun={runWorkflow} /> : route === 'connections' ? <ConnectionsPage /> : route === 'analytics' ? <AnalyticsPage /> : route === 'knowledge' ? <KnowledgePage /> : route === 'team' ? <TeamPage onInvite={() => setModal('invite')} /> : <SettingsPage theme={theme} onToggle={toggleTheme} />;
  return <div className="app-shell"><Sidebar route={route} theme={theme} onToggle={toggleTheme} onAddWorkspace={() => setModal('workspace')} onSignOut={() => setLocation('/auth')} workspaceName={selectedWorkspace} workspaceCount={workspaceList.length} /><main className="main-area"><Topbar route={route} theme={theme} onToggle={toggleTheme} /><div className="main-content">{page}</div></main>{modal && <Modal type={modal} onClose={() => setModal(null)} onCreate={create} />}{toast && <div style={{ position: 'fixed', right: 20, bottom: 22, zIndex: 30, padding: '12px 16px', borderRadius: 9, color: 'white', background: '#37205f', boxShadow: 'var(--shadow)', fontSize: 11 }} data-testid="status-toast"><CheckCircle2 size={13} style={{ verticalAlign: 'middle', marginRight: 7, color: 'var(--mint)' }} />{toast}</div>}</div>;
}

export default App;