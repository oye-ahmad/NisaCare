-- ============================================================
--  NisaCare — Women-Specific Situations (Urdu)
--  Run this in your SQLite DB (firstaid.db)
--  Table: situations  |  Columns: name, description, instructions, precautions, video_path
-- ============================================================

-- First, let's also make sure the items table has some relevant items
-- (you can skip this block if items already exist)

-- ── SITUATION 1: ماہواری کا شدید درد ──────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Menstrual Pain',
  'ماہواری کے دوران پیٹ، کمر اور ٹانگوں میں شدید درد ہو سکتا ہے۔ یہ بچہ دانی کے سکڑنے کی وجہ سے ہوتا ہے اور عام طور پر پہلے 1-3 دنوں میں زیادہ ہوتا ہے۔ بعض اوقات یہ درد اتنا شدید ہو سکتا ہے کہ روزمرہ کام مشکل ہو جائے۔',
  'گرم پانی کی بوتل یا ہیٹنگ پیڈ پیٹ پر رکھیں — گرمی سے پٹھوں کو سکون ملتا ہے۔ گھٹنوں کو سینے کی طرف موڑ کر کروٹ سے لیٹیں — اس پوزیشن سے درد کم ہوتا ہے۔ ہلکی ورزش جیسے چہل قدمی یا یوگا درد کو کم کر سکتی ہے۔ گرم کیمومائل یا ادرک کی چائے پئیں۔ پانی اور سیال زیادہ پئیں۔ اگر درد بہت شدید ہو تو ڈاکٹر کی ہدایت سے درد کش دوا لے سکتی ہیں۔',
  'اگر درد ہر ماہ بڑھتا جا رہا ہے تو ڈاکٹر سے ملیں — یہ PCOS یا Endometriosis ہو سکتا ہے۔ بہت زیادہ درد کش ادویات نہ لیں بغیر ڈاکٹر کے مشورے کے۔ اگر درد کے ساتھ بخار یا غیر معمولی خون آئے تو فوری ڈاکٹر سے ملیں۔',
  'menstrual_pain.mp4'
);

-- ── SITUATION 2: بہت زیادہ ماہواری (Heavy Bleeding) ──────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Heavy Menstrual Bleeding',
  'اگر ماہواری میں بہت زیادہ خون آئے — ہر گھنٹے میں پیڈ بھیگ جائے، بڑے لوتھڑے نکلیں، یا ماہواری 7 دن سے زیادہ چلے — تو یہ ایک طبی مسئلہ ہو سکتا ہے۔ اس سے خون کی کمی (انیمیا) ہو سکتی ہے جو کمزوری اور چکر کا سبب بنتی ہے۔',
  'زیادہ آرام کریں اور اپنے آپ کو تھکائیں نہیں۔ آئرن سے بھرپور کھانے کھائیں جیسے پالک، دال، کلیجی، گوشت۔ زیادہ پانی اور سیال پئیں۔ اگر چکر آئیں یا بہت کمزوری ہو تو لیٹ جائیں۔ سینیٹری پیڈ باقاعدگی سے بدلتی رہیں — ہر 4-6 گھنٹے میں۔ ڈاکٹر سے ملنے کا وقت لیں۔',
  'اگر 1 گھنٹے میں 2 سے زیادہ پیڈ بھیگ جائیں تو فوری ڈاکٹر کے پاس جائیں۔ اگر چکر، سانس لینے میں دشواری، یا بیہوشی ہو تو یہ خطرے کی علامت ہے — فوری طبی مدد لیں۔ ٹیمپون اور پیڈ ایک ساتھ استعمال کرنے کی ضرورت پڑے تو ڈاکٹر کو لازماً بتائیں۔',
  'heavy_bleeding.mp4'
);

-- ── SITUATION 3: حمل میں متلی اور قے ────────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Pregnancy Nausea',
  'حمل کے پہلے تین مہینوں میں متلی اور قے بہت عام ہے — اسے "صبح کی بیماری" کہتے ہیں لیکن یہ دن کے کسی بھی وقت ہو سکتی ہے۔ یہ ہارمون HCG کی وجہ سے ہوتی ہے اور عموماً 12-14 ہفتوں کے بعد کم ہو جاتی ہے۔',
  'خالی پیٹ نہ رہیں — تھوڑا تھوڑا کھاتی رہیں ہر 2-3 گھنٹے میں۔ صبح اٹھتے ہی بستر میں بسکٹ یا ٹوسٹ کھائیں۔ ادرک والی چائے، ادرک کی گولیاں یا لیموں کی خوشبو متلی کم کر سکتی ہے۔ تیز خوشبو، مسالیدار اور تلے ہوئے کھانوں سے پرہیز کریں۔ ٹھنڈا پانی چھوٹے گھونٹوں میں پئیں۔ آرام کریں — تھکاوٹ متلی بڑھاتی ہے۔',
  'اگر قے اتنی زیادہ ہو کہ کچھ بھی نہ رہے اور پانی بھی نہ پی سکیں تو فوری ڈاکٹر سے ملیں — یہ Hyperemesis Gravidarum ہو سکتا ہے۔ اگر وزن تیزی سے کم ہو رہا ہو تو ڈاکٹر کو بتائیں۔ بغیر ڈاکٹر کے مشورے کے کوئی دوائی نہ لیں۔',
  'pregnancy_nausea.mp4'
);

-- ── SITUATION 4: حمل میں خطرناک علامات ──────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Pregnancy Warning Signs',
  'حمل کے دوران کچھ علامات فوری طبی توجہ کی ضرورت ہوتی ہیں۔ یہ ماں اور بچے دونوں کے لیے خطرناک ہو سکتی ہیں۔ ان علامات کو نظرانداز کرنا بہت نقصاندہ ہو سکتا ہے۔',
  'فوری قریبی ہسپتال یا ڈاکٹر سے رابطہ کریں۔ آرام کریں اور کوئی بھی بھاری کام نہ کریں۔ کسی قابلِ اعتماد شخص کو ساتھ لے جائیں ہسپتال۔ اپنے ڈاکٹر کا نمبر ہمیشہ پاس رکھیں۔ حمل کے کاغذات اور رپورٹس ساتھ لے جائیں۔',
  'ان علامات پر فوری ڈاکٹر سے ملیں: شدید سر درد جو کم نہ ہو، آنکھوں کے آگے اندھیرا یا چمک، چہرے ہاتھوں پاؤں کی شدید سوجن، حمل کے دوران خون آنا، بچے کی حرکت اچانک بند ہو جائے، پانی کا اخراج، سانس لینے میں دشواری۔',
  'pregnancy_warning.mp4'
);

-- ── SITUATION 5: زچگی کے بعد کا ڈپریشن ───────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Postpartum Depression',
  'بچے کی پیدائش کے بعد بہت سی خواتین اداسی، تھکاوٹ، بے چینی، اور بچے کے ساتھ لگاؤ نہ ہونے کی کیفیت محسوس کرتی ہیں۔ یہ ہارمونز کی تبدیلی اور ذمہ داریوں کے دباؤ سے ہوتا ہے۔ یہ کوئی کمزوری نہیں — یہ ایک طبی کیفیت ہے۔',
  'اپنے جذبات کو دبائیں نہیں — کسی قابلِ اعتماد شخص سے بات کریں۔ آرام کریں جب بھی بچہ سوئے — نیند بہت ضروری ہے۔ خود پر زیادہ بوجھ نہ ڈالیں — کمال کی ماں بننے کی کوشش نہ کریں۔ چھوٹی چھوٹی خوشیاں ڈھونڈیں — تھوڑا ٹہلنا، دھوپ میں بیٹھنا۔ گھر والوں سے مدد مانگیں — یہ بھی طاقت ہے۔ ڈاکٹر یا ماہرِ نفسیات سے رابطہ کریں۔',
  'اگر خود کو یا بچے کو نقصان پہنچانے کے خیالات آئیں تو فوری مدد لیں — Umang: 0317-4288665۔ علامات کو 2 ہفتوں سے زیادہ نظرانداز نہ کریں۔ اکیلے نہ رہیں — گھر والوں کو بتائیں کہ آپ کیسا محسوس کر رہی ہیں۔',
  'postpartum_depression.mp4'
);

-- ── SITUATION 6: خون کی کمی (انیمیا) ──────────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Anemia in Women',
  'خواتین میں خون کی کمی بہت عام مسئلہ ہے — پاکستان میں تقریباً 50% خواتین اس سے متاثر ہیں۔ اس کی وجہ آئرن، وٹامن B12، یا فولک ایسڈ کی کمی ہو سکتی ہے۔ علامات میں تھکاوٹ، چکر، پیلاپن، سانس پھولنا، اور دل کی دھڑکن تیز ہونا شامل ہیں۔',
  'آئرن سے بھرپور کھانے روزانہ کھائیں: کلیجی، گوشت، پالک، دال، چنے، راجما، خشک میوہ جات۔ وٹامن سی (لیموں، آملہ، ٹماٹر) آئرن کو جذب کرنے میں مدد کرتا ہے — ساتھ کھائیں۔ چائے اور کافی کھانے کے فوراً بعد نہ پئیں — آئرن جذب نہیں ہونے دیتی۔ ڈاکٹر کی ہدایت سے آئرن کی گولیاں لیں۔ خون کا ٹیسٹ (CBC) کروائیں۔',
  'حمل کے دوران خون کی کمی بچے کی نشوونما پر اثر ڈال سکتی ہے — ڈاکٹر کو ضرور بتائیں۔ آئرن کی گولیاں لینے سے قبض ہو سکتی ہے — پانی اور فائبر زیادہ لیں۔ علامات شدید ہوں تو خود سے علاج نہ کریں — ڈاکٹر سے ملیں۔',
  'anemia.mp4'
);

-- ── SITUATION 7: PCOS (پولی سسٹک اووری سنڈروم) ──────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'PCOS',
  'پی سی او ایس ایک ہارمونل مسئلہ ہے جو بیضہ دانی کو متاثر کرتا ہے۔ علامات میں بے قاعدہ ماہواری، چہرے یا جسم پر زیادہ بال، مہاسے، وزن بڑھنا، اور حاملہ ہونے میں مشکل شامل ہیں۔ یہ بہت عام ہے اور قابلِ علاج ہے۔',
  'صحت مند غذا کھائیں — میٹھا، میدہ، اور تلا ہوا کم کریں۔ باقاعدہ ورزش کریں — دن میں صرف 30 منٹ چہل قدمی بھی فائدہ مند ہے۔ وزن کنٹرول میں رکھیں — 5-10% وزن کم کرنے سے بھی علامات بہتر ہو سکتی ہیں۔ ڈاکٹر کی ہدایت سے دوائیں لیں۔ ماہواری کا ریکارڈ رکھیں — NisaCare کا ٹریکر استعمال کریں۔ تناؤ کم کریں — یوگا، گہری سانس لینے کی ورزش۔',
  'PCOS کی تشخیص صرف الٹراساؤنڈ اور خون کے ٹیسٹ سے ہوتی ہے — خود سے تشخیص نہ کریں۔ علاج نہ ہو تو ذیابیطس اور دل کی بیماری کا خطرہ بڑھ سکتا ہے۔ اگر حاملہ ہونے میں مشکل ہو تو ماہرِ امراضِ نسواں سے ملیں۔',
  'pcos.mp4'
);

-- ── SITUATION 8: ذہنی صحت کا بحران ──────────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Mental Health Crisis',
  'بعض اوقات اداسی، تھکاوٹ، اور مایوسی اتنی شدید ہو جاتی ہے کہ روزمرہ زندگی مشکل لگنے لگتی ہے۔ یہ کوئی کمزوری نہیں — یہ ایک طبی کیفیت ہے جس کا علاج ممکن ہے۔ پاکستانی خواتین اکثر اسے نظرانداز کرتی ہیں — لیکن مدد مانگنا بہادری ہے۔',
  'کسی قابلِ اعتماد شخص سے ابھی بات کریں — ماں، بہن، سہیلی، یا ڈاکٹر۔ Umang ہیلپ لائن پر کال کریں: 0317-4288665۔ اپنے احساسات لکھیں — ڈائری لکھنا ذہنی بوجھ ہلکا کرتا ہے۔ باہر نکلیں — تھوڑی دھوپ اور تازہ ہوا مدد کرتی ہے۔ گہری سانس لینے کی ورزش کریں — 4 سیکنڈ سانس لیں، 4 روکیں، 4 میں چھوڑیں۔ کوئی بڑا فیصلہ اس وقت نہ کریں۔',
  'اگر خود کو نقصان پہنچانے کے خیالات آئیں تو فوری مدد لیں — Rozan: 051-2890505 یا Madadgaar: 1098۔ شراب یا نشہ آور اشیاء سے دور رہیں — یہ صورتحال مزید خراب کرتی ہیں۔ اکیلے بند کمرے میں نہ رہیں — کسی کو ساتھ بلائیں۔',
  'mental_health.mp4'
);

-- ── SITUATION 9: گھریلو تشدد / ہنگامی مدد ──────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Domestic Violence Help',
  'گھریلو تشدد جسمانی، ذہنی، یا جذباتی نقصان پہنچانا ہے۔ یہ غلط ہے اور قانون اس کے خلاف ہے۔ اگر آپ یا کوئی قریبی اس کا شکار ہے تو مدد لینا ممکن ہے — آپ اکیلی نہیں ہیں۔',
  'محفوظ جگہ پر چلی جائیں — پڑوسی، رشتہ دار، یا کوئی قابلِ اعتماد شخص کے پاس۔ ہیلپ لائن سے رابطہ کریں: Rozan 051-2890505، Umang 0317-4288665، Madadgaar 1098۔ اگر فوری خطرہ ہو تو پولیس (15) کو کال کریں۔ اہم دستاویزات (شناختی کارڈ، نکاح نامہ) کی کاپی محفوظ جگہ رکھیں۔ اپنے فون میں ایمرجنسی نمبر سیو کریں۔',
  'خطرے کے وقت تنہا مت رہیں۔ سوشل میڈیا پر اپنا مقام ظاہر نہ کریں۔ بچوں کو محفوظ رکھنا ترجیح ہے۔ قانونی مدد کے لیے Aurat Foundation یا WAR سے رابطہ کریں۔ اگر چوٹیں آئی ہوں تو ہسپتال جائیں اور میڈیکو لیگل کروائیں۔',
  'domestic_violence.mp4'
);

-- ── SITUATION 10: وٹامن ڈی کی کمی ──────────────────────────────────
INSERT INTO situations (name, description, instructions, precautions, video_path)
VALUES (
  'Vitamin D Deficiency',
  'پاکستان میں تقریباً 70% خواتین میں وٹامن ڈی کی کمی ہے — خاص طور پر وہ جو پردہ کرتی ہیں یا زیادہ گھر میں رہتی ہیں۔ کمی کی علامات میں ہڈیوں اور پٹھوں میں درد، تھکاوٹ، کمزور قوتِ مدافعت، اور اداسی شامل ہیں۔',
  'ہر روز صبح 15-20 منٹ دھوپ میں بیٹھیں — سورج کی روشنی سب سے بہترین ذریعہ ہے۔ مچھلی، انڈے کی زردی، اور کلیجی کھائیں — یہ قدرتی ذرائع ہیں۔ وٹامن ڈی فورٹیفائیڈ دودھ پئیں۔ ڈاکٹر کی ہدایت سے وٹامن ڈی کے سپلیمنٹ لیں۔ خون کا ٹیسٹ کروائیں — 25-OH Vitamin D ٹیسٹ سے کمی معلوم ہوتی ہے۔',
  'بغیر ٹیسٹ کے اندازے سے زیادہ وٹامن ڈی نہ لیں — زیادہ ہونے سے بھی نقصان ہو سکتا ہے۔ حمل اور دودھ پلانے میں زیادہ ضرورت ہوتی ہے — ڈاکٹر سے مشورہ لیں۔ صرف 10-15 منٹ دھوپ لینی ہے — دوپہر کی تیز دھوپ سے بچیں۔',
  'vitamin_d.mp4'
);

-- ── Related items for new situations ──────────────────────────────
-- (Assuming items table has item_id, name, image_path, description)
-- Add items if not already present:

INSERT OR IGNORE INTO items (name, description, usage_instructions, precautions, image_path, video_path)
VALUES ('ہیٹنگ پیڈ', 'گرمی سے پٹھوں کا درد کم ہوتا ہے', 'پیٹ یا کمر پر 15-20 منٹ رکھیں', 'جلد کو جلنے سے بچائیں — کپڑے کے اوپر رکھیں', 'heating_pad.png', NULL);

INSERT OR IGNORE INTO items (name, description, usage_instructions, precautions, image_path, video_path)
VALUES ('آئرن کی گولیاں', 'خون کی کمی پوری کرنے کے لیے', 'کھانے کے بعد وٹامن سی کے ساتھ لیں', 'ڈاکٹر کی ہدایت کے بغیر نہ لیں', 'iron_tablets.png', NULL);

INSERT OR IGNORE INTO items (name, description, usage_instructions, precautions, image_path, video_path)
VALUES ('فولک ایسڈ', 'حمل میں بچے کی نشوونما کے لیے ضروری', 'روزانہ 1 گولی کھانے کے ساتھ', 'حمل سے پہلے شروع کریں — ڈاکٹر سے مشورہ', 'folic_acid.png', NULL);

INSERT OR IGNORE INTO items (name, description, usage_instructions, precautions, image_path, video_path)
VALUES ('پیراسیٹامول', 'درد اور بخار کے لیے', '500mg کی 1 گولی 6 گھنٹے کے وقفے سے', 'حمل میں ڈاکٹر کے مشورے سے لیں', 'paracetamol.png', NULL);

INSERT OR IGNORE INTO items (name, description, usage_instructions, precautions, image_path, video_path)
VALUES ('سینیٹری پیڈ', 'ماہواری کے دوران صفائی کے لیے', 'ہر 4-6 گھنٹے میں بدلیں', 'انفیکشن سے بچنے کے لیے باقاعدگی سے بدلیں', 'sanitary_pad.png', NULL);

INSERT OR IGNORE INTO items (name, description, usage_instructions, precautions, image_path, video_path)
VALUES ('ادرک کی چائے', 'متلی اور ماہواری کے درد میں مددگار', 'تازہ ادرک پانی میں ابال کر شہد ملا کر پئیں', 'زیادہ مقدار میں نہ پئیں', 'ginger_tea.png', NULL);

-- ── Link items to situations via related_items table ──────────────
-- (Assuming related_items has situation_id and item_id columns)
-- First get situation IDs — these may vary; adjust numbers to match your DB

-- Menstrual Pain → Heating Pad, Paracetamol, Ginger Tea
INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Menstrual Pain' AND i.name = 'ہیٹنگ پیڈ';

INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Menstrual Pain' AND i.name = 'پیراسیٹامول';

INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Menstrual Pain' AND i.name = 'ادرک کی چائے';

-- Heavy Bleeding → Sanitary Pad, Iron Tablets
INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Heavy Menstrual Bleeding' AND i.name = 'سینیٹری پیڈ';

INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Heavy Menstrual Bleeding' AND i.name = 'آئرن کی گولیاں';

-- Pregnancy Nausea → Ginger Tea
INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Pregnancy Nausea' AND i.name = 'ادرک کی چائے';

-- Anemia → Iron Tablets, Folic Acid
INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Anemia in Women' AND i.name = 'آئرن کی گولیاں';

INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Anemia in Women' AND i.name = 'فولک ایسڈ';

-- Pregnancy Warning Signs → Folic Acid, Paracetamol
INSERT OR IGNORE INTO related_items (situation_id, item_id)
SELECT s.situation_id, i.item_id FROM situations s, items i
WHERE s.name = 'Pregnancy Warning Signs' AND i.name = 'فولک ایسڈ';
