'use client';
import { iconNames } from '@/lib/icons';

// Field types: text | area | lines (one item per line) | paras (blank line between items) | icon
function Field({ field, value, onChange }) {
  const label = <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">{field.label}</label>;

  if (field.type === 'area') {
    return <div>{label}<textarea rows={3} className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></div>;
  }
  if (field.type === 'lines' || field.type === 'paras') {
    const sep = field.type === 'paras' ? '\n\n' : '\n';
    return (
      <div>
        {label}
        <textarea
          rows={field.type === 'paras' ? 8 : 4}
          className="input"
          value={(value || []).join(sep)}
          onChange={(e) => onChange(e.target.value.split(sep))}
          onBlur={(e) => onChange(e.target.value.split(sep).map((s) => s.trim()).filter(Boolean))}
        />
      </div>
    );
  }
  if (field.type === 'icon') {
    return (
      <div>
        {label}
        <select className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    );
  }
  return <div>{label}<input className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></div>;
}

// Edits one object
export function ObjectEditor({ fields, value, onChange }) {
  return (
    <div className="card space-y-4">
      {fields.map((f) => (
        <Field key={f.key} field={f} value={value[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
      ))}
    </div>
  );
}

// Edits a list of objects (add / remove / reorder)
export function ListEditor({ fields, items, onChange, newItem, titleKey }) {
  const update = (i, v) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{item[titleKey] || `Item ${i + 1}`}</span>
            <div className="flex gap-2 text-xs">
              <button onClick={() => move(i, -1)} className="btn-outline px-2 py-1">Up</button>
              <button onClick={() => move(i, 1)} className="btn-outline px-2 py-1">Down</button>
              <button onClick={() => confirm('Delete this item?') && remove(i)} className="btn-outline px-2 py-1 text-red-600">Delete</button>
            </div>
          </div>
          {fields.map((f) => (
            <Field key={f.key} field={f} value={item[f.key]} onChange={(v) => update(i, { ...item, [f.key]: v })} />
          ))}
        </div>
      ))}
      <button onClick={() => onChange([...items, newItem()])} className="btn-primary">Add new</button>
    </div>
  );
}
