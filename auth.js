// api/auth.js — Vercel Serverless Function
// الـ SOPW محفوظ هنا في Environment Variable — مش في الكود

import { createHash } from 'crypto';

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { action, password } = req.body || {};
  const SOPW    = process.env.SOPW;          // من Vercel Environment Variables
  const OWNER_DEFAULT = process.env.OWNER_PW || 'leader123';

  // ==============================
  // hash كلمة السر (SHA-256)
  // ==============================
  function hashPw(pw) {
    return createHash('sha256').update(pw + 'prop_salt_2025').digest('hex');
  }

  // ==============================
  // التحقق من SOPW
  // ==============================
  if (action === 'verify_sopw') {
    if (!SOPW) return res.status(500).json({ ok: false, error: 'SOPW not configured' });
    return res.json({ ok: password === SOPW });
  }

  // ==============================
  // جيب الـ owner default hash
  // ==============================
  if (action === 'get_owner_hash') {
    return res.json({ hash: hashPw(OWNER_DEFAULT) });
  }

  // ==============================
  // hash كلمة سر جديدة
  // ==============================
  if (action === 'hash') {
    if (!password) return res.status(400).json({ error: 'password required' });
    return res.json({ hash: hashPw(password) });
  }

  // ==============================
  // تحقق من كلمة سر
  // ==============================
  if (action === 'verify') {
    const { hash } = req.body;
    if (!password || !hash) return res.status(400).json({ error: 'missing fields' });
    return res.json({ ok: hashPw(password) === hash });
  }

  return res.status(400).json({ error: 'unknown action' });
}
