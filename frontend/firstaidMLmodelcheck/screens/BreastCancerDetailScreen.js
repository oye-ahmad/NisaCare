

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, StyleSheet, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// ── All breast cancer content ──────────────────────────────────────
const CONTENT = {

  what: {
    title: 'چھاتی کا سرطان کیا ہے؟',
    color: '#C03870',
    icon: 'information-circle',
    intro: 'چھاتی کا سرطان (Breast Cancer) وہ بیماری ہے جس میں چھاتی کے خلیے بے قابو طریقے سے بڑھنے لگتے ہیں۔ یہ پاکستان میں خواتین میں سب سے زیادہ پایا جانے والا سرطان ہے — ہر 9 میں سے 1 خاتون کو خطرہ ہے۔',
    sections: [
      {
        heading: 'یہ کیسے شروع ہوتا ہے؟',
        points: [
          'چھاتی کے خلیوں کے DNA میں تبدیلی آ جاتی ہے',
          'یہ خلیے بے ترتیب اور تیزی سے بڑھنے لگتے ہیں',
          'گلٹی یا رسولی بن جاتی ہے',
          'علاج نہ ہو تو یہ جسم کے دوسرے حصوں میں پھیل سکتا ہے',
        ],
      },
      {
        heading: 'اقسام',
        points: [
          'Invasive Ductal Carcinoma — سب سے عام قسم، دودھ کی نالیوں سے شروع ہوتی ہے',
          'Invasive Lobular Carcinoma — دودھ بنانے والے غدود سے شروع ہوتی ہے',
          'DCIS — ابتدائی مرحلہ، ابھی نالیوں میں ہے، قابلِ علاج',
          'Triple Negative — زیادہ تیز لیکن کیموتھیراپی سے قابلِ علاج',
          'HER2 Positive — ہدف بند علاج سے بہتر نتائج',
        ],
      },
      {
        heading: 'کیا مردوں کو بھی ہو سکتا ہے؟',
        points: [
          'جی ہاں — لیکن بہت کم، 100 میں سے 1 کیس مرد میں ہوتا ہے',
          'مردوں میں اکثر دیر سے پتہ چلتا ہے',
          'علامات ایک جیسی ہیں — گلٹی، نپل سے خون',
        ],
      },
    ],
  },

  symptoms: {
    title: 'علامات — کیا محسوس کریں',
    color: '#8E44AD',
    icon: 'search',
    intro: 'چھاتی کا سرطان جلد پکڑنے کے لیے علامات پہچاننا ضروری ہے۔ یاد رہے — ہر گلٹی سرطان نہیں ہوتی، لیکن ڈاکٹر سے معائنہ ضروری ہے۔',
    sections: [
      {
        heading: 'اہم علامات',
        points: [
          'چھاتی میں نئی گلٹی یا سختی — خاص طور پر اگر بغیر درد کے ہو',
          'چھاتی کے سائز یا شکل میں تبدیلی',
          'نپل اندر کی طرف دھنس جائے',
          'نپل سے خون یا غیر معمولی مائع نکلے (دودھ پلانے کے علاوہ)',
          'چھاتی یا نپل کی جلد کھردری، سرخ یا سنتری کے چھلکے جیسی ہو جائے',
          'چھاتی یا بغل میں سوجن یا گلٹی',
          'چھاتی کی جلد میں گڑھا پڑ جائے',
          'چھاتی میں مسلسل درد یا بھاری پن',
        ],
      },
      {
        heading: 'یہ علامات سرطان نہیں ہو سکتیں لیکن چیک کروائیں',
        points: [
          'ماہواری سے پہلے چھاتی میں درد — عام طور پر ہارمونل',
          'نرم گلٹی جو حرکت کرتی ہو — اکثر سسٹ ہوتی ہے',
          'دودھ پلانے کے دوران درد یا سوجن — ماسٹائٹس ہو سکتی ہے',
          'لیکن ڈاکٹر سے تصدیق ضرور کروائیں',
        ],
      },
      {
        heading: 'ڈاکٹر کب دیکھیں؟',
        points: [
          'کوئی بھی نئی گلٹی محسوس ہو — فوری',
          'نپل سے خون آئے — اسی دن',
          'جلد یا شکل میں کوئی بھی تبدیلی — ایک ہفتے میں',
          'بغل میں سوجن — فوری',
          'خود معائنے میں کچھ بھی مختلف لگے — ڈاکٹر سے ملیں',
        ],
      },
    ],
  },

  selfexam: {
    title: 'خود معائنہ — گھر میں طریقہ',
    color: '#1D9E75',
    icon: 'hand-left',
    intro: 'ہر خاتون کو ہر ماہ خود معائنہ کرنا چاہیے۔ یہ صرف 5 منٹ کا عمل ہے اور ابتدائی مرحلے میں سرطان پکڑنے کا سب سے آسان طریقہ ہے۔ ماہواری کے 7-10 دن بعد کریں — اس وقت چھاتی نرم ہوتی ہے۔',
    sections: [
      {
        heading: 'مرحلہ 1 — آئینے کے سامنے',
        points: [
          'سیدھی کھڑی ہوں، بازو پہلو میں رکھیں',
          'دونوں چھاتیوں کو غور سے دیکھیں — سائز، شکل، رنگ',
          'اب بازو اوپر اٹھائیں — اسی طرح دیکھیں',
          'نپل کو دیکھیں — اندر دھنسا ہے؟ خارج ہو رہا ہے؟',
          'جلد پر کوئی تبدیلی؟ گڑھا؟ کھردرا پن؟',
        ],
      },
      {
        heading: 'مرحلہ 2 — لیٹ کر',
        points: [
          'پیٹھ کے بل لیٹیں، دائیں کندھے کے نیچے تکیہ رکھیں',
          'دائیں ہاتھ کو سر کے پیچھے رکھیں',
          'بائیں ہاتھ کی تین انگلیوں سے دائیں چھاتی کو دبا دبا کر محسوس کریں',
          'چھوٹے گول دائرے بناتی جائیں — باہر سے اندر کی طرف',
          'بغل کا حصہ بھی چیک کریں',
          'اب دوسری طرف بھی یہی کریں',
        ],
      },
      {
        heading: 'مرحلہ 3 — کھڑے ہو کر',
        points: [
          'شاور میں آسانی سے کر سکتی ہیں — گیلی جلد پر ہاتھ پھسلتا ہے',
          'دائیں بازو اوپر اٹھائیں',
          'بائیں ہاتھ سے دائیں چھاتی کو محسوس کریں',
          'کوئی گلٹی، سختی، یا غیر معمولی پن؟',
          'نپل کو آہستہ دبائیں — کوئی خارج؟',
        ],
      },
      {
        heading: 'کیا نارمل ہے؟',
        points: [
          'چھاتیوں کا سائز برابر نہ ہونا — بالکل عام',
          'ماہواری سے پہلے تھوڑا درد یا بھاری پن — عام',
          'تھوڑا کھردرا محسوس ہونا — غدود کی بناوٹ',
          'لیکن کوئی بھی نئی چیز جو پہلے نہ تھی — ڈاکٹر سے ملیں',
        ],
      },
    ],
  },

  riskfactors: {
    title: 'خطرے کے عوامل',
    color: '#D85A30',
    icon: 'warning',
    intro: 'کچھ عوامل چھاتی کے سرطان کا خطرہ بڑھاتے ہیں — لیکن خطرہ ہونے کا مطلب یہ نہیں کہ سرطان ہو گا۔ آگاہی سے بچاؤ ممکن ہے۔',
    sections: [
      {
        heading: 'قابلِ تبدیل عوامل (جن پر قابو ہو سکتا ہے)',
        points: [
          'موٹاپا — خاص طور پر رجونورتی کے بعد',
          'ورزش نہ کرنا — جسمانی سرگرمی خطرہ کم کرتی ہے',
          'شراب نوشی — بالکل نہ پئیں',
          'ہارمونل دوائیں طویل عرصے تک لینا',
          'پہلا بچہ 30 سال کے بعد ہونا',
          'بچے کو دودھ نہ پلانا — دودھ پلانے سے خطرہ کم ہوتا ہے',
          'تمباکو نوشی',
        ],
      },
      {
        heading: 'ناقابلِ تبدیل عوامل',
        points: [
          'عمر — 40 سال سے زیادہ، خطرہ بڑھتا ہے',
          'خاندان میں سرطان — ماں، بہن، بیٹی میں ہو',
          'BRCA1/BRCA2 جین — وراثتی خطرہ',
          'پہلے کسی اور سرطان کا علاج (Radiation)',
          'ماہواری 12 سال سے پہلے شروع ہو',
          'رجونورتی 55 سال کے بعد',
          'چھاتی کا گھنا ٹشو (Dense Breast Tissue)',
        ],
      },
      {
        heading: 'پاکستانی خواتین میں خاص وجوہات',
        points: [
          'دیر سے تشخیص — زیادہ تر ایڈوانس اسٹیج میں آتی ہیں',
          'شرم کی وجہ سے ڈاکٹر سے نہ ملنا',
          'آگاہی کی کمی',
          'باقاعدہ میموگرافی نہ کروانا',
          'خاندان میں سرطان کی تاریخ چھپانا',
        ],
      },
    ],
  },

  prevention: {
    title: 'بچاؤ — خطرہ کیسے کم کریں',
    color: '#185FA5',
    icon: 'shield-checkmark',
    intro: 'چھاتی کے سرطان کو مکمل طور پر روکنا ممکن نہیں لیکن خطرہ بہت حد تک کم کیا جا سکتا ہے — اور جلد تشخیص سے علاج بہت آسان ہو جاتا ہے۔',
    sections: [
      {
        heading: 'روزمرہ کی عادات',
        points: [
          'ہفتے میں کم از کم 150 منٹ ورزش — چہل قدمی بھی کافی ہے',
          'صحت مند وزن برقرار رکھیں',
          'پھل، سبزیاں، ریشہ دار غذا کھائیں',
          'سرخ اور پروسیسڈ گوشت کم کریں',
          'شراب بالکل نہ پئیں',
          'تمباکو سے مکمل پرہیز',
        ],
      },
      {
        heading: 'بچے کو دودھ پلانا',
        points: [
          'کم از کم 6 ماہ تک بچے کو اپنا دودھ پلائیں',
          'جتنا زیادہ عرصہ دودھ پلائیں، اتنا زیادہ فائدہ',
          'دودھ پلانے سے چھاتی کے سرطان کا خطرہ کم ہوتا ہے',
        ],
      },
      {
        heading: 'اسکریننگ (باقاعدہ معائنہ)',
        points: [
          '20 سال سے: ماہانہ خود معائنہ',
          '20-39 سال: ہر 3 سال میں ڈاکٹر سے چھاتی کا معائنہ',
          '40 سال سے: ہر سال میموگرافی + ڈاکٹر کا معائنہ',
          'خاندان میں سرطان ہو: 30 سال سے میموگرافی شروع کریں',
          'میموگرافی بے تکلیف X-ray ہے — ڈرنے کی ضرورت نہیں',
        ],
      },
      {
        heading: 'ذہنی دباؤ کم کریں',
        points: [
          'دائمی تناؤ مدافعتی نظام کمزور کرتا ہے',
          'یوگا، گہری سانس، دعا — جو آپ کو سکون دے',
          'نیند پوری کریں — کم از کم 7-8 گھنٹے',
          'سماجی روابط رکھیں — تنہائی صحت کے لیے نقصاندہ',
        ],
      },
    ],
  },

  stages: {
    title: 'مراحل اور علاج',
    color: '#854F0B',
    icon: 'medkit',
    intro: 'چھاتی کے سرطان کے مراحل 0 سے 4 تک ہیں۔ جتنا جلدی پکڑا جائے، علاج اتنا آسان اور کامیابی کے امکانات اتنے زیادہ۔',
    sections: [
      {
        heading: 'مراحل',
        points: [
          'Stage 0 (DCIS) — ابتدائی، صرف نالیوں میں — 99% صحت یابی',
          'Stage 1 — چھوٹی گلٹی، پھیلی نہیں — 98-100% صحت یابی',
          'Stage 2 — بڑی گلٹی یا قریبی غدود متاثر — 85-90%',
          'Stage 3 — مزید پھیلاؤ — 70-80%',
          'Stage 4 — دوسرے اعضا تک — 28% (لیکن علاج ممکن ہے)',
        ],
      },
      {
        heading: 'علاج کے طریقے',
        points: [
          'سرجری — گلٹی نکالنا (Lumpectomy) یا پوری چھاتی (Mastectomy)',
          'کیموتھیراپی — سرطانی خلیوں کو ختم کرنے والی دوائیں',
          'ریڈیوتھیراپی — شعاعوں سے علاج',
          'ہارمون تھیراپی — ہارمون سے بڑھنے والے سرطان کے لیے',
          'ٹارگٹڈ تھیراپی — HER2+ کے لیے',
          'امیونوتھیراپی — مدافعتی نظام کو مضبوط کرنا',
        ],
      },
      {
        heading: 'علاج کے بعد کی زندگی',
        points: [
          'زیادہ تر خواتین مکمل صحت یابی پاتی ہیں',
          'باقاعدہ فالو اپ ضروری ہے',
          'جذباتی مدد لیں — یہ سفر مشکل ہے، تنہا نہ رہیں',
          'خوراک اور ورزش سے دوبارہ آنے کا خطرہ کم ہوتا ہے',
          'کام اور معمول کی زندگی ممکن ہے',
        ],
      },
    ],
  },

  myths: {
    title: 'غلط فہمیاں اور حقائق',
    color: '#2980B9',
    icon: 'close-circle',
    intro: 'چھاتی کے سرطان کے بارے میں بہت سی غلط باتیں مشہور ہیں۔ یہ غلط فہمیاں لوگوں کو ڈاکٹر کے پاس جانے سے روکتی ہیں — آئیں ان کو دور کریں۔',
    sections: [
      {
        heading: 'غلط فہمی 1',
        points: [
          '❌ "چھاتی کا سرطان صرف بوڑھی خواتین کو ہوتا ہے"',
          '✅ حقیقت: یہ کسی بھی عمر میں ہو سکتا ہے — 25 سال کی لڑکیوں کو بھی',
          '✅ پاکستان میں نوجوان خواتین میں یہ بڑھ رہا ہے',
        ],
      },
      {
        heading: 'غلط فہمی 2',
        points: [
          '❌ "خاندان میں نہیں ہوا تو مجھے نہیں ہو گا"',
          '✅ حقیقت: 85% کیسز میں خاندان میں سرطان نہیں تھا',
          '✅ کوئی بھی خاتون مکمل طور پر محفوظ نہیں',
        ],
      },
      {
        heading: 'غلط فہمی 3',
        points: [
          '❌ "گلٹی میں درد نہیں تو خطرناک نہیں"',
          '✅ حقیقت: زیادہ تر سرطانی گلٹیاں ابتدا میں بے درد ہوتی ہیں',
          '✅ بے درد گلٹی کا معائنہ زیادہ ضروری ہے',
        ],
      },
      {
        heading: 'غلط فہمی 4',
        points: [
          '❌ "سرجری سے سرطان پھیل جاتا ہے"',
          '✅ حقیقت: یہ بالکل غلط ہے — سرجری علاج کا حصہ ہے',
          '✅ سرجری سے وقت پر علاج ہو تو زندگی بچتی ہے',
        ],
      },
      {
        heading: 'غلط فہمی 5',
        points: [
          '❌ "چھاتی کا سرطان = موت"',
          '✅ حقیقت: ابتدائی مرحلے میں 98% صحت یابی ممکن ہے',
          '✅ پاکستان میں بھی علاج دستیاب ہے',
        ],
      },
      {
        heading: 'غلط فہمی 6',
        points: [
          '❌ "میموگرافی سے سرطان ہوتا ہے"',
          '✅ حقیقت: میموگرافی میں بہت کم شعاعیں ہوتی ہیں — مکمل محفوظ',
          '✅ میموگرافی ابتدائی تشخیص کا سب سے بہترین ذریعہ ہے',
        ],
      },
    ],
  },

  support: {
    title: 'مدد اور ہیلپ لائنز',
    color: '#D4537E',
    icon: 'heart',
    intro: 'آپ اکیلی نہیں ہیں۔ پاکستان میں چھاتی کے سرطان کے علاج اور مدد کے لیے کئی ادارے موجود ہیں۔',
    sections: [
      {
        heading: 'پاکستان میں اہم ادارے',
        points: [
          'Shaukat Khanum Memorial Cancer Hospital — لاہور، پشاور، کراچی',
          '  ہیلپ لائن: 042-35945100',
          'Pink Ribbon Pakistan — آگاہی اور مفت معائنہ',
          '  ویب سائٹ: www.pinkribbonpakistan.org',
          'Aga Khan University Hospital — کراچی',
          '  021-34930051',
          'LRBT Cancer Hospital — لاہور',
          'Indus Hospital — کراچی (مفت علاج)',
        ],
      },
      {
        heading: 'مالی مدد',
        points: [
          'Shaukat Khanum: کم آمدنی والے مریضوں کو مفت علاج',
          'Zindagi Trust: غریب مریضوں کی مدد',
          'Bait ul Maal: حکومتی مدد کے لیے درخواست',
          'Edhi Foundation: علاج کے دوران مدد',
          'Saylani Trust: کھانا اور رہائش',
        ],
      },
      {
        heading: 'جذباتی مدد',
        points: [
          'Umang helpline: 0317-4288665 (ذہنی صحت)',
          'Rozan: 051-2890505',
          'Pink Ribbon support groups — آپ کے شہر میں',
          'Shaukat Khanum: مفت نفسیاتی مدد',
          'آن لائن گروپس — دوسری خواتین سے رابطہ',
        ],
      },
      {
        heading: 'میموگرافی کہاں کروائیں',
        points: [
          'سرکاری ہسپتال — کم قیمت',
          'Shaukat Khanum — ضرورت مندوں کو مفت',
          'Pink Ribbon مہم — مفت میموگرافی کیمپس',
          'اکتوبر (Pink Ribbon Month) میں خاص مہمات',
          'اپنے قریبی ڈاکٹر سے رجوع کریں',
        ],
      },
    ],
  },
};

// ── Collapsible section component ─────────────────────────────────
function CollapsibleSection({ heading, points, accentColor }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={secStyles.wrapper}>
      <TouchableOpacity
        style={[secStyles.header, { borderLeftColor: accentColor }]}
        onPress={() => setOpen(o => !o)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={accentColor}
        />
        <Text style={[secStyles.heading, { color: accentColor }]}>{heading}</Text>
      </TouchableOpacity>

      {open && (
        <View style={secStyles.content}>
          {points.map((pt, i) => (
            <View key={i} style={secStyles.pointRow}>
              {!pt.startsWith('❌') && !pt.startsWith('✅') && !pt.startsWith(' ') && (
                <Text style={[secStyles.bullet, { color: accentColor }]}>•</Text>
              )}
              <Text style={[
                secStyles.pointText,
                pt.startsWith('❌') && secStyles.myth,
                pt.startsWith('✅') && secStyles.fact,
                pt.startsWith(' ') && secStyles.indent,
              ]}>
                {pt}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ── Main detail screen ─────────────────────────────────────────────
export default function BreastCancerDetailScreen({ route }) {
  const { sectionId } = route.params;
  const navigation = useNavigation();
  const data = CONTENT[sectionId];

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>معلومات نہیں ملیں</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={data.color} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: data.color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{data.title}</Text>
        </View>
        <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
          <Ionicons name={data.icon} size={22} color="white" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={[styles.introCard, { borderLeftColor: data.color }]}>
          <Text style={styles.introText}>{data.intro}</Text>
        </View>

        {/* Sections */}
        {data.sections.map((sec, i) => (
          <CollapsibleSection
            key={i}
            heading={sec.heading}
            points={sec.points}
            accentColor={data.color}
          />
        ))}

        {/* Ask AI button */}
        <TouchableOpacity
          style={[styles.aiBtn, { backgroundColor: data.color }]}
          onPress={() => navigation.navigate('Chat', { topic: 'general' })}
          activeOpacity={0.85}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color="white" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.aiBtnTitle}>AI سے سوال کریں</Text>
            <Text style={styles.aiBtnSub}>اردو میں · مکمل نجی 🔒</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#FFF5F8' },
  center:       { flex: 1, alignItems: 'center', justifyContent: 'center' },

  header:       { flexDirection: 'row', alignItems: 'center', padding: 14, paddingTop: 16 , marginTop: 20 },
  backBtn:      { marginRight: 10, padding: 4 },
  headerTitle:  { color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'right' },
  iconBadge:    { width: 38, height: 38, borderRadius: 19,
                  alignItems: 'center', justifyContent: 'center' },

  scroll:       { padding: 14 },

  introCard:    { backgroundColor: '#fff', borderRadius: 12, padding: 14,
                  borderLeftWidth: 4, marginBottom: 14,
                  shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  introText:    { fontSize: 14, color: '#333', lineHeight: 24,
                  textAlign: 'right', writingDirection: 'rtl' },

  aiBtn:        { flexDirection: 'row', alignItems: 'center', borderRadius: 14,
                  padding: 14, marginTop: 10 },
  aiBtnTitle:   { color: '#fff', fontSize: 14, fontWeight: '700', textAlign: 'right' },
  aiBtnSub:     { color: 'rgba(255,255,255,0.8)', fontSize: 11, textAlign: 'right', marginTop: 2 },
});

const secStyles = StyleSheet.create({
  wrapper:      { backgroundColor: '#fff', borderRadius: 12, marginBottom: 10,
                  shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
                  overflow: 'hidden' },
  header:       { flexDirection: 'row', alignItems: 'center', padding: 14,
                  borderLeftWidth: 3, gap: 8 },
  heading:      { flex: 1, fontSize: 14, fontWeight: '700', textAlign: 'right' },
  content:      { paddingHorizontal: 14, paddingBottom: 14 },
  pointRow:     { flexDirection: 'row', marginBottom: 8, alignItems: 'flex-start' },
  bullet:       { fontSize: 16, fontWeight: '700', marginRight: 8, lineHeight: 22 },
  pointText:    { flex: 1, fontSize: 13, color: '#333', textAlign: 'right',
                  lineHeight: 22, writingDirection: 'rtl' },
  myth:         { color: '#C0392B', fontWeight: '600' },
  fact:         { color: '#1D9E75', fontWeight: '600' },
  indent:       { color: '#185FA5', paddingLeft: 16 },
});
