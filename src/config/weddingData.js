/**
 * Centralized Wedding Configuration File
 *
 * All wedding details, couple information, event schedules, venues,
 * and custom messages can easily be edited here.
 */

export const weddingData = {
  // Couple & Family Details
  couple: {
    bride: "Areeba Tariq",
    groom: "Zohair Malik",
    brideFirstName: "Areeba",
    groomFirstName: "Zohair",
    initials: "A & Z",
    monogram: "AZ",
    hashtag: "#AreebaGetsHerZohair",

    // Parents Information
    brideParents: "Mr. & Mrs. Tariq Mahmood Chaudhry",
    groomParents: "Mr. & Mrs. Javed Iqbal Malik",

    // Sacred Invocation & Quranic Verse
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahTranslation: "In the name of Allah, the Most Gracious, the Most Merciful",
    quranicVerse: {
      arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
      translation: "And among His signs is this: that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.",
      surah: "Surah Ar-Rum (30:21)"
    },

    // Main Invitation Heading
    invitationGreeting: "Together with their families",
    invitationSubheading: "We joyfully invite you to celebrate the wedding festivities of",
    invitationClosing: "We request the honour of your presence and heartfelt prayers on this joyous occasion.",
  },

  // Envelope Configuration
  envelope: {
    senderLabel: "The Families of Chaudhry & Malik",
    sealInitials: "A & Z",
    sealSubtitle: "Nuptials",
    welcomeTag: "Royal Wedding Invitation",
    instructionText: "You Are Cordially Invited",
    tapActionText: "Tap the royal seal to open your invitation",
  },

  // Events List
  events: [
    {
      id: "mehndi",
      title: "Mehndi",
      urduTitle: "حناء و مایوں",
      badge: "Festive Evening of Colors & Music",
      date: "Friday, December 18, 2026",
      isoDate: "2026-12-18T19:30:00",
      dayOfWeek: "Friday",
      time: "07:30 PM",
      timeNote: "Followed by Rasm-e-Hina & Musical Celebrations",
      venue: "The Mughal Gardens, Bab-ul-Shams",
      address: "Canal Bank Road, Royal Palm Golf & Country Club, Lahore",
      mapUrl: "https://maps.google.com/?q=Royal+Palm+Golf+and+Country+Club+Lahore",
      dressCode: "Traditional Festive & Vibrant (Shades of Mustard, Marigold & Olive)",
      invitationMessage:
        "With immense pleasure, we invite you to an enchanting evening of vibrant hues, melodious dholki rhythms, and joyous laughter as we begin the wedding celebrations with traditional Mehndi and Rasm-e-Hina.",
      theme: {
        accent: "from-amber-600 to-yellow-500",
        primaryColor: "#d97706",
        secondaryColor: "#f59e0b",
        bgGradient: "from-amber-950/80 via-yellow-950/60 to-emerald-950/80",
        cardBorder: "border-amber-500/40",
        accentGlow: "shadow-amber-500/20",
        patternType: "marigold",
        highlightBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      },
      buttonText: "Explore Mehndi Invitation",
      highlights: [
        "Traditional Dholak & Tappay",
        "Rasm-e-Mehndi & Henna Corner",
        "Live Food Stalls & Kashmiri Chai",
      ],
    },
    {
      id: "barat",
      title: "Barat",
      urduTitle: "بارات و نکاح",
      badge: "The Royal Wedding & Nikah",
      date: "Saturday, December 19, 2026",
      isoDate: "2026-12-19T20:00:00",
      dayOfWeek: "Saturday",
      time: "08:00 PM",
      timeNote: "Nikah Ceremony at 08:30 PM, Followed by Royal Feast",
      venue: "The Grand Sheesh Mahal Ballroom",
      address: "Pearl Continental Hotel, Shahrah-e-Quaid-e-Azam, Lahore",
      mapUrl: "https://maps.google.com/?q=Pearl+Continental+Hotel+Lahore",
      dressCode: "Royal Traditional Formal (Sherwani & Regal Lehengas in Crimson, Burgundy & Gold)",
      invitationMessage:
        "Together with our families, we request the honour of your graceful presence to witness the solemn solemnization of Nikah and celebrate the grand Barat of Areeba & Zohair as they embark on this sacred journey of union and love.",
      theme: {
        accent: "from-rose-800 to-amber-600",
        primaryColor: "#881337",
        secondaryColor: "#d4af37",
        bgGradient: "from-burgundy-950/90 via-rose-950/70 to-emerald-950/90",
        cardBorder: "border-rose-500/40",
        accentGlow: "shadow-rose-500/20",
        patternType: "mughal-arch",
        highlightBadge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      },
      buttonText: "Explore Barat Invitation",
      highlights: [
        "Solemn Nikah Ceremony",
        "Royal Shehnai Welcome",
        "Traditional Grand Mughlai Dawat",
      ],
    },
    {
      id: "walima",
      title: "Walima",
      urduTitle: "دعوتِ ولیمہ",
      badge: "The Grand Reception",
      date: "Sunday, December 20, 2026",
      isoDate: "2026-12-20T19:30:00",
      dayOfWeek: "Sunday",
      time: "07:30 PM",
      timeNote: "Dinner Served at 08:30 PM Sharp",
      venue: "Crystal Marquee, Garrison Polo Grounds",
      address: "DHA Phase 8, Cantt, Lahore",
      mapUrl: "https://maps.google.com/?q=Garrison+Golf+and+Country+Club+Lahore",
      dressCode: "Sophisticated Formal (Black Tie, Champagne, Pastels & Fine Silk)",
      invitationMessage:
        "Mr. & Mrs. Javed Iqbal Malik cordially request the pleasure of your company at the Walima Reception to celebrate the marriage of their beloved son Zohair with Areeba, and to bless the newlyweds with your prayers.",
      theme: {
        accent: "from-emerald-800 to-amber-500",
        primaryColor: "#064e3b",
        secondaryColor: "#d4af37",
        bgGradient: "from-emerald-950/90 via-teal-950/70 to-stone-950/90",
        cardBorder: "border-emerald-500/40",
        accentGlow: "shadow-emerald-500/20",
        patternType: "crystal-lattice",
        highlightBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      },
      buttonText: "Explore Walima Invitation",
      highlights: [
        "Reception of the Newlyweds",
        "Musical Symphony & Ambient Sitar",
        "Gourmet Continental & Traditional Buffet",
      ],
    },
  ],

  // Prayers & Blessings Section Content
  prayersSection: {
    title: "Your Prayers & Blessings",
    urduTitle: "دعائیں اور نیک تمنائیں",
    quote:
      "Your presence is a blessing, and your prayers are the most precious gift. Leave a heartfelt dua or message for the couple as they begin their new journey together.",
    quickDuas: [
      {
        arabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        text: "May Allah bless you both and bless your union, and gather you both in goodness and peace.",
      },
      {
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        text: "Wishing you a lifetime of endless affection, understanding, tranquility, and boundless happiness.",
      },
      {
        arabic: "سدا خوش و خرم رہو",
        text: "May your home be filled with laughter, barakah, mutual respect, and abundant joy.",
      },
    ],
  },

  // Initial Curated Blessings (Live Wall Preview)
  initialBlessings: [
    {
      id: "blessing-1",
      guest_name: "Tariq Mahmood & Family",
      relation: "Bride's Family",
      message:
        "May Allah Almighty illuminate your new life with eternal peace, love, and immense barakah. You both look so wonderful together. Sada khush raho!",
      created_at: "2026-11-15T18:00:00Z",
    },
    {
      id: "blessing-2",
      guest_name: "Dr. Hamza & Ayla",
      relation: "Close Friends, Islamabad",
      message:
        "Heartiest congratulations Areeba & Zohair! May this beautiful journey bring you closer every single day with tranquility and deep friendship. BarakAllahu Lakuma!",
      created_at: "2026-11-16T10:30:00Z",
    },
    {
      id: "blessing-3",
      guest_name: "Khala Yasmeen & Parvez Uncle",
      relation: "Groom's Family, Karachi",
      message:
        "MashAllah, our warmest prayers and congratulations to both beloved families. May your union be protected from all evil eyes and showered with divine blessings.",
      created_at: "2026-11-16T14:45:00Z",
    },
  ],

  // RSVP & Contact Details
  rsvp: {
    note: "No boxed gifts please, only your prayers and love are requested.",
    contacts: [
      { name: "Bilal Tariq (Bride's Brother)", phone: "+92 300 1234567" },
      { name: "Hamza Malik (Groom's Brother)", phone: "+92 321 7654321" },
    ],
  },
};
