// src/lib/bn.js
// English number → Bengali number (১৪৮) এবং unit translation

// ============================
// 1. English digit → Bengali digit
// ============================
const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(number) {
  if (number === null || number === undefined) return "";
  return number
    .toString()
    .replace(/\d/g, (d) => bnDigits[Number(d)]);
}

// ============================
// 2. Number কে Bengali তে কমা সহ দেখানো
//    148    → ১৪৮
//    1850   → ১,৮৫০
//    12500  → ১২,৫০০
// ============================
export function formatBn(number) {
  if (number === null || number === undefined) return "";
  const num = Number(number);
  if (isNaN(num)) return "";

  // ইংরেজি ফরম্যাটে কমা দাও, তারপর বাংলায় convert করো
  const formatted = num.toLocaleString("en-IN");
  return toBn(formatted);
}

// ============================
// 3. Unit translation
//    kg → প্রতি কেজি
//    litre → প্রতি লিটার
//    dozen → প্রতি ডজন
//    piece → প্রতি পিস
// ============================
export function translateUnit(unit) {
  const units = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return units[unit] || `প্রতি ${unit}`;
}

// ============================
// 4. Change pct দেখানোর জন্য (▲ ২.১% / ▼ ২.৯% / — ০.০%)
// ============================
export function formatChange(pct) {
  const abs = Math.abs(pct).toFixed(1);
  return `${toBn(abs)}%`;
}

// ============================
// 5. আজকের বাংলা তারিখ
//    Output: "৬ অক্টোবর, ২০২৬"
// ============================
export function todayBn() {
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const now = new Date();
  const day = toBn(now.getDate());
  const month = months[now.getMonth()];
  const year = toBn(now.getFullYear());

  return `${day} ${month}, ${year}`;
}