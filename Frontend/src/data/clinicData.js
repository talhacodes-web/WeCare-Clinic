export const CLINIC_INFO = {
  name: 'WeCare Clinic',
  tagline: 'Your Smile, Our Care',
  phone: '+1 (555) 382-7200',
  emergencyPhone: '+1 (555) 911-3368',
  email: 'care@wecareclinic.com',
  address: '452 Healthview Parkway, Suite 300, Medical Plaza, CA 90210',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 7:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 4:00 PM' },
    { days: 'Sunday', time: 'Closed (Emergency on-call)' },
  ],
};

export const CLINIC_STATS = [
  {
    value: '10+',
    label: 'Years of Experience',
    iconName: 'Award',
  },
  {
    value: '5,000+',
    label: 'Happy Patients',
    iconName: 'Users',
  },
  {
    value: '10+',
    label: 'Dental Services',
    iconName: 'Sparkles',
  },
  {
    value: '5',
    label: 'Dental Specialists',
    iconName: 'UserCheck',
  },
];

export const DENTAL_SERVICES = [
  {
    id: 'general-dentistry',
    name: 'General Dentistry',
    category: 'preventive',
    shortDescription: 'Routine dental examinations, cleaning, fillings, and comprehensive preventive care for lasting oral health.',
    fullDescription: 'Our general dental checkups and preventive cleanings detect potential dental problems early before they develop into serious discomfort. We provide thorough plaque removal, enamel fluoride treatment, digital oral cancer screenings, and tooth-colored composite restorations designed to maintain natural smile strength.',
    iconName: 'ShieldCheck',
    features: ['Comprehensive Oral Health Evaluation', 'Ultrasonic Scaling & Polishing', 'Tooth-Colored Composite Fillings', 'Digital Caries Detection'],
    durationMinutes: 45,
    suitableFor: 'Adults and teens seeking regular 6-month preventive maintenance and cavity restorations.',
  },
  {
    id: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    category: 'cosmetic',
    shortDescription: 'Treatments designed to improve the appearance, alignment, and natural radiance of your smile.',
    fullDescription: 'Cosmetic dentistry combines science and aesthetic artistry to elevate your smile. Whether you want porcelain veneers, cosmetic bonding for chipped teeth, or gum contouring, our team designs personalized smile makeovers tailored to your facial proportions.',
    iconName: 'Sparkles',
    features: ['Custom Porcelain Veneers', 'Direct Composite Bonding', 'Smile Symmetry & Gum Contouring', 'Full Aesthetic Smile Makeovers'],
    durationMinutes: 60,
    suitableFor: 'Individuals looking to repair chipped enamel, close gaps, or achieve an aesthetically balanced smile.',
  },
  {
    id: 'orthodontics',
    name: 'Orthodontics',
    category: 'specialized',
    shortDescription: 'Diagnosis and modern treatment for teeth alignment, crowded arches, and bite problems.',
    fullDescription: 'Correct misaligned teeth and irregular bites using discreet, modern orthodontic systems. We offer both clear removable aligners and gentle low-profile ceramic braces, helping you achieve optimal chewing function and a straight, confident profile.',
    iconName: 'Layers',
    features: ['Clear Removable Aligners', 'Low-Profile Ceramic & Metal Braces', 'Bite & Jaw Harmony Correction', 'Retainers & Long-Term Monitoring'],
    durationMinutes: 45,
    suitableFor: 'Patients of all ages experiencing teeth crowding, spacing, overbites, or underbites.',
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'cosmetic',
    shortDescription: 'Professional, enamel-safe teeth whitening for a noticeably brighter, stain-free smile.',
    fullDescription: 'Years of coffee, tea, and everyday foods can stain enamel. Our in-office LED accelerated whitening safely lifts deep stains up to 8 shades lighter in just a single hour, with minimal tooth sensitivity and long-lasting brightness.',
    iconName: 'SunMedium',
    features: ['In-Office 1-Hour Light Accelerated Whitening', 'Custom Take-Home Maintenance Trays', 'Enamel Desensitizing Gel Included', 'Safe for Sensitive Gums'],
    durationMinutes: 60,
    suitableFor: 'Anyone wanting quick, safe, and noticeable brightening for special occasions or daily confidence.',
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    category: 'restorative',
    shortDescription: 'Modern permanent solutions for replacing missing teeth with natural look and bite strength.',
    fullDescription: 'Dental implants are the gold standard for tooth replacement. Crafted from biocompatible titanium posts that fuse with bone, capped with lifelike zirconia crowns, they feel and perform exactly like natural teeth with no dietary limitations.',
    iconName: 'Anchor',
    features: ['3D CBCT Guided Computerized Placement', 'Biocompatible Titanium & Zirconia', 'Single & Multi-Tooth Implants', 'Preserves Healthy Neighboring Teeth'],
    durationMinutes: 90,
    suitableFor: 'Patients with one or more missing teeth seeking a permanent, non-removable alternative to bridges or dentures.',
  },
  {
    id: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    category: 'restorative',
    shortDescription: 'Professional, gentle treatment to relieve toothache and save infected or damaged teeth.',
    fullDescription: 'Modern root canal therapy is smooth, gentle, and virtually painless. Using rotary endodontic instruments and digital apex locators, we cleanse infected pulp tissue inside the tooth root, sterilize the chamber, and seal it to protect your natural tooth for decades.',
    iconName: 'Activity',
    features: ['Gentle Local Anesthesia & Pain Relief', 'Rotary Endodontic Precision Systems', 'Thermal Obturation Sealing', 'Protective Restorative Crown Placement'],
    durationMinutes: 60,
    suitableFor: 'Patients with deep decay, severe tooth sensitivity, lingering ache, or fractured dental roots.',
  },
  {
    id: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    category: 'preventive',
    shortDescription: 'Gentle, friendly dental care specially designed to keep children comfortable and confident.',
    fullDescription: 'Our pediatric dental visits focus on positive, stress-free experiences for infants, children, and teenagers. We provide protective dental sealants, gentle cleanings, habit counseling, and fun oral health education to establish lifetime dental hygiene habits.',
    iconName: 'HeartHandshake',
    features: ['Child-Friendly Gentle Environment', 'Protective Molar Sealants', 'Gentle Fluoride Treatments', 'Habit Guidance & Growth Monitoring'],
    durationMinutes: 30,
    suitableFor: 'Infants, toddlers, children, and teenagers needing comfortable pediatric dental guidance.',
  },
  {
    id: 'gum-care',
    name: 'Gum Care (Periodontics)',
    category: 'preventive',
    shortDescription: 'Prevention, deep therapy, and ongoing care for common gum inflammation and periodontal health.',
    fullDescription: 'Healthy gums are the essential foundation of healthy teeth. Our periodontal therapies treat gingivitis and periodontitis through gentle deep scaling, root planing, antibacterial irrigation, and supportive gum pocket maintenance.',
    iconName: 'Smile',
    features: ['Deep Scaling & Root Planing', 'Subgingival Ultrasonic Irrigation', 'Gingivitis Reversal Protocols', 'Pocket Depth Reduction Monitoring'],
    durationMinutes: 50,
    suitableFor: 'Individuals with bleeding gums, gum recession, bad breath, or periodontal inflammation.',
  },
];

export const DENTAL_TOOLS = [
  {
    id: 'digital-xray',
    name: 'Digital X-Ray',
    shortDescription: 'Helps dentists examine teeth and surrounding bone structures with modern digital imaging and up to 80% less radiation.',
    benefits: ['Up to 80% reduced radiation exposure', 'Instant high-resolution display on chairside screen', 'Enables early interproximal cavity detection'],
    iconName: 'ScanLine',
    category: 'Diagnostics',
  },
  {
    id: 'intraoral-camera',
    name: 'Intraoral Camera',
    shortDescription: 'Allows dentists to view and explain areas inside the mouth clearly on chairside monitors so you see what we see.',
    benefits: ['Crystal-clear magnified live color video', 'Transparent treatment understanding', 'Detailed photographic progress records'],
    iconName: 'Camera',
    category: 'Visualization',
  },
  {
    id: 'dental-laser',
    name: 'Dental Laser',
    shortDescription: 'Used for selected gentle soft-tissue procedures, gum reshaping, and bacterial decontamination with minimal healing time.',
    benefits: ['Minimally invasive with reduced discomfort', 'Promotes faster tissue regeneration', 'Less bleeding and swelling'],
    iconName: 'Zap',
    category: 'Soft Tissue Care',
  },
  {
    id: 'digital-scanning',
    name: 'Digital Scanning (3D)',
    shortDescription: 'Creates precise digital 3D impressions without the discomfort or gag reflex of traditional impression pastes.',
    benefits: ['No messy silicone impression trays', 'Fast 2-minute optical digital capture', 'Exceptional precision for aligners and crowns'],
    iconName: 'Box',
    category: 'Impression & Modeling',
  },
  {
    id: 'electric-handpiece',
    name: 'Electric Dental Handpiece',
    shortDescription: 'Modern equipment designed for smoother, quieter, and more precise dental procedures with significantly reduced vibration.',
    benefits: ['Significantly quieter operation', 'Ultra-smooth tactile precision', 'Shorter chair time for patients'],
    iconName: 'Cpu',
    category: 'Precision Instrumentation',
  },
  {
    id: 'sterilization-equipment',
    name: 'Sterilization Equipment',
    shortDescription: 'Hospital-grade Class B autoclaves and multi-stage sterilization systems maintain a spotless clinical environment.',
    benefits: ['Strict medical infection control protocols', 'Individually autoclaved instrument pouches', 'Continuous biological monitoring'],
    iconName: 'CheckCircle2',
    category: 'Hygiene & Safety',
  },
];

export const DENTISTS = [
  {
    id: 'dr-sarah-ahmed',
    name: 'Dr. Sarah Ahmed',
    title: 'DDS, Lead General & Preventive Dentist',
    specialty: 'General Dentistry',
    experienceYears: 12,
    education: 'University of California, San Francisco (UCSF) School of Dentistry',
    bio: 'Dr. Sarah Ahmed has over 12 years of clinical experience dedicating her career to gentle, preventive dentistry and patient education. She is renowned for her warm bedside manner, making even the most anxious patients feel relaxed and valued.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 'dr-ali-hassan',
    name: 'Dr. Ali Hassan',
    title: 'DMD, MS, Board-Certified Orthodontist',
    specialty: 'Orthodontics',
    experienceYears: 10,
    education: 'Harvard School of Dental Medicine / Orthodontics Residency',
    bio: 'Specializing in contemporary clear aligner therapy and complex facial biomechanics, Dr. Hassan has transformed thousands of smiles with a gentle, patient-first approach to bite alignment and aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    id: 'dr-ayesha-khan',
    name: 'Dr. Ayesha Khan',
    title: 'BDS, DDS, Cosmetic & Restorative Specialist',
    specialty: 'Cosmetic Dentistry',
    experienceYears: 9,
    education: 'New York University (NYU) College of Dentistry',
    bio: 'Dr. Ayesha Khan combines detailed cosmetic dental artistry with the latest ceramic materials to deliver natural, harmonious smile transformations including veneers, aesthetic bonding, and restorative crowns.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhZHklMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D',
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
  },
  {
    id: 'dr-michael-chen',
    name: 'Dr. Michael Chen',
    title: 'DDS, Endodontics & Implantologist',
    specialty: 'Dental Implants & Endodontics',
    experienceYears: 14,
    education: 'University of Pennsylvania School of Dental Medicine',
    bio: 'Dr. Chen specializes in computer-guided dental implantology and comfortable root canal therapy. He focuses on saving natural dentition whenever possible and restoring optimal chewing power.',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Experienced Professionals',
    description: 'Skilled dental doctors and hygienists focused on gentle, evidence-based patient care.',
    iconName: 'GraduationCap',
  },
  {
    title: 'Modern Technology',
    description: 'Digital 3D scanners, low-radiation X-rays, and lasers to support accurate diagnosis and treatment.',
    iconName: 'Cpu',
  },
  {
    title: 'Comfortable Environment',
    description: 'A spotless, welcoming clinic featuring calm treatment suites, soothing music, and gentle care.',
    iconName: 'Coffee',
  },
  {
    title: 'Personalized Treatment',
    description: 'Custom-tailored dental treatment plans designed around your individual timeline, goals, and comfort.',
    iconName: 'FileCheck',
  },
  {
    title: 'Family-Friendly Care',
    description: 'Comprehensive dental services tailored for toddlers, children, adults, and seniors all under one roof.',
    iconName: 'Heart',
  },
  {
    title: 'Easy Appointment Booking',
    description: 'Simple, direct online booking with instant confirmation and transparent appointment scheduling.',
    iconName: 'CalendarCheck',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Book Your Appointment',
    description: 'Choose your preferred dental service, specialist, date, and time slot via our easy online scheduler.',
  },
  {
    step: '02',
    title: 'Meet Your Dentist',
    description: 'Visit our welcoming clinic for a gentle examination, high-definition digital imaging, and one-on-one consultation.',
  },
  {
    step: '03',
    title: 'Get Your Treatment Plan',
    description: 'Review a clear, transparent treatment plan with no hidden costs, tailored to your exact oral health needs.',
  },
  {
    step: '04',
    title: 'Take Care of Your Smile',
    description: 'Complete treatment comfortably and maintain lifelong dental wellness with our supportive recall program.',
  },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    patientName: 'Jessica Martinez',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    procedure: 'Teeth Whitening & Cleaning',
    comment: 'Everyone at WeCare Clinic was friendly and professional. The entire experience was comfortable and easy, and my teeth look so much brighter!',
    date: 'August 2026',
  },
  {
    id: 't-2',
    patientName: 'David Reynolds',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    procedure: 'Dental Implant & Crown',
    comment: 'I was genuinely anxious about getting a dental implant, but Dr. Chen and the team explained every step. The 3D scan was quick and the procedure was totally painless.',
    date: 'July 2026',
  },
  {
    id: 't-3',
    patientName: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    procedure: 'Invisalign Clear Aligners',
    comment: 'Dr. Ali Hassan is fantastic! He customized my clear aligners and checked in at every step. My smile alignment is now perfect, and the clinic is immaculately clean.',
    date: 'August 2026',
  },
];

export const CORE_VALUES = [
  {
    title: 'Patient-First Care',
    description: 'Your physical comfort, peace of mind, and personal preferences guide every clinical decision we make.',
    iconName: 'Heart',
  },
  {
    title: 'Clinical Excellence',
    description: 'We adhere to the highest standards of evidence-based dental medicine and continuous professional training.',
    iconName: 'Award',
  },
  {
    title: 'Spotless Hygiene',
    description: 'Hospital-grade autoclaves, sealed single-use pouches, and rigorous sanitization protect every patient visit.',
    iconName: 'Sparkles',
  },
  {
    title: 'Honest Transparency',
    description: 'Clear pricing, no surprise bills, and open explanations using our chairside intraoral cameras.',
    iconName: 'ShieldCheck',
  },
];
