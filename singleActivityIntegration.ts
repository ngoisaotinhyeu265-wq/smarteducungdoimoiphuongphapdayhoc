/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Single Activity Integration Utility
 * Đảm bảo tích hợp chuẩn CV 2345, CV 3456, QĐ 2422 và Phụ lục 2:
 * KHỚP NỐI VÀO ĐÚNG 1 HOẠT ĐỘNG PHÙ HỢP DUY NHẤT CHO MỖI KHBD (A/B/C/D/E)
 * Không bị trùng lặp hay tích hợp dàn trải vào nhiều hoạt động.
 */

import { FullLessonPlan, LessonPlan } from '../types';

export type ActivityCode = 'A' | 'B' | 'C' | 'D' | 'E';

export interface IntegrationPayload {
  targetActivityCode: ActivityCode;
  digitalCompetence?: string; // CV 3456
  aiLiteracy?: string;        // QĐ 2422
  trafficSafety?: string;     // CV 3456
  lifeSkills?: string;
  equipment?: string;
  notes?: string;
}

/**
 * Maps activity index to standard pedagogical code (A: Khởi động, B: Khám phá, C: Luyện tập, D: Vận dụng, E: Củng cố)
 */
export function getActivityCode(index: number): ActivityCode {
  const codes: ActivityCode[] = ['A', 'B', 'C', 'D', 'E'];
  return codes[index] || 'B';
}

/**
 * Determines which activity is the single integration target.
 * Defaults to Activity B (Khám phá - Exploration/Presentation) or C (Luyện tập - Practice)
 * unless explicitly marked.
 */
export function getSingleIntegrationTargetIndex(activities: any[]): number {
  if (!activities || activities.length === 0) return 0;

  // 1. Check if an activity is explicitly marked as single integration target
  const markedIdx = activities.findIndex(a => a.isSingleIntegrationTarget === true || a.isIntegrationTarget === true);
  if (markedIdx !== -1) return markedIdx;

  // 2. Check if an activity has specific integration markers
  const withCompIdx = activities.findIndex(a => 
    a.digitalCompetency || 
    (a.name && (a.name.includes('[NLS]') || a.name.includes('[AI]') || a.name.includes('[Tích hợp]')))
  );
  if (withCompIdx !== -1) return withCompIdx;

  // 3. Standard default per CV 2345 & CV 3456:
  // Activity index 1 is Hoạt động B (Hình thành kiến thức / Khám phá)
  // or index 2 is Hoạt động C (Luyện tập thực hành)
  if (activities.length >= 2) {
    return 1; // Hoạt động B (Khám phá)
  }
  return 0;
}

/**
 * Extracts integration info for the current lesson from full plan or period data
 */
export function extractIntegrationInfo(
  fullPlan?: FullLessonPlan | null, 
  lessonPlan?: LessonPlan | null,
  periodData?: any
): IntegrationPayload {
  // Check period integratedCV2345
  const periodIntegration = periodData?.integratedCV2345 || {};
  
  const digital = 
    periodIntegration.digitalCompetence || 
    fullPlan?.objectives?.digitalCompetency?.[0] || 
    'Ứng dụng học liệu số hoclieu.vn, thiết bị tương tác và video bài giảng (CV 3456).';

  const ai = 
    periodIntegration.aiLiteracy || 
    (fullPlan as any)?.aiLiteracy || 
    'Luyện phát âm chuẩn ngữ điệu bản ngữ qua AI Audio & Nhận biết AI an toàn (QĐ 2422/BGDĐT).';

  const atgt = 
    periodIntegration.trafficSafety || 
    fullPlan?.objectives?.trafficSafety?.[0] || 
    'Ý thức quan sát an toàn giao thông khi đi bộ đến trường cùng người thân.';

  const kns = 
    periodIntegration.lifeSkills || 
    fullPlan?.objectives?.lifeSkills?.[0] || 
    'Kỹ năng hợp tác nhóm đôi, lắng nghe tôn trọng bạn bè và giao tiếp lịch sự.';

  const equipment = 
    periodData?.materials || 
    fullPlan?.materials?.digitalTools?.[0] || 
    'Màn hình trình chiếu/Ti vi tương tác, Máy tính kết nối Internet, Thẻ flashcard từ vựng, Audio MP3 chuẩn.';

  const targetCode = (periodData?.singleIntegrationActivity as ActivityCode) || 'B';

  return {
    targetActivityCode: targetCode,
    digitalCompetence: digital,
    aiLiteracy: ai,
    trafficSafety: atgt,
    lifeSkills: kns,
    equipment: equipment
  };
}

/**
 * Enforces strict single-activity integration across the whole plan:
 * ONLY the specified activity holds the integration. All other activities are purified.
 */
export function enforceSingleActivityIntegration(
  activities: any[], 
  targetIndex: number, 
  integrationInfo: IntegrationPayload
): any[] {
  if (!activities || activities.length === 0) return [];

  const validTargetIdx = Math.max(0, Math.min(activities.length - 1, targetIndex));

  return activities.map((act, idx) => {
    const isTarget = idx === validTargetIdx;
    const cleanName = (act.name || '').replace(/\s*\[Tích hợp[^\]]*\]/gi, '').replace(/\s*\[NLS[^\]]*\]/gi, '').replace(/\s*\[AI[^\]]*\]/gi, '').trim();

    if (isTarget) {
      return {
        ...act,
        name: cleanName,
        isSingleIntegrationTarget: true,
        activityCode: getActivityCode(idx),
        integrationPayload: integrationInfo,
        digitalCompetency: {
          code: 'CV3456-QD2422',
          title: 'Tích hợp Năng lực số (CV 3456) & Ứng dụng AI (QĐ 2422)',
          description: `${integrationInfo.digitalCompetence} | ${integrationInfo.aiLiteracy}`,
          digitalToolsUsed: [integrationInfo.equipment || 'Thiết bị số dạy học'],
          aiToolsUsed: ['AI Pronunciation Checker / Audio Trợ lý số'],
          safetyNotes: 'Bảo vệ thông tin cá nhân và thời lượng tiếp xúc màn hình hợp lý.'
        }
      };
    } else {
      // Remove any duplicate integration tags or objects from other activities
      const purified = { ...act };
      delete purified.isSingleIntegrationTarget;
      delete purified.integrationPayload;
      delete purified.digitalCompetency;
      delete purified.steamInfo;
      purified.name = cleanName;
      purified.isSingleIntegrationTarget = false;
      purified.activityCode = getActivityCode(idx);
      return purified;
    }
  });
}

/**
 * HTML block for Word Export (.doc) rendered ONLY inside the single target activity row.
 */
export function generateWordHtmlSingleIntegrationBox(info: IntegrationPayload, activityName: string): string {
  return `
  <div style="margin-top: 8pt; margin-bottom: 4pt; padding: 6pt 10pt; background-color: #f0f7ff; border: 1.5pt solid #2563eb; border-left: 5pt solid #1d4ed8; border-radius: 4pt; font-family: 'Times New Roman', serif;">
    <p style="margin: 0 0 4pt 0; font-size: 11pt; font-weight: bold; color: #1e3a8a; text-transform: uppercase;">
      🎯 ĐỊA CHỈ TÍCH HỢP MỤC TIÊU DUY NHẤT (CHUẨN CV 2345, CV 3456, QĐ 2422 & PHỤ LỤC 2):
    </p>
    <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt; color: #1e293b;">
      <tr>
        <td style="width: 28%; font-weight: bold; padding: 2pt 0; color: #0369a1;">• Năng lực số (CV 3456):</td>
        <td style="padding: 2pt 0;">${info.digitalCompetence || 'Khai thác kho học liệu số, màn hình tương tác và bài tập trực tuyến.'}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 2pt 0; color: #6d28d9;">• Khung GD AI (QĐ 2422):</td>
        <td style="padding: 2pt 0;">${info.aiLiteracy || 'Luyện phát âm ngữ điệu chuẩn bản ngữ qua AI Audio & Nhận biết AI an toàn.'}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 2pt 0; color: #b45309;">• ATGT & Kỹ năng sống:</td>
        <td style="padding: 2pt 0;">${info.trafficSafety || ''} - ${info.lifeSkills || 'Kỹ năng hợp tác tích cực.'}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 2pt 0; color: #047857;">• Thiết bị & Học liệu số:</td>
        <td style="padding: 2pt 0;">${info.equipment || 'Màn hình tương tác, bài giảng điện tử, audio chuẩn taphuan.nxbgd.vn'}</td>
      </tr>
    </table>
    <p style="margin: 4pt 0 0 0; font-size: 9.5pt; font-style: italic; color: #475569;">
      * Lưu ý: Tích hợp đúng chuẩn 1 hoạt động duy nhất cho toàn bài dạy, không tích hợp dàn trải sang các hoạt động khác.
    </p>
  </div>`;
}
