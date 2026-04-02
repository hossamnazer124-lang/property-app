# 🏢 إدارة العقارات — دليل الرفع

## هيكل المشروع
```
property-project/
├── index.html          ← الواجهة الكاملة
├── api/
│   └── auth.js         ← Vercel Serverless (SOPW + Hash)
├── vercel.json         ← إعدادات Vercel
└── firestore.rules     ← قواعد أمان Firestore
```

---

## خطوة 1 — Firebase: فعّل Firestore
1. روح Firebase Console → Firestore Database
2. إذا في "test mode" غيّره:
   - اضغط **Rules** وحط هذا:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
   *(مؤقتاً — بعدين نضيق القواعد)*

---

## خطوة 2 — GitHub
1. افتح [github.com](https://github.com) → **New repository**
2. اسم المشروع مثلاً: `property-app`
3. **Public** أو **Private** (اختار Private أأمن)
4. ارفع الملفات الثلاثة:
   - `index.html`
   - `api/auth.js`
   - `vercel.json`

---

## خطوة 3 — Vercel
1. روح [vercel.com](https://vercel.com) → **Add New Project**
2. اربطه بـ GitHub repo
3. **Import** → **Deploy** (بدون تغيير)
4. بعد الـ deploy روح **Settings → Environment Variables** وأضف:

| Name    | Value       |
|---------|-------------|
| `SOPW`  | `HOSSAM2580` |
| `OWNER_PW` | `leader123` |

5. بعد إضافة الـ Variables → **Redeploy**

---

## كلمات السر الافتراضية
| المستخدم | كلمة السر |
|----------|-----------|
| مالك العقار | `leader123` |
| المسؤول (SOPW) | `HOSSAM2580` |

> ⚠️ غيّر كلمات السر بعد أول دخول من داخل التطبيق

---

## ملاحظة مهمة
كلمات السر محفوظة كـ **SHA-256 hash** في Firestore — لا أحد يقدر يقرأها حتى لو وصل للداتابيز.
