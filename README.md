# 👑 Royal Pakistani Digital Wedding Invitation

A digital Pakistani wedding invitation website inspired by traditional Mughal architecture, royal South Asian wedding stationery, and classical Pakistani wedding festivities.

Designed and developed with **React.js, Vite, Tailwind CSS, and Framer Motion**.

---

## ✨ Features & Guest Experience

1. **The Royal Opening Envelope**:
   - Initial centered luxury deep emerald & antique gold wedding envelope.
   - 3D realistic wax seal featuring couple initials (`A & Z`) and ribbon accents.
   - When tapped, the seal breaks with a golden spark emission and tactile audio chime, the flap folds open 180° in 3D, and the card emerges smoothly.

2. **The Main Royal Invitation**:
   - Sacred Bismillah calligraphy banner (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`).
   - Couple announcement with royal monogram crest and parents' names.
   - Quranic verse on love and tranquility (Surah Ar-Rum 30:21).

3. **Three Distinct Celebrations**:
   - 🪔 **Mehndi (حناء و مایوں)**: Festive mustard/marigold/amber palette with dholki and henna motifs.
   - 👑 **Barat & Nikah (بارات و نکاح)**: Royal deep burgundy/crimson/antique gold palette with Mughal arch motif.
   - 🕊️ **Walima (دعوتِ ولیمہ)**: Sophisticated champagne gold/ivory/soft blush reception palette.

4. **Dedicated Event Modals**:
   - Comprehensive event date, day of the week, starting time, venue name, and physical address.
   - **Google Maps Integration**: "View Location" button opens directly in Google Maps.
   - **Add to Calendar**: Instant 1-click addition to **Google Calendar** or **Apple Calendar / Outlook (.ics file)**.
   - **Copy Address**: 1-click clipboard copy with immediate visual feedback.
   - **Dress Code Guide**: Cultural wardrobe suggestions for guests.

5. **"Your Prayers & Blessings" (Interactive Guestbook)**:
   - Dedicated prayer submission section with quick Arabic dua pills.
   - Golden confetti celebration and blessing chime upon submission.
   - **Supabase Integration**: Stores blessings in Supabase with spam throttling and Row Level Security.
   - **Local Storage Fallback**: If Supabase credentials are not provided, prayers automatically persist locally in the browser so the experience never breaks.

6. **Ambient Royal Soundscape**:
   - Built-in Web Audio API sitar and harp ambient synthesizer (zero external MP3 dependencies, no broken links).
   - Polite mute/unmute floating toggle button.

---

## 🛠️ Tech Stack

- **Framework**: React.js 19 (JavaScript for easy customization)
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom Mughal palettes, gold shimmer, and typography
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebrations**: Canvas-Confetti
- **Backend / Database**: Supabase (`@supabase/supabase-js`) with automatic local fallback

---

## ✏️ Centralized Customization

All wedding details are centrally configured in a single file:
[`src/config/weddingData.js`](file:///src/config/weddingData.js)

To customize for any wedding:
1. Open `src/config/weddingData.js`.
2. Update:
   - `couple.bride`, `couple.groom`, `couple.initials`, `couple.monogram`.
   - `couple.brideParents`, `couple.groomParents`.
   - `envelope.instructionText`, `envelope.tapActionText`.
   - `events`: Dates, times, venues, addresses, Google Maps links, dress codes, and messages for Mehndi, Barat, and Walima.
   - `rsvp`: Contact persons and phone numbers.

---

## 🚀 Local Development

1. Clone or navigate to the repository directory:
   ```bash
   cd royal-pakistani-wedding
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Supabase for persistent cloud blessings:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your Supabase URL and Anon Key.

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## ☁️ Vercel Deployment

This project is pre-configured for instantaneous deployment on **Vercel**:

### 1. Automatic Deployment via Vercel Git Integration
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the Vercel Dashboard, click **Add New Project** and import the repository.
3. Configure the Build & Development Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Under **Environment Variables**, add (optional):
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Public Anon Key
5. Click **Deploy**.

### 2. Single-Page Application (SPA) Routing
A [`vercel.json`](file:///vercel.json) file is included to prevent 404 errors on direct navigation or page refresh:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🗄️ Supabase Database Setup (Optional)

If you wish to store guest prayers permanently in Supabase, execute this SQL query in the **Supabase SQL Editor**:

```sql
-- 1. Create the blessings table
CREATE TABLE IF NOT EXISTS blessings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL DEFAULT 'Well Wisher',
  relation TEXT DEFAULT 'Guest',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE blessings ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to view blessings
CREATE POLICY "Allow public read access"
ON blessings FOR SELECT
USING (true);

-- 4. Allow guests to insert prayers
CREATE POLICY "Allow public insert access"
ON blessings FOR INSERT
WITH CHECK (true);
```

---

## 📱 Mobile Responsiveness

- **Mobile Viewports (320px - 768px)**:
  - Envelope scales proportionally without horizontal overflow.
  - Wax seal is ergonomically positioned for thumb-tapping.
  - Event cards stack vertically with easy-to-read typography.
  - Buttons and inputs have 44px+ touch-friendly target areas.
- **Desktop Viewports (1024px+)**:
  - Balanced 3D perspective with realistic shadows.
  - 3-column royal event showcase.
  - Subtle floating golden dust particle field.
