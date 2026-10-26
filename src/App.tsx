import type { ToasterProps } from "sonner";
import { useAdhkarSettings } from "./context/useAdhkarSettings";
import type { AdhkarCategory } from "./types";
import "./App.css";

const categoryOptions: {
  value: AdhkarCategory;
  label: string;
  description: string;
}[] = [
  { value: "morning", label: "أذكار الصباح", description: "أذكار وقت الصباح" },
  { value: "evening", label: "أذكار المساء", description: "أذكار وقت المساء" },
  {
    value: "after-prayer",
    label: "بعد الصلاة",
    description: "التسبيح والاستغفار",
  },
  { value: "general", label: "أذكار عامة", description: "أذكار في كل وقت" },
];

const positions: NonNullable<ToasterProps["position"]>[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const swipeOptions: NonNullable<ToasterProps["swipeDirections"]> = [
  "top",
  "right",
  "bottom",
  "left",
];

const iconOptions = [
  "success",
  "info",
  "warning",
  "error",
  "loading",
  "close",
] as const;

function App() {
  const { settings, updateSettings, updateSonner, resetSettings } =
    useAdhkarSettings();
  const sonner = settings.sonner;

  function toggleCategory(category: AdhkarCategory) {
    const categories = settings.categories.includes(category)
      ? settings.categories.filter((item) => item !== category)
      : [...settings.categories, category];
    updateSettings({ categories });
  }

  function setSwipeDirection(
    direction: NonNullable<ToasterProps["swipeDirections"]>[number],
  ) {
    const current = sonner.swipeDirections ?? [];
    updateSonner({
      swipeDirections: current.includes(direction)
        ? current.filter((item) => item !== direction)
        : [...current, direction],
    });
  }

  return (
    <main className="app-shell" dir="rtl">
      <header className="app-header">
        <div>
          <p className="eyebrow">ذِكر يومي</p>
          <h1>إعدادات الأذكار</h1>
          <p className="header-copy">رتّب تذكيرك بما يناسب يومك.</p>
        </div>
        <label className={`switch-control ${settings.enabled ? "is-on" : ""}`}>
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(event) =>
              updateSettings({ enabled: event.target.checked })
            }
          />
          <span className="switch-track" aria-hidden="true">
            <span />
          </span>
          <span className="switch-label">
            {settings.enabled ? "التذكير مفعّل" : "التذكير متوقف"}
          </span>
        </label>
      </header>

      <section
        className="settings-section schedule-section"
        aria-labelledby="schedule-title"
      >
        <div className="section-heading">
          <div>
            <p className="section-index">01 / التذكير</p>
            <h2 id="schedule-title">إيقاع الأذكار</h2>
          </div>
          <span
            className={`status-indicator ${settings.enabled ? "active" : ""}`}
          >
            {settings.enabled ? "يعمل حسب الإعدادات" : "بانتظار التفعيل"}
          </span>
        </div>

        <div className="schedule-controls">
          <label className="field-label" htmlFor="interval">
            المدة بين كل ذكر
            <span className="input-with-unit">
              <input
                id="interval"
                type="number"
                min="1"
                max="1440"
                value={settings.intervalMinutes}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (value > 0) updateSettings({ intervalMinutes: value });
                }}
              />
              <span>دقيقة</span>
            </span>
          </label>
          <p className="field-note">
            يظهر ذكر جديد تلقائياً بعد انتهاء هذه المدة.
          </p>
        </div>

        <div className="category-header">
          <h3>التصنيفات المشمولة</h3>
          <span>
            {settings.categories.length} من {categoryOptions.length}
          </span>
        </div>
        <div className="category-list">
          {categoryOptions.map((category) => (
            <label className="category-option" key={category.value}>
              <input
                type="checkbox"
                checked={settings.categories.includes(category.value)}
                onChange={() => toggleCategory(category.value)}
              />
              <span className="custom-check" aria-hidden="true" />
              <span className="category-copy">
                <strong>{category.label}</strong>
                <small>{category.description}</small>
              </span>
            </label>
          ))}
        </div>
      </section>

      <details className="settings-section sonner-section">
        <summary>
          <div>
            <p className="section-index">02 / المظهر والسلوك</p>
            <h2>إعدادات الإشعارات</h2>
          </div>
          <span className="summary-mark" aria-hidden="true">
            +
          </span>
        </summary>

        <div className="sonner-options">
          <div className="options-grid">
            <label className="field-label">
              السمة
              <select
                value={sonner.theme ?? "light"}
                onChange={(event) =>
                  updateSonner({
                    theme: event.target.value as ToasterProps["theme"],
                  })
                }
              >
                <option value="light">فاتح</option>
                <option value="dark">داكن</option>
                <option value="system">حسب النظام</option>
              </select>
            </label>
            <label className="field-label">
              موضع الإشعار
              <select
                value={sonner.position ?? "bottom-right"}
                onChange={(event) =>
                  updateSonner({
                    position: event.target.value as ToasterProps["position"],
                  })
                }
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              عدد الإشعارات الظاهرة
              <input
                type="number"
                min="1"
                max="10"
                value={sonner.visibleToasts ?? 3}
                onChange={(event) =>
                  updateSonner({
                    visibleToasts: Math.max(1, Number(event.target.value)),
                  })
                }
              />
            </label>
            <label className="field-label">
              معرّف Toaster
              <input
                type="text"
                value={sonner.id ?? ""}
                onChange={(event) =>
                  updateSonner({ id: event.target.value || undefined })
                }
              />
            </label>
            <label className="field-label">
              الإزاحة
              <input
                type="text"
                value={String(sonner.offset ?? "32px")}
                onChange={(event) =>
                  updateSonner({ offset: event.target.value })
                }
              />
            </label>
            <label className="field-label">
              إزاحة الهاتف
              <input
                type="text"
                value={String(sonner.mobileOffset ?? "16px")}
                onChange={(event) =>
                  updateSonner({ mobileOffset: event.target.value })
                }
              />
            </label>
            <label className="field-label">
              اتجاه النص
              <select
                value={sonner.dir ?? "rtl"}
                onChange={(event) =>
                  updateSonner({
                    dir: event.target.value as ToasterProps["dir"],
                  })
                }
              >
                <option value="ltr">LTR</option>
                <option value="rtl">RTL</option>
                <option value="auto">Auto</option>
              </select>
            </label>
            <label className="field-label">
              اختصار لوحة المفاتيح
              <input
                type="text"
                value={(sonner.hotkey ?? []).join(", ")}
                onChange={(event) =>
                  updateSonner({
                    hotkey: event.target.value
                      .split(",")
                      .map((key) => key.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
            <label className="field-label">
              المسافة بين الإشعارات
              <input
                type="number"
                min="0"
                max="100"
                value={sonner.gap ?? 14}
                onChange={(event) =>
                  updateSonner({ gap: Math.max(0, Number(event.target.value)) })
                }
              />
            </label>
            <label className="field-label">
              مدة ظهور الإشعار (مللي ثانية)
              <input
                type="number"
                min="1000"
                max="60000"
                step="500"
                value={sonner.toastOptions?.duration ?? 4000}
                onChange={(event) =>
                  updateSonner({
                    toastOptions: {
                      ...sonner.toastOptions,
                      duration: Math.max(1000, Number(event.target.value)),
                    },
                  })
                }
              />
            </label>
          </div>

          <div className="toggle-grid">
            <Toggle
              label="ألوان الحالة"
              checked={sonner.richColors ?? false}
              onChange={(value) => updateSonner({ richColors: value })}
            />
            <Toggle
              label="توسيع الإشعارات"
              checked={sonner.expand ?? false}
              onChange={(value) => updateSonner({ expand: value })}
            />
            <Toggle
              label="زر الإغلاق"
              checked={sonner.closeButton ?? false}
              onChange={(value) => updateSonner({ closeButton: value })}
            />
            <Toggle
              label="عكس الألوان"
              checked={sonner.invert ?? false}
              onChange={(value) => updateSonner({ invert: value })}
            />
          </div>

          <fieldset className="option-fieldset">
            <legend>اتجاهات السحب للإغلاق</legend>
            <div className="toggle-grid compact">
              {swipeOptions.map((direction) => (
                <Toggle
                  key={direction}
                  label={direction}
                  checked={(sonner.swipeDirections ?? []).includes(direction)}
                  onChange={() => setSwipeDirection(direction)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="option-fieldset">
            <legend>الأيقونات (نص أو رمز)</legend>
            <div className="options-grid icon-grid">
              {iconOptions.map((icon) => (
                <label className="field-label" key={icon}>
                  {icon}
                  <input
                    type="text"
                    value={
                      typeof sonner.icons?.[icon] === "string"
                        ? (sonner.icons[icon] as string)
                        : ""
                    }
                    onChange={(event) =>
                      updateSonner({
                        icons: {
                          ...sonner.icons,
                          [icon]: event.target.value || undefined,
                        },
                      })
                    }
                  />
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </details>

      <footer className="app-footer">
        <span>تُحفظ تفضيلاتك تلقائياً على هذا الجهاز</span>
        <button type="button" className="reset-button" onClick={resetSettings}>
          استعادة الإعدادات الافتراضية
        </button>
      </footer>
    </main>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="toggle-option">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="custom-check" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

export default App;
