<div dir="rtl" align="right">

# Adhkar Toaster

الترخيص: [MIT](LICENSE)

مكوّن React لعرض الأذكار في إشعارات Sonner على فترات منتظمة. يدعم قائمة أذكار مخصصة، واختيار التصنيفات، وإعدادات Sonner، وحفظ تفضيلات المستخدم محلياً في المتصفح.

اسم الحزمة هو `@ay-ub/adhkar-toaster`. المستودع مجهّز لإنتاج ملفات ESM وCommonJS وتعريفات TypeScript. لم يتم النشر إلى npm تلقائياً؛ النشر الفعلي يحتاج تسجيل الدخول إلى حساب npm الذي يملك النطاق `@ay-ub`.

## المزايا

- اختيار ذكر عشوائي من التصنيفات المفعّلة، مع تجنب تكرار الذكر السابق مباشرةً متى توفرت بدائل.
- فاصل زمني قابل للضبط بالدقائق، مع إيقاف الجدولة عند تعطيلها أو عدم وجود أذكار في التصنيفات المحددة.
- دعم بيانات أذكار خارجية يمررها المطور.
- إظهار النص والمصدر وعدد التكرار في إشعار Sonner الافتراضي.
- تخصيص إعدادات Toaster ودمجها مع إعدادات المستخدم المحفوظة.
- اتجاه RTL افتراضي للأذكار، مع خيارات Sonner المعتادة.

## المتطلبات

- React وReact DOM 18 أو 19.
- TypeScript عند استخدام الأنواع مباشرة.
- مشاريع TypeScript تحتاج `@types/react` و`@types/react-dom` إذا لم تكن متوفرة لديها.
- Sonner `^2.0.8`.

ثبّت الحزمة مع متطلباتها النظيرة:

<div dir="ltr" align="left">

```bash
npm install @ay-ub/adhkar-toaster sonner
# or
pnpm add @ay-ub/adhkar-toaster sonner
```

</div>

## الاستخدام الأساسي

يجب وضع المكوّن داخل `AdhkarSettingsProvider` لأن `AdhkarToaster` يقرأ الإعدادات من Context.

<div dir="ltr" align="left">

```tsx
import { AdhkarSettingsProvider, AdhkarToaster } from "@ay-ub/adhkar-toaster";

export function App() {
  return (
    <AdhkarSettingsProvider>
      <AdhkarToaster />
      <main>{/* بقية التطبيق */}</main>
    </AdhkarSettingsProvider>
  );
}
```

</div>

التذكير متوقف افتراضياً. لتفعيله من واجهة التطبيق استخدم `useAdhkarSettings`، أو مرر `settings` مباشرة إلى المكوّن.

## تمرير إعدادات من المطور

`settings` يقبل إعدادات جزئية. القيم الممررة لها أولوية على الإعدادات المحفوظة في Context. إعدادات `sonner` و`sonner.toastOptions` تدمج بشكل جزئي، فلا تحتاج إلى إعادة إرسال جميع الخيارات.

<div dir="ltr" align="left">

```tsx
import type { AdhkarToasterConfig } from "@ay-ub/adhkar-toaster";

const toasterConfig: AdhkarToasterConfig = {
  enabled: true,
  intervalMinutes: 15,
  categories: ["general", "morning"],
  sonner: {
    position: "top-center",
    dir: "rtl",
    richColors: true,
    toastOptions: {
      duration: 6000,
    },
  },
};

<AdhkarToaster settings={toasterConfig} />;
```

</div>

يدعم JavaScript CommonJS أيضاً:

<div dir="ltr" align="left">

```js
const {
  AdhkarSettingsProvider,
  AdhkarToaster,
} = require("@ay-ub/adhkar-toaster");
```

</div>

ومع TypeScript/NodeNext يختار مدير الحزم تعريفات `.d.ts` مع `import` وتعريفات `.d.cts` مع `require` تلقائياً.

الـoverrides لا تكتب فوق إعدادات Context ولا تحفظها؛ إنها تخص هذا الاستخدام للمكوّن فقط. الإعدادات التفاعلية التي يغيّرها المستخدم عبر Context هي التي تحفظ محلياً.

## تمرير أذكار خاصة

استخدم `adhkarItems` لاستبدال القائمة الافتراضية بقائمة يملكها التطبيق. يجب أن يطابق كل عنصر نوع `Adhkar`.

<div dir="ltr" align="left">

```tsx
import type { Adhkar } from "@ay-ub/adhkar-toaster";

const myAdhkar: Adhkar[] = [
  {
    id: "morning-tasbih",
    category: "morning",
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  },
  {
    id: "custom-general-dhikr",
    category: "general",
    text: "الْحَمْدُ لِلَّهِ",
  },
];

<AdhkarToaster adhkarItems={myAdhkar} />;
```

</div>

`adhkarItems` اختيارية؛ إذا لم تمررها يستخدم المكوّن الأذكار المضمنة في الحزمة. يرشّح المكوّن القائمة بحسب `settings.categories`. استخدم معرّفاً فريداً لكل ذكر لتفادي التباس منع التكرار المتتابع.

## مرجع المكوّن

### `AdhkarToaster`

| الخاصية       | النوع                 | الافتراضي       | الوصف                                                         |
| ------------- | --------------------- | --------------- | ------------------------------------------------------------- |
| `settings`    | `AdhkarToasterConfig` | إعدادات Context | إعدادات جزئية يحددها المطور. لها الأولوية على القيم المحفوظة. |
| `adhkarItems` | `readonly Adhkar[]`   | القائمة المحلية | قائمة الأذكار المستخدمة للاختيار.                             |

### `AdhkarToasterConfig`

هذا النوع يسمح بتمرير أي subset من إعدادات `AdhkarSettings`:

| الخاصية           | النوع                   | الافتراضي              | الوصف                                                                       |
| ----------------- | ----------------------- | ---------------------- | --------------------------------------------------------------------------- |
| `enabled`         | `boolean`               | `false`                | تشغيل أو إيقاف الجدولة.                                                     |
| `intervalMinutes` | `number`                | `30`                   | المدة بين الإشعارات بالدقائق. يجب أن تكون أكبر من صفر.                      |
| `categories`      | `AdhkarCategory[]`      | كل التصنيفات           | التصنيفات التي يسمح باختيار الأذكار منها. القائمة الفارغة توقف عرض الأذكار. |
| `sonner`          | `Partial<ToasterProps>` | القيم الافتراضية أدناه | خصائص مكوّن Sonner `Toaster`.                                               |

إذا لم تمرر `settings`، تستخدم الإعدادات في Context. أما إذا مررت قيمة واحدة فقط، فبقية القيم تظل من Context.

### `Adhkar`

<div dir="ltr" align="left">

```ts
type Adhkar = {
  id: string;
  category: AdhkarCategory;
  text: string;
  duration?: number;
};
```

</div>

| الحقل      | الوصف                                                                         |
| ---------- | ----------------------------------------------------------------------------- |
| `id`       | معرّف فريد للذكر، ويستخدم للمساعدة على عدم اختيار الذكر نفسه مرتين متتاليتين. |
| `category` | تصنيف الذكر.                                                                  |
| `text`     | النص الذي يظهر في عنوان الإشعار.                                              |
| `duration` | مدة ظهور الإشعار بالمللي ثانية. إذا لم تحدد، تستخدم مدة Sonner الافتراضية.    |

### `AdhkarCategory`

<div dir="ltr" align="left">

```ts
type AdhkarCategory = "morning" | "evening" | "after-prayer" | "general";
```

</div>

هذه القيم هي التصنيفات المدعومة حالياً. إضافة تصنيف جديد تتطلب تحديث النوع والبيانات وأي واجهة تعرض التصنيفات.

## إعدادات Sonner

`settings.sonner` يقبل `Partial<ToasterProps>` من إصدار Sonner المثبت. الافتراضيات المستخدمة في المشروع:

| الخاصية           | الافتراضي             | ملاحظات                                                   |
| ----------------- | --------------------- | --------------------------------------------------------- |
| `theme`           | `"light"`             | `"light"` أو `"dark"` أو `"system"`.                      |
| `richColors`      | `false`               | ألوان الحالة الغنية.                                      |
| `expand`          | `false`               | توسيع قائمة الإشعارات.                                    |
| `visibleToasts`   | `3`                   | أقصى عدد للإشعارات الظاهرة.                               |
| `id`              | `"adhkar-toaster"`    | معرّف Toaster؛ يستخدم أيضاً كـ`toasterId` للإشعار.        |
| `position`        | `"bottom-right"`      | موضع الإشعارات.                                           |
| `closeButton`     | `false`               | إظهار زر الإغلاق.                                         |
| `offset`          | `"32px"`              | إزاحة Toaster. يقبل Sonner string أو number أو object.    |
| `mobileOffset`    | `"16px"`              | إزاحة الشاشات الصغيرة. يقبل string أو number أو object.   |
| `swipeDirections` | `["right", "bottom"]` | اتجاهات السحب المدعومة: `top`, `right`, `bottom`, `left`. |
| `dir`             | `"rtl"`               | اتجاه محتوى Toaster: `"rtl"`, `"ltr"` أو `"auto"`.        |
| `hotkey`          | `["altKey", "t"]`     | مصفوفة مفاتيح اختصار Sonner.                              |
| `invert`          | `false`               | عكس ألوان الإشعار.                                        |
| `toastOptions`    | `{ duration: 4000 }`  | خيارات Toast العامة، ومنها مدة العرض بالمللي ثانية.       |
| `gap`             | `14`                  | المسافة بين الإشعارات.                                    |
| `icons`           | `{}`                  | أيقونات Sonner المخصصة.                                   |

يمكن مراجعة بقية الخصائص مباشرة في نوع `ToasterProps` الخاص بإصدار Sonner المستخدم. المكوّن يمرر إعدادات Sonner إلى `<Toaster />`، ويستخدم `toastOptions.duration` و`closeButton` و`id` أيضاً عند إنشاء إشعار الذكر.

## Context والـHook

### `AdhkarSettingsProvider`

يوفر إعدادات مشتركة لتطبيق React. لفّ به الجزء الذي يحتوي `AdhkarToaster` أو ضعه حول التطبيق كاملاً:

<div dir="ltr" align="left">

```tsx
<AdhkarSettingsProvider>
  <App />
</AdhkarSettingsProvider>
```

</div>

يحفظ Provider الإعدادات التفاعلية في `localStorage` تحت المفتاح `adhkar-settings-v1`. إذا تعذر الوصول إلى التخزين أو كانت البيانات تالفة، يعود إلى القيم الافتراضية. بيانات الأذكار نفسها لا تحفظ في `localStorage`.

### `useAdhkarSettings`

<div dir="ltr" align="left">

```tsx
const { settings, updateSettings, updateSonner, resetSettings } =
  useAdhkarSettings();
```

</div>

| القيمة                    | الوصف                                                     |
| ------------------------- | --------------------------------------------------------- |
| `settings`                | كائن الإعدادات الحالي.                                    |
| `updateSettings(updates)` | تحديث `enabled` أو `intervalMinutes` أو `categories`.     |
| `updateSonner(updates)`   | تحديث خصائص Sonner؛ يدمج `toastOptions` مع القيم الحالية. |
| `resetSettings()`         | إعادة جميع القيم المحفوظة إلى الافتراضي.                  |

يجب استدعاء هذا الـHook داخل `AdhkarSettingsProvider`، وإلا يرمي خطأ واضحاً.

## سلوك الجدولة والاختيار

- لا يبدأ الجدول إلا إذا كانت `enabled` تساوي `true`.
- أول إشعار يظهر بعد مرور مدة `intervalMinutes`، وليس فور التفعيل.
- تُرشح الأذكار بحسب التصنيفات المحددة قبل الاختيار.
- إذا كانت القائمة المرشحة فارغة فلن يظهر إشعار.
- الاختيار عشوائي، ويحاول استبعاد الذكر الذي ظهر في المرة السابقة إذا توفر خيار آخر.
- مدة ظهور إشعار الذكر من `duration` عند تحديدها، وإلا من `sonner.toastOptions.duration`، والافتراضي `4000` مللي ثانية.
- إلغاء الجدولة يتم تلقائياً عند إيقاف المكوّن أو تغيير إعدادات الجدولة.

## وحدات مساعدة داخلية

هذه الوحدات موجودة في المصدر، لكنها ليست حالياً صادرات عامة من entry point لحزمة منشورة:

<div dir="ltr" align="left">

```ts
scheduleAdhkar(onTick, intervalMs): () => void
selectAdhkar(items?, previousId?): Adhkar | null
```

</div>

`scheduleAdhkar` يبدأ مؤقتاً ويعيد دالة لإيقافه، ويرمي `RangeError` إذا كانت المدة غير موجبة أو غير منتهية. `selectAdhkar` يعيد `null` للقائمة الفارغة، ويستخدم القائمة الافتراضية إذا لم تمرر قائمة.

## أوامر التطوير

<div dir="ltr" align="left">

```bash
pnpm dev       # تشغيل خادم التطوير
pnpm build     # فحص TypeScript وبناء Vite
pnpm lint      # تشغيل ESLint
pnpm preview   # معاينة بناء الإنتاج
```

</div>

## بناء الحزمة ونشرها

أوامر البناء:

<div dir="ltr" align="left">

```bash
pnpm build
pnpm pack:check
```

</div>

ينتج البناء:

- `dist/adhkar-toaster.js`: نسخة ESM للاستيراد عبر `import`.
- `dist/adhkar-toaster.cjs`: نسخة CommonJS للاستخدام عبر `require`.
- `dist/types/`: تعريفات TypeScript الخاصة بـESM.
- `dist/types-cjs/`: تعريفات CommonJS بامتداد `.d.cts`.
- `dist/style.css`: تنسيقات Sonner الزجاجية.

</div>
