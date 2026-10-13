/**
 * Export official Word document (.doc) formatted for Phụ lục 2 CV 2345/BGDĐT-GDTH
 */

import { CurriculumPlanRow, AdminDocumentInfo } from '../types/curriculum2345';

interface ExportWordOptions {
  rows: CurriculumPlanRow[];
  selectedGrade: string;
  semesterFilter: 'all' | 1 | 2;
  adminInfo: AdminDocumentInfo;
}

export function exportCurriculumWordDocument({
  rows,
  selectedGrade,
  semesterFilter,
  adminInfo
}: ExportWordOptions) {
  const { schoolName, departmentName, teacherName, academicYear, principalName, cityDate } = adminInfo;
  const termTitle = semesterFilter === 'all' 
    ? 'CẢ NĂM (35 TUẦN)' 
    : semesterFilter === 1 
    ? 'HỌC KỲ I (TUẦN 1 - 18)' 
    : 'HỌC KỲ II (TUẦN 19 - 35)';

  const countIntegrated = rows.filter(r => r.isIntegrated).length;
  const countAct123 = rows.filter(r => r.isIntegrated && r.activityScope === 'act123').length;
  const countAct456 = rows.filter(r => r.isIntegrated && r.activityScope === 'act456').length;
  const countActAll = rows.filter(r => r.isIntegrated && r.activityScope === 'all').length;

  const rowsHtml = rows.map((r) => {
    let adjustmentHtml = '';
    if (r.isIntegrated) {
      const scopeBadgeText = r.activityScope === 'act123'
        ? '📌 [TÍCH HỢP TẠI HOẠT ĐỘNG 1, 2, 3 - Khởi động & Khám phá]'
        : r.activityScope === 'act456'
        ? '📌 [TÍCH HỢP TẠI HOẠT ĐỘNG 4, 5, 6 - Luyện tập & Vận dụng]'
        : '📌 [TÍCH HỢP TOÀN BỘ HOẠT ĐỘNG TRONG TIẾT]';

      const customItemsHtml = (r.customIntegrations || [])
        .filter(it => it.enabled)
        .map(it => {
          const isAi = it.domain === 'ai';
          const isYellowFramed = it.domain === 'kns' || it.domain === 'ethics' || it.domain === 'atgt';
          
          let boxStyle = 'background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 3px 6px; margin-bottom: 4px; font-size: 8.5pt; border-radius: 3px;';
          let headerTextColor = '#334155';

          if (isAi) {
            // Đóng khung xanh dương cho AI
            boxStyle = 'background-color: #eff6ff; border: 2px solid #2563eb; padding: 4px 6px; margin-bottom: 5px; font-size: 8.5pt; border-radius: 4px;';
            headerTextColor = '#1e3a8a';
          } else if (isYellowFramed) {
            // Bôi màu vàng đóng khung cho KNS, đạo đức, ATGT
            boxStyle = 'background-color: #fef3c7; border: 2px solid #d97706; color: #78350f; padding: 4px 6px; margin-bottom: 5px; font-size: 8.5pt; border-radius: 4px;';
            headerTextColor = '#78350f';
          } else if (it.domain === 'nls') {
            boxStyle = 'background-color: #ecfdf5; border-left: 3px solid #10b981; padding: 3px 6px; margin-bottom: 4px; font-size: 8.5pt;';
            headerTextColor = '#065f46';
          } else if (it.domain === 'gdhn') {
            boxStyle = 'background-color: #fff1f2; border: 2px solid #e11d48; padding: 4px 6px; margin-bottom: 4px; font-size: 8.5pt; border-radius: 4px;';
            headerTextColor = '#9f1239';
          }

          return `
            <div style="${boxStyle}">
              <span style="font-weight: bold; color: ${headerTextColor};">[${it.code}] ${it.domainLabelVn}:</span>
              <div style="color: #1f2937; margin-top: 1px;">🇻🇳 ${it.contentVn}</div>
              ${it.contentEn ? `<div style="color: #0369a1; font-style: italic; font-size: 8pt; margin-top: 1px;">🇬🇧 Pedagogy: ${it.contentEn}</div>` : ''}
            </div>
          `;
        }).join('');

      adjustmentHtml = `
        <div style="font-weight: bold; color: #78350f; background-color: #fef3c7; border: 2px solid #d97706; padding: 4px 6px; margin-bottom: 6px; font-size: 8.5pt; border-radius: 4px;">
          ${scopeBadgeText}
        </div>
        ${customItemsHtml || `
          ${r.isAIEnabled ? `<div style="border: 2px solid #2563eb; background-color: #eff6ff; padding: 3px 6px; border-radius: 4px; margin-bottom: 4px;"><p style="margin: 0; color: #1e3a8a; font-size: 9pt;"><b>🤖 AI (QĐ 2422/QĐ-BGDĐT):</b> ${r.adjustment.ai.replace(/^\[[^\]]+\]\s*🤖 AI[^:]+:\s*/, '')}</p></div>` : ''}
          ${r.isKNSEnabled ? `<div style="border: 2px solid #d97706; background-color: #fef3c7; padding: 3px 6px; border-radius: 4px; margin-bottom: 4px;"><p style="margin: 0; color: #78350f; font-size: 9pt;"><b>🤝 Kỹ năng sống (KNS):</b> ${r.adjustment.kns.replace(/^\[[^\]]+\]\s*🤝 KNS:\s*/, '')}</p></div>` : ''}
          ${r.isEthicsEnabled ? `<div style="border: 2px solid #d97706; background-color: #fef3c7; padding: 3px 6px; border-radius: 4px; margin-bottom: 4px;"><p style="margin: 0; color: #78350f; font-size: 9pt;"><b>❤️ Phẩm chất đạo đức (TT 32/2018):</b> ${r.adjustment.ethics.replace(/^\[[^\]]+\]\s*❤️ Phẩm chất[^:]+:\s*/, '')}</p></div>` : ''}
          ${r.isATGTEnabled ? `<div style="border: 2px solid #d97706; background-color: #fef3c7; padding: 3px 6px; border-radius: 4px; margin-bottom: 4px;"><p style="margin: 0; color: #78350f; font-size: 9pt;"><b>🚦 ATGT (CV 3456/BGDĐT-GDPT):</b> ${r.adjustment.atgt.replace(/^\[[^\]]+\]\s*🚦 ATGT[^:]+:\s*/, '')}</p></div>` : ''}
          ${r.isNLSEnabled ? `<p style="margin: 0 0 3px 0; color: #004d26; font-size: 9pt;"><b>📱 Năng lực số (TT 02/2025/TT-BGDĐT):</b> ${r.adjustment.nls.replace(/^\[[^\]]+\]\s*📱 Năng lực số[^:]+:\s*/, '')}</p>` : ''}
        `}
        ${r.isDevicesEnabled ? `<p style="margin: 2px 0 0 0; color: #475569; font-size: 8pt;"><b>📦 Thiết bị & PPDH (TT 32/2018):</b> ${r.adjustment.devices.replace(/^📦 Thiết bị[^:]+:\s*/, '')}</p>` : ''}
      `;
    } else {
      adjustmentHtml = `
        <div style="font-weight: normal; color: #475569; background-color: #f1f5f9; padding: 3px 6px; margin-bottom: 4px; font-size: 8.5pt; border-radius: 3px; font-style: italic;">
          ⚪ Thực hiện dạy học theo chuẩn chương trình SGK (Không điều chỉnh / bổ sung)
        </div>
        <p style="margin: 0; color: #555555; font-size: 8.5pt; line-height: 1.35;">
          ${r.adjustment.devices}
        </p>
      `;
    }

    return `
      <tr style="page-break-inside: avoid;">
        <td style="border: 1px solid #333333; padding: 6px 8px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 10pt;">
          ${r.weekLabel}<br/><span style="font-size: 8.5pt; font-weight: normal; color: #555;">(${r.month})</span>
        </td>
        <td style="border: 1px solid #333333; padding: 6px 8px; vertical-align: middle; font-weight: bold; font-size: 10pt; color: #003366;">
          ${r.theme}
        </td>
        <td style="border: 1px solid #333333; padding: 6px 8px; vertical-align: middle; font-weight: bold; font-size: 10pt;">
          <div style="font-size: 8.5pt; color: #1e40af; margin-bottom: 2px;">${r.unitCode}</div>
          ${r.lessonTitle}
        </td>
        <td style="border: 1px solid #333333; padding: 6px 8px; vertical-align: top; font-size: 9.5pt; line-height: 1.35;">
          ${r.detailedContent}
        </td>
        <td style="border: 1px solid #333333; padding: 6px 8px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 10.5pt; color: #8B0000;">
          ${r.periodLabel}
        </td>
        <td style="border: 1px solid #333333; padding: 6px 8px; vertical-align: top; font-size: 9pt; line-height: 1.3;">
          ${adjustmentHtml}
        </td>
        <td style="border: 1px solid #333333; padding: 6px 8px; vertical-align: middle; font-size: 8.5pt; text-align: center; color: #444;">
          ${r.note}
        </td>
      </tr>
    `;
  }).join('');

  const fullWordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Kế hoạch dạy học môn Tiếng Anh - ${selectedGrade} - CV 2345</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page Section1 {
          size: 29.7cm 21.0cm; /* Landscape A4 */
          margin: 1.5cm 1.5cm 1.5cm 1.5cm;
          mso-page-orientation: landscape;
        }
        div.Section1 { page: Section1; }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.3;
          color: #000000;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        th {
          background-color: #F2F4F7;
          border: 1px solid #333333;
          padding: 8px 6px;
          text-align: center;
          font-size: 9.5pt;
          font-weight: bold;
        }
        td {
          border: 1px solid #333333;
        }
        .header-table td {
          border: none !important;
          padding: 0 4px;
        }
        .signature-table td {
          border: none !important;
          padding: 6px;
          text-align: center;
          vertical-align: top;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        <!-- Header tiêu ngữ hành chính -->
        <table class="header-table" style="width: 100%; margin-bottom: 12px;">
          <tr>
            <td style="width: 45%; text-align: center; vertical-align: top;">
              <span style="font-size: 10.5pt; font-weight: normal; text-transform: uppercase;">PHÒNG GD&ĐT QUẬN / HUYỆN</span><br/>
              <b style="font-size: 11.5pt; text-transform: uppercase;">${schoolName}</b><br/>
              <b style="font-size: 10.5pt; text-transform: uppercase; color: #003366;">${departmentName}</b><br/>
              <span style="display: inline-block; width: 80px; border-bottom: 1px solid #000; margin-top: 2px;"></span>
            </td>
            <td style="width: 55%; text-align: center; vertical-align: top;">
              <b style="font-size: 11pt; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br/>
              <b style="font-size: 11.5pt;">Độc lập - Tự do - Hạnh phúc</b><br/>
              <span style="display: inline-block; width: 120px; border-bottom: 1px solid #000; margin-top: 2px;"></span><br/>
              <i style="font-size: 9.5pt; color: #444;">${cityDate}</i>
            </td>
          </tr>
        </table>

        <!-- Tiêu đề Phụ lục 2 -->
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: #444;">PHỤ LỤC 2</span><br/>
          <span style="font-size: 9.5pt; font-style: italic; color: #333;">(Kèm theo Công văn số 2345/BGDĐT-GDTH ngày 07/6/2021 của Bộ Giáo dục và Đào tạo)</span><br/>
          <b style="font-size: 14.5pt; text-transform: uppercase; color: #002060; display: block; margin-top: 6px;">
            KẾ HOẠCH DẠY HỌC CÁC MÔN HỌC VÀ HOẠT ĐỘNG GIÁO DỤC
          </b>
          <b style="font-size: 12.5pt; text-transform: uppercase; color: #C00000; display: block; margin-top: 2px;">
            MÔN: TIẾNG ANH - KHỐI ${selectedGrade.toUpperCase()}
          </b>
          <p style="font-size: 10.5pt; margin: 4px 0 0 0; font-weight: bold;">
            BỘ SÁCH: GLOBAL SUCCESS – NĂM HỌC: ${academicYear}
          </p>
          <p style="font-size: 9.5pt; margin: 2px 0 0 0; font-style: italic; color: #333;">
            Áp dụng: ${termTitle} • Tổng số: ${rows.length} tiết • Tích hợp: ${countIntegrated} tiết (HĐ 1-2-3: ${countAct123} tiết | HĐ 4-5-6: ${countAct456} tiết | Toàn tiết: ${countActAll} tiết)
          </p>
        </div>

        <!-- Căn cứ pháp lý chi tiết -->
        <div style="background-color: #F8FAFC; border: 1px solid #CBD5E1; padding: 8px 12px; margin-bottom: 14px; font-size: 9pt; line-height: 1.4;">
          <b>* Căn cứ thực hiện kế hoạch:</b><br/>
          • <i>Công văn số 2345/BGDĐT-GDTH</i> ngày 07/6/2021 về việc Hướng dẫn xây dựng kế hoạch giáo dục của nhà trường cấp Tiểu học.<br/>
          • <i>Quyết định số 2422/QĐ-BGDĐT</i> ngày 19/8/2024 của Bộ GD&ĐT Ban hành Khung giáo dục Trí tuệ nhân tạo (AI) cấp Tiểu học.<br/>
          • <i>Thông tư số 02/2025/TT-BGDĐT</i> ngày 24/01/2025 của Bộ GD&ĐT Quy định Khung năng lực số cho người học.<br/>
          • <i>Công văn số 3456/BGDĐT-GDPT</i> về Hướng dẫn thực hiện Chương trình GDPT 2018 môn Tiếng Anh cấp Tiểu học.<br/>
          • <i>Thông tư số 32/2018/TT-BGDĐT</i> ngày 26/12/2018 Ban hành Chương trình Giáo dục phổ thông 2018.
        </div>

        <!-- Bảng kế hoạch dạy học 7 cột chuẩn Phụ lục 2 -->
        <table>
          <thead>
            <tr>
              <th style="width: 70px;">Tuần, tháng</th>
              <th style="width: 130px;">Chủ đề/<br/>Mạch nội dung</th>
              <th style="width: 150px;">Tên bài học</th>
              <th>Nội dung chi tiết<br/><span style="font-size: 8pt; font-weight: normal;">(Hoạt động SGK & Trò chơi vận dụng)</span></th>
              <th style="width: 70px;">Tiết học/<br/>Thời lượng</th>
              <th style="width: 320px;">Nội dung điều chỉnh, bổ sung (nếu có)<br/><span style="font-size: 7.5pt; font-weight: normal;">(Tích hợp AI QĐ 2422, NLS TT 02/2025, ATGT CV 3456, KNS, Thiết bị TT 32)</span></th>
              <th style="width: 90px;">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <!-- Bảng chữ ký phê duyệt 3 bên -->
        <table class="signature-table" style="width: 100%; margin-top: 25px; page-break-inside: avoid;">
          <tr>
            <td style="width: 33%;">
              <b>GIÁO VIÊN LẬP KẾ HOẠCH</b><br/>
              <i style="font-size: 9pt;">(Ký và ghi rõ họ tên)</i><br/><br/><br/><br/>
              <b>${teacherName}</b>
            </td>
            <td style="width: 33%;">
              <b>TỔ TRƯỞNG CHUYÊN MÔN</b><br/>
              <i style="font-size: 9pt;">(Ký và ghi rõ họ tên)</i><br/><br/><br/><br/>
              <b>....................................................</b>
            </td>
            <td style="width: 34%;">
              <b>HIỆU TRƯỞNG PHÊ DUYỆT</b><br/>
              <i style="font-size: 9pt;">(Ký tên và đóng dấu)</i><br/><br/><br/><br/>
              <b>${principalName}</b>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + fullWordHtml], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Ke_Hoach_Day_Hoc_Tieng_Anh_${String(selectedGrade || '').replace(/\s+/g, '_')}_CV2345_${semesterFilter === 'all' ? '35Tuan' : `HK${semesterFilter}`}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ExportPersonalCurriculumOptions {
  subject: string;
  grade: string;
  schoolName?: string;
  teacherName?: string;
  academicYear?: string;
  principalName?: string;
  weeks: Array<{
    week?: number;
    weekNumber?: number;
    month?: string;
    theme?: string;
    unitCode?: string;
    unitTitle?: string;
    periodCount?: number;
    periods: Array<{
      periodNumber: number;
      periodLabel?: string;
      lessonTitle?: string;
      lessonName?: string;
      lessonPart?: string;
      keyFocus?: string;
      suggestedActivity?: string;
      detailedContent?: string;
      learningObjectives?: string;
      integratedCV2345?: {
        digitalCompetence?: string;
        aiLiteracy?: string;
        trafficSafety?: string;
        lifeSkills?: string;
        localEducation?: string;
        stemSteam?: string;
      };
      adjustment?: {
        ai?: string;
        atgt_kns?: string;
        nls?: string;
        devices?: string;
        notes?: string;
      };
      notes?: string;
    }>;
  }>;
  totalPeriods?: number;
}

export function exportCurriculumPlanToWord({
  subject,
  grade,
  schoolName = 'TRƯỜNG TIỂU HỌC CHUẨN QUỐC GIA',
  teacherName = 'Giáo viên Giảng dạy',
  academicYear = '2024 - 2025',
  principalName = 'Ban Giám Hiệu',
  weeks,
  totalPeriods = 140
}: ExportPersonalCurriculumOptions) {
  let rowsHtml = '';

  weeks.forEach((w) => {
    const periodList = w.periods || [];
    const pCount = periodList.length || 1;
    const currentWeekNum = w.weekNumber ?? w.week ?? 1;

    periodList.forEach((p, pIdx) => {
      const isFirstPeriodOfWeek = pIdx === 0;
      const adj = p.adjustment || {};
      const integ = p.integratedCV2345 || {};
      
      const aiText = adj.ai || integ.aiLiteracy || '';
      const nlsText = adj.nls || integ.digitalCompetence || '';
      const atgtKnsText = adj.atgt_kns || [integ.trafficSafety, integ.lifeSkills].filter(Boolean).join('; ') || '';
      const devicesText = adj.devices || '';

      const hasAdj = Boolean(aiText || nlsText || atgtKnsText || devicesText);

      const adjHtml = hasAdj
        ? `
          ${aiText ? `<p style="margin: 0 0 3px 0; color: #002b66; font-size: 8.5pt;"><b>🤖 AI (QĐ 2422/QĐ-BGDĐT):</b> ${aiText}</p>` : ''}
          ${nlsText ? `<p style="margin: 0 0 3px 0; color: #004d26; font-size: 8.5pt;"><b>📱 Năng lực số (TT 02/2025/TT-BGDĐT):</b> ${nlsText}</p>` : ''}
          ${atgtKnsText ? `<p style="margin: 0 0 3px 0; color: #801b00; font-size: 8.5pt;"><b>🚦 ATGT & KNS:</b> ${atgtKnsText}</p>` : ''}
          ${devicesText ? `<p style="margin: 0; color: #333333; font-size: 8.5pt;"><b>📦 Thiết bị & PPDH:</b> ${devicesText}</p>` : ''}
        `
        : `<p style="margin: 0; color: #555555; font-size: 8.5pt; font-style: italic;">Thực hiện theo phân phối chương trình SGK chuẩn.</p>`;

      const lessonTitleText = p.lessonTitle || p.lessonName || p.lessonPart || 'Bài học';
      const detailedContentText = p.detailedContent || p.suggestedActivity || p.keyFocus || p.learningObjectives || 'Thực hiện các hoạt động học tập theo tiến trình bài dạy.';

      rowsHtml += `
        <tr>
          ${isFirstPeriodOfWeek ? `<td rowspan="${pCount}" style="text-align: center; font-weight: bold; background-color: #f8fafc; font-size: 9pt;">Tuần ${currentWeekNum}${w.month ? `<br/><span style="font-size: 8pt; color: #64748b; font-weight: normal;">${w.month}</span>` : ''}</td>` : ''}
          ${isFirstPeriodOfWeek ? `<td rowspan="${pCount}" style="font-size: 8.5pt; font-weight: bold; color: #1e293b;">${w.theme || w.unitTitle || w.unitCode || 'Chủ đề bài học'}</td>` : ''}
          <td style="font-size: 8.5pt; font-weight: bold; color: #1e3a8a;">${lessonTitleText}</td>
          <td style="font-size: 8.5pt; color: #334155; line-height: 1.35;">${detailedContentText}</td>
          <td style="text-align: center; font-size: 8.5pt; font-weight: bold;">${p.periodLabel || `Tiết ${p.periodNumber}`}<br/><span style="font-size: 7.5pt; color: #64748b; font-weight: normal;">(35 phút)</span></td>
          <td style="font-size: 8.5pt; line-height: 1.35;">${adjHtml}</td>
          <td style="font-size: 8pt; color: #64748b;">${p.notes || adj.notes || ''}</td>
        </tr>
      `;
    });
  });

  const fullWordHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Kế Hoạch Dạy Học ${subject} ${grade} - Phụ Lục 2 CV 2345</title>
      <style>
        @page {
          size: A4 landscape;
          margin: 1.5cm 1.5cm 1.5cm 1.5cm;
          mso-page-orientation: landscape;
        }
        body {
          font-family: "Times New Roman", Times, serif;
          font-size: 11pt;
          line-height: 1.3;
          color: #000000;
        }
        .header-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .header-table td {
          vertical-align: top;
          text-align: center;
          padding: 2px 5px;
          border: none;
        }
        .title-block {
          text-align: center;
          margin: 15px 0;
        }
        .main-title {
          font-size: 14pt;
          font-weight: bold;
          text-transform: uppercase;
          color: #000000;
          margin: 4px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #333333;
          padding: 5px 6px;
          vertical-align: top;
        }
        th {
          background-color: #e2e8f0;
          font-size: 9pt;
          font-weight: bold;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div>
        <table class="header-table">
          <tr>
            <td style="width: 45%;">
              <span style="font-size: 10.5pt;">PHÒNG GD&ĐT HUYỆN/QUẬN</span><br/>
              <b>${schoolName.toUpperCase()}</b><br/>
              <span style="font-size: 9pt;">TỔ CHUYÊN MÔN TIỂU HỌC</span><br/>
              <span>---------------------</span>
            </td>
            <td style="width: 55%;">
              <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br/>
              <b>Độc lập - Tự do - Hạnh phúc</b><br/>
              <span>---------------------</span>
            </td>
          </tr>
        </table>

        <div class="title-block">
          <div style="font-size: 11pt; font-weight: bold; color: #475569;">PHỤ LỤC 2</div>
          <div class="main-title">KẾ HOẠCH DẠY HỌC MÔN HỌC ${subject.toUpperCase()} - ${grade.toUpperCase()}</div>
          <div style="font-size: 10.5pt; font-style: italic;">(Kèm theo Công văn số 2345/BGDĐT-GDTH ngày 07 tháng 6 năm 2021 của Bộ Giáo dục và Đào tạo)</div>
          <div style="font-size: 10pt; margin-top: 4px;">Năm học: <b>${academicYear}</b> | Tổng số tiết thực dạy: <b>${totalPeriods} tiết (35 tuần)</b> | Giáo viên: <b>${teacherName}</b></div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 70px;">Tuần, tháng</th>
              <th style="width: 130px;">Chủ đề/<br/>Mạch nội dung</th>
              <th style="width: 150px;">Tên bài học</th>
              <th>Nội dung chi tiết<br/><span style="font-size: 8pt; font-weight: normal;">(Hoạt động SGK & YCCĐ)</span></th>
              <th style="width: 70px;">Tiết học/<br/>Thời lượng</th>
              <th style="width: 320px;">Nội dung điều chỉnh, bổ sung (nếu có)<br/><span style="font-size: 7.5pt; font-weight: normal;">(Tích hợp AI QĐ 2422, NLS TT 02/2025, ATGT CV 3456, KNS, Thiết bị)</span></th>
              <th style="width: 80px;">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <table style="width: 100%; margin-top: 25px; border: none; page-break-inside: avoid;">
          <tr style="border: none;">
            <td style="width: 33%; border: none; text-align: center;">
              <b>GIÁO VIÊN LẬP KẾ HOẠCH</b><br/>
              <i style="font-size: 9pt;">(Ký và ghi rõ họ tên)</i><br/><br/><br/><br/>
              <b>${teacherName}</b>
            </td>
            <td style="width: 33%; border: none; text-align: center;">
              <b>TỔ TRƯỞNG CHUYÊN MÔN</b><br/>
              <i style="font-size: 9pt;">(Ký và ghi rõ họ tên)</i><br/><br/><br/><br/>
              <b>....................................................</b>
            </td>
            <td style="width: 34%; border: none; text-align: center;">
              <b>HIỆU TRƯỞNG PHÊ DUYỆT</b><br/>
              <i style="font-size: 9pt;">(Ký tên và đóng dấu)</i><br/><br/><br/><br/>
              <b>${principalName}</b>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + fullWordHtml], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Ke_Hoach_Day_Hoc_${String(subject || '').replace(/\s+/g, '_')}_${String(grade || '').replace(/\s+/g, '_')}_CV2345.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
