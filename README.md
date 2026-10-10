# 🛒 বাজার দর (BazarDor)

> বাংলাদেশের প্রতিদিনের প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, বাজারভিত্তিক তুলনা ও পরিবর্তনের হিসাব।

---

## 🔗 Live Links

- 🌐 **Live Site:** [Coming soon — will add after deployment]
- 📦 **GitHub Repository:** [Your repo link here]

---

## 📖 Project Description

**বাজার দর** হলো একটি modern web application যেটি বাংলাদেশের বিভিন্ন বাজারের প্রতিদিনের পণ্যের দাম এক জায়গায় দেখায়। এটি ব্যবহারকারীকে দামের পরিবর্তন (▲ বেড়েছে / ▼ কমেছে), বাজারভিত্তিক সর্বনিম্ন-সর্বোচ্চ-গড় দাম, এবং category অনুযায়ী sorting এর সুবিধা দেয়। Authentication সহ protected product detail page শুধু লগইন করা ব্যবহারকারীরা দেখতে পারে।

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js 15 (App Router)** | Full-stack React framework |
| **React 19** | UI library |
| **Tailwind CSS v4** | Styling & responsiveness |
| **DaisyUI** | Component library |
| **BetterAuth** | Authentication (Email/Password + GitHub OAuth) |
| **MongoDB Atlas** | Database |
| **MongoDB Adapter** | BetterAuth + MongoDB integration |
| **react-hot-toast** | Toast notifications |
| **Google Fonts (Noto Sans Bengali)** | Bengali typography |
| **Vercel** | Deployment |

---

## ✨ Key Features (5+)

### 1. 🏠 **Interactive Home Page**
Hero section, আজ দাম বেড়েছে ▲ (Top 6 risers), আজ দাম কমেছে ▼ (Top 6 fallers), এবং সব পণ্য (33 items) responsive grid এ দেখায়।

### 2. 🎯 **Category-based Browsing**
8টি category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) — প্রতিটির জন্য dedicated page, sort dropdown, skeleton loader এবং empty state।

### 3. 🔒 **Protected Product Detail Page**
Login ছাড়া প্রবেশ করা যায় না। প্রতিটি পণ্যের min/max/avg দাম এবং ১২টি বাজারের তুলনামূলক data table এ দেখায়।

### 4. 🔐 **Full Authentication System (BetterAuth)**
Email/Password sign up + sign in, GitHub OAuth login, session management, protected route redirect, এবং toast notifications।

### 5. 🔄 **Update User Info**
Profile page থেকে নাম পরিবর্তন — BetterAuth এর `updateUser` API ব্যবহার করে।

### 6. 📱 **Fully Responsive Design**
Mobile, tablet ও desktop এ নিখুঁতভাবে কাজ করে — grid collapses, navbar scroll করে, hero stacks।

### 7. ⚡ **Price Ticker Marquee**
Navbar এর নিচে infinite scrolling price ticker যেখানে সব পণ্যের দাম ও পরিবর্তন দেখায়।

### 8. 💀 **Skeleton Loading**
প্রতিটি API call এর সময় skeleton loader — smooth UX।

---

## 📁 Folder Structure
