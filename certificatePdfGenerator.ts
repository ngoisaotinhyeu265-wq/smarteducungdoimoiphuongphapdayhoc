/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface CertificateData {
  teacherName: string;
  schoolName: string;
  certCode: string;
  issueDate: string;
  title?: string;
  subtitle?: string;
  reason?: string;
  signerTitle?: string;
  signerName?: string;
}

/**
 * Generates the official verification URL for the certificate, using the real application origin.
 */
export function getCertificateVerifyUrl(data: CertificateData): string {
  let baseUrl = '';
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    baseUrl = window.location.origin;
  }
  if (!baseUrl || baseUrl === 'null') {
    baseUrl = 'https://smartedu.edu.vn';
  }

  const params = new URLSearchParams();
  params.set('verify', 'true');
  params.set('code', data.certCode || 'SMARTEDU-GVST-2026-882391');
  params.set('name', data.teacherName || 'Cô Giáo Thanh Nguyễn');
  params.set('school', data.schoolName || 'Trường Tiểu Học & Hệ Thống Đổi Mới SmartEdu');
  params.set('date', data.issueDate || new Date().toLocaleDateString('vi-VN'));
  if (data.title) params.set('title', data.title);

  return `${baseUrl}/?${params.toString()}`;
}

/**
 * Normalizes Vietnamese text using Canonical Composition (NFC) so diacritics
 * (dấu huyền, sắc, hỏi, ngã, nặng, mũ, móc) do not separate or break in canvas rendering.
 */
function cleanText(text: string | undefined | null): string {
  if (!text) return '';
  return text.normalize('NFC').trim();
}

/**
 * Generates a high-resolution canvas representing the official A4 Certificate.
 * Uses 2480 x 1754 (A4 Landscape 300 DPI) for razor-sharp typography and Vietnamese Unicode accents.
 */
export function drawCertificateToCanvas(
  data: CertificateData, 
  qrImageElement?: HTMLImageElement | null
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const width = 2480;
  const height = 1754;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return canvas;

  // Enhance crispness and font quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const tName = cleanText(data.teacherName) || 'Cô Giáo Thanh Nguyễn';
  const sName = cleanText(data.schoolName) || 'Trường Tiểu Học & Hệ Thống Đổi Mới SmartEdu';
  const cCode = cleanText(data.certCode) || 'SMARTEDU-GVST-2026-882391';
  const iDate = cleanText(data.issueDate) || new Date().toLocaleDateString('vi-VN');
  const cTitle = cleanText(data.title) || 'GIÁO VIÊN SÁNG TẠO TIÊU BIỂU';
  const cSubtitle = cleanText(data.subtitle) || 'DANH HIỆU VINH DANH ĐỔI MỚI PHƯƠNG PHÁP DẠY HỌC & ỨNG DỤNG CÔNG NGHỆ SỐ';
  const cReason = cleanText(data.reason) || 
    'Đã có thành tích xuất sắc trong công tác Đổi mới Phương pháp Giảng dạy, Tích cực Soạn Kế hoạch Bài dạy Chuẩn Công văn 2345, Ứng dụng Trí tuệ Nhân tạo AI và Tạo dựng Môi trường Học tập Sinh động cho Học sinh.';
  const sTitle = cleanText(data.signerTitle) || 'HỘI ĐỒNG THẨM ĐỊNH SƯ PHẠM';
  const sNameSign = cleanText(data.signerName) || 'Cô Giáo Thanh Nguyễn & SmartEdu Board';

  // 1. Background Fill: Warm parchment / ivory gradient
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 120, width / 2, height / 2, width / 1.1);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.45, '#FAF8F0');
  bgGrad.addColorStop(0.85, '#F5EED8');
  bgGrad.addColorStop(1, '#EDE3C4');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Watermark & Background Rosette Geometry
  ctx.save();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.07)';
  ctx.lineWidth = 1.5;
  const centerX = width / 2;
  const centerY = height / 2;
  for (let i = 0; i < 36; i++) {
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 750, 340, (i * Math.PI) / 18, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Watermark text in center
  ctx.save();
  ctx.font = 'bold 110px "Times New Roman", "DejaVu Serif", "Georgia", serif';
  ctx.fillStyle = 'rgba(212, 160, 23, 0.035)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SMARTEDU EXCELLENCE 2026', centerX, centerY - 30);
  ctx.restore();

  // 3. Ornate Double Gold & Navy Border
  // Outer Navy Border
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#1E1B4B'; // Indigo / Navy 950
  ctx.strokeRect(44, 44, width - 88, height - 88);

  // Outer Gold Border
  ctx.lineWidth = 22;
  const goldGrad = ctx.createLinearGradient(0, 0, width, height);
  goldGrad.addColorStop(0, '#D4AF37');
  goldGrad.addColorStop(0.25, '#FFDF73');
  goldGrad.addColorStop(0.5, '#AA7C11');
  goldGrad.addColorStop(0.75, '#FFDF73');
  goldGrad.addColorStop(1, '#B8860B');
  ctx.strokeStyle = goldGrad;
  ctx.strokeRect(66, 66, width - 132, height - 132);

  // Inner Thin Gold Line
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#996515';
  ctx.strokeRect(94, 94, width - 188, height - 188);

  // Inner Dotted Accent Line
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#D4AF37';
  ctx.strokeRect(110, 110, width - 220, height - 220);
  ctx.restore();

  // 4. Corner Ornaments & Baroque Filigrees
  const drawCornerFlourish = (cx: number, cy: number, flipX: boolean, flipY: boolean) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.strokeStyle = '#C59B27';
    ctx.fillStyle = '#D4AF37';
    ctx.lineWidth = 3;

    // Corner bracket curve
    ctx.beginPath();
    ctx.moveTo(10, 75);
    ctx.quadraticCurveTo(10, 10, 75, 10);
    ctx.stroke();

    // Corner decorative rosettes
    ctx.beginPath();
    ctx.arc(26, 26, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(48, 20, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(20, 48, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  drawCornerFlourish(125, 125, false, false);
  drawCornerFlourish(width - 125, 125, true, false);
  drawCornerFlourish(125, height - 125, false, true);
  drawCornerFlourish(width - 125, height - 125, true, true);

  // 5. Header: Platform header banner
  ctx.textAlign = 'center';
  
  ctx.font = 'bold 28px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#312E81';
  ctx.fillText('HỆ THỐNG CÔNG NGHỆ GIÁO DỤC THÔNG MINH SMARTEDU VIỆT NAM', centerX, 185);

  ctx.font = 'italic bold 23px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#B45309';
  ctx.fillText('★ Sáng Tạo Không Ngừng • Nâng Tầm Trí Tuệ Thế Hệ Trẻ ★', centerX, 226);

  // Decorative divider below header
  ctx.beginPath();
  ctx.moveTo(centerX - 380, 252);
  ctx.lineTo(centerX + 380, 252);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Star at divider center
  ctx.fillStyle = '#D4AF37';
  ctx.beginPath();
  ctx.arc(centerX, 252, 6, 0, Math.PI * 2);
  ctx.fill();

  // 6. Certificate Title
  ctx.font = 'bold 38px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#9A3412'; // Warm rust red
  ctx.fillText('GIẤY CHỨNG NHẬN VINH DANH', centerX, 335);

  // Main Large Title: GIÁO VIÊN SÁNG TẠO TIÊU BIỂU
  ctx.save();
  ctx.font = '900 70px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#1E1B4B';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.45)';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 4;
  ctx.fillText(cTitle, centerX, 430);
  ctx.restore();

  // Subtitle
  ctx.font = 'bold 24px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText(cSubtitle, centerX, 485);

  // 7. Recipient Introduction
  ctx.font = 'italic 28px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#374151';
  ctx.fillText('Trân trọng chứng nhận và tuyên dương:', centerX, 565);

  // Teacher Name (Highlighted in Deep Royal Blue & Gold underline)
  ctx.save();
  ctx.font = 'bold 74px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#1E3A8A'; // Deep Royal Blue
  ctx.fillText(tName, centerX, 665);

  // Gold ornate underline for recipient name
  const nameWidth = Math.min(ctx.measureText(tName).width + 90, 1600);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - nameWidth / 2, 696);
  ctx.lineTo(centerX + nameWidth / 2, 696);
  ctx.stroke();

  // Small diamond accent on underline
  ctx.fillStyle = '#B45309';
  ctx.fillRect(centerX - 9, 692, 18, 8);
  ctx.restore();

  // School / Unit affiliation
  ctx.font = 'bold 30px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#4338CA';
  ctx.fillText(`Đơn vị: ${sName}`, centerX, 755);

  // 8. Citation / Reason text (Multi-line wrap with generous line height)
  ctx.font = '26px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#1F2937';
  
  const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
    return curY;
  };

  wrapText(cReason, centerX, 845, 1750, 46);

  // 9. Golden Medal / Seal Emblem (Left bottom area)
  const sealX = 410;
  const sealY = 1290;

  // Ribbon tails
  ctx.save();
  ctx.fillStyle = '#991B1B'; // Crimson ribbon
  // Left ribbon
  ctx.beginPath();
  ctx.moveTo(sealX - 35, sealY + 40);
  ctx.lineTo(sealX - 85, sealY + 185);
  ctx.lineTo(sealX - 45, sealY + 165);
  ctx.lineTo(sealX - 10, sealY + 185);
  ctx.lineTo(sealX - 10, sealY + 40);
  ctx.fill();

  // Right ribbon
  ctx.beginPath();
  ctx.moveTo(sealX + 35, sealY + 40);
  ctx.lineTo(sealX + 85, sealY + 185);
  ctx.lineTo(sealX + 45, sealY + 165);
  ctx.lineTo(sealX + 10, sealY + 185);
  ctx.lineTo(sealX + 10, sealY + 40);
  ctx.fill();

  // Outer Gold Seal with scalloped rosettes
  ctx.fillStyle = '#D4AF37';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 6;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 110, 0, Math.PI * 2);
  ctx.fill();

  // Inner Gold circle
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  const sealGrad = ctx.createRadialGradient(sealX - 30, sealY - 30, 10, sealX, sealY, 100);
  sealGrad.addColorStop(0, '#FFF3A8');
  sealGrad.addColorStop(0.5, '#F59E0B');
  sealGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 95, 0, Math.PI * 2);
  ctx.fill();

  // Seal inner star border
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(sealX, sealY, 82, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Seal Text
  ctx.font = 'bold 16px "Arial", sans-serif';
  ctx.fillStyle = '#451A03';
  ctx.textAlign = 'center';
  ctx.fillText('★ GIÁO VIÊN TIÊU BIỂU ★', sealX, sealY - 42);
  
  ctx.font = 'bold 36px "Times New Roman", serif';
  ctx.fillStyle = '#78350F';
  ctx.fillText('🏆', sealX, sealY - 2);

  ctx.font = '900 20px "Arial", sans-serif';
  ctx.fillStyle = '#451A03';
  ctx.fillText('XUẤT SẮC 2026', sealX, sealY + 36);

  ctx.font = 'bold 14px "Arial", sans-serif';
  ctx.fillStyle = '#78350F';
  ctx.fillText('SMARTEDU PRO', sealX, sealY + 58);
  ctx.restore();

  // 10. QR Code Verification Card (Center Bottom Area)
  const qrBoxX = centerX - 130;
  const qrBoxY = 1160;
  const qrBoxW = 260;
  const qrBoxH = 300;

  // Background white card for QR Code
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  
  // Rounded rectangle for QR Card
  const radius = 16;
  ctx.beginPath();
  ctx.moveTo(qrBoxX + radius, qrBoxY);
  ctx.lineTo(qrBoxX + qrBoxW - radius, qrBoxY);
  ctx.quadraticCurveTo(qrBoxX + qrBoxW, qrBoxY, qrBoxX + qrBoxW, qrBoxY + radius);
  ctx.lineTo(qrBoxX + qrBoxW, qrBoxY + qrBoxH - radius);
  ctx.quadraticCurveTo(qrBoxX + qrBoxW, qrBoxY + qrBoxH, qrBoxX + qrBoxW - radius, qrBoxY + qrBoxH);
  ctx.lineTo(qrBoxX + radius, qrBoxY + qrBoxH);
  ctx.quadraticCurveTo(qrBoxX, qrBoxY + qrBoxH, qrBoxX, qrBoxY + qrBoxH - radius);
  ctx.lineTo(qrBoxX, qrBoxY + radius);
  ctx.quadraticCurveTo(qrBoxX, qrBoxY, qrBoxX + radius, qrBoxY);
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw QR code
  const qrDrawSize = 176;
  const qrDrawX = qrBoxX + (qrBoxW - qrDrawSize) / 2;
  const qrDrawY = qrBoxY + 16;

  if (qrImageElement && qrImageElement.complete && qrImageElement.naturalWidth > 0) {
    // If pre-rendered QR image exists, draw directly
    ctx.drawImage(qrImageElement, qrDrawX, qrDrawY, qrDrawSize, qrDrawSize);
  } else {
    // Synchronous fallback matrix QR generation using real verification URL
    try {
      const verifyUrl = getCertificateVerifyUrl(data);
      const qr = QRCode.create(verifyUrl, { errorCorrectionLevel: 'M' });
      const modules = qr.modules;
      const modCount = modules.size || (modules as any).length || 29;
      const modSize = qrDrawSize / modCount;

      ctx.fillStyle = '#0F172A'; // Dark slate for sharp scannability
      for (let r = 0; r < modCount; r++) {
        for (let c = 0; c < modCount; c++) {
          const isDark = typeof modules.get === 'function' ? modules.get(r, c) : (modules as any).data?.[r * modCount + c];
          if (isDark) {
            ctx.fillRect(
              Math.floor(qrDrawX + c * modSize),
              Math.floor(qrDrawY + r * modSize),
              Math.ceil(modSize) + 0.5,
              Math.ceil(modSize) + 0.5
            );
          }
        }
      }
    } catch (err) {
      console.warn('Sync QR render fallback:', err);
    }
  }

  // QR Header / Footnotes inside card
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px "Arial", sans-serif';
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('QUÉT MÃ QR XÁC THỰC', centerX, qrBoxY + 212);

  ctx.font = 'bold 12px "Courier New", monospace';
  ctx.fillStyle = '#B45309';
  ctx.fillText(cCode, centerX, qrBoxY + 232);

  ctx.font = 'italic 11px "Arial", sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('SmartEdu Official Verification', centerX, qrBoxY + 252);

  // Security Verified Shield pill
  ctx.fillStyle = '#ECFDF5';
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (typeof (ctx as any).roundRect === 'function') {
    (ctx as any).roundRect(centerX - 85, qrBoxY + 264, 170, 22, 6);
  } else {
    ctx.rect(centerX - 85, qrBoxY + 264, 170, 22);
  }
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 11px "Arial", sans-serif';
  ctx.fillStyle = '#065F46';
  ctx.fillText('✓ CHÍNH HÃNG XÁC THỰC', centerX, qrBoxY + 279);
  ctx.restore();

  // 11. Signatures & Official Red Stamp Section (Right Area)
  const sigX = width - 440;
  const sigY = 1110;

  // Date
  ctx.textAlign = 'center';
  ctx.font = 'italic 24px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#374151';
  ctx.fillText(`Ngày cấp: ${iDate}`, sigX, sigY);

  // Signer Title
  ctx.font = 'bold 24px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#1F2937';
  ctx.fillText(sTitle, sigX, sigY + 40);
  
  ctx.font = 'italic 20px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText('(Ký tên & Đóng dấu điện tử)', sigX, sigY + 72);

  // Calligraphy signature representation
  ctx.save();
  ctx.font = 'italic bold 44px "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive, serif';
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('Thanh Nguyen', sigX - 10, sigY + 145);
  ctx.restore();

  // Signer Name
  ctx.font = 'bold 24px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#1E1B4B';
  ctx.fillText(sNameSign, sigX, sigY + 265);

  // Official Red Stamp Seal (Right Center over signature)
  const stampX = sigX - 25;
  const stampY = sigY + 160;

  ctx.save();
  ctx.translate(stampX, stampY);
  ctx.rotate(-0.06); // Natural slight slant

  // Red circle stamp
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.88)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 85, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 75, 0, Math.PI * 2);
  ctx.stroke();

  // Stamp text
  ctx.fillStyle = 'rgba(220, 38, 38, 0.92)';
  ctx.font = 'bold 13px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HỆ THỐNG SMARTEDU', 0, -45);
  ctx.fillText('CHỨNG NHẬN', 0, -26);

  ctx.font = 'bold 26px "Times New Roman", serif';
  ctx.fillText('★ ★ ★', 0, 5);

  ctx.font = 'bold 13px "Arial", sans-serif';
  ctx.fillText('ĐÃ XÁC THỰC', 0, 34);
  ctx.fillText('CHÍNH THỨC 2026', 0, 52);
  ctx.restore();

  // 12. Security Code & Footer Note
  const footerY = height - 125;
  
  // Unique Security Code Badge (Left Footer)
  ctx.textAlign = 'left';
  ctx.font = 'bold 22px "Courier New", monospace';
  ctx.fillStyle = '#1E1B4B';
  ctx.fillText(`MÃ CHỨNG NHẬN: ${cCode}`, 145, footerY);

  ctx.font = '16px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('Tra cứu & xác thực tính hợp lệ trực tiếp tại: smartedu.edu.vn/verify', 145, footerY + 26);

  // Right Footer Note
  ctx.textAlign = 'right';
  ctx.font = 'italic 18px "Times New Roman", "Georgia", serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText('Chứng nhận giá trị sư phạm vinh danh đổi mới giáo dục tiểu học', width - 145, footerY);

  ctx.font = 'bold 16px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#9CA3AF';
  ctx.fillText('Bản quyền cấp bởi Nền tảng Sư phạm AI SmartEdu', width - 145, footerY + 24);

  return canvas;
}

/**
 * Generates the certificate canvas asynchronously with guaranteed high-contrast QR code image.
 */
export async function drawCertificateToCanvasAsync(data: CertificateData): Promise<HTMLCanvasElement> {
  const verifyUrl = getCertificateVerifyUrl(data);
  
  let qrImg: HTMLImageElement | null = null;
  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 360,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    });
    
    qrImg = new Image();
    qrImg.src = qrDataUrl;
    await new Promise<void>((resolve) => {
      if (!qrImg) return resolve();
      qrImg.onload = () => resolve();
      qrImg.onerror = () => resolve();
    });
  } catch (err) {
    console.error('Error generating async QR data URL:', err);
  }

  // Ensure fonts are loaded if available
  if (typeof document !== 'undefined' && (document as any).fonts?.ready) {
    try {
      await (document as any).fonts.ready;
    } catch {
      // ignore
    }
  }

  return drawCertificateToCanvas(data, qrImg);
}

/**
 * Exports the Certificate to PDF using jsPDF (A4 Landscape, 297mm x 210mm).
 * Uses uncompressed PNG embedding so text and QR code stay ultra-sharp without artifacting.
 */
export async function exportCertificateToPdf(data: CertificateData): Promise<void> {
  const canvas = await drawCertificateToCanvasAsync(data);
  const imgData = canvas.toDataURL('image/png', 1.0);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: false
  });

  // A4 dimensions in mm: 297 x 210
  pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'NONE');
  
  const cleanName = cleanText(data.teacherName).replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_') || 'Giao_Vien';
  const filename = `Giay_Chung_Nhan_Giao_Vien_Sang_Tao_${cleanName}_${data.certCode}.pdf`;
  
  pdf.save(filename);
}

/**
 * Downloads the high-resolution Certificate Image (PNG 4K, 2480x1754).
 */
export async function exportCertificateToPng(data: CertificateData): Promise<void> {
  const canvas = await drawCertificateToCanvasAsync(data);
  const imgData = canvas.toDataURL('image/png', 1.0);
  
  const link = document.createElement('a');
  const cleanName = cleanText(data.teacherName).replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_') || 'Giao_Vien';
  link.download = `Giay_Chung_Nhan_Giao_Vien_Sang_Tao_${cleanName}_${data.certCode}.png`;
  link.href = imgData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Opens a print dialog formatted for A4 Landscape.
 */
export async function printCertificate(data: CertificateData): Promise<void> {
  const canvas = await drawCertificateToCanvasAsync(data);
  const imgData = canvas.toDataURL('image/png', 1.0);

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Trình duyệt đang chặn popup. Vui lòng cho phép mở popup để in giấy chứng nhận!');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>In Giấy Chứng Nhận - ${cleanText(data.teacherName)}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
          }
          img {
            width: 100vw;
            height: 100vh;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${imgData}" onload="window.print();window.close();" />
      </body>
    </html>
  `);
  printWindow.document.close();
}
