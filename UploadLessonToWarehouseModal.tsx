/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Upload, FileText, CheckCircle2, Sparkles, BookOpen, 
  Trash2, Eye, X, ArrowRight, Layers, Award, AlertCircle,
  FileCheck, Download, RefreshCw, Check, Save, Plus, FolderArchive,
  Calendar, Clock, Tag, ExternalLink, HelpCircle
} from 'lucide-react';
import { 
  ParsedLessonTemplate, 
  SAMPLE_LESSON_PLAN_PRESETS, 
  extractTextFromFile, 
  parseCompleteLessonPlanText 
} from '../utils/lessonTemplateParser';
import { WarehouseLessonPlan, FullLessonPlan, SubjectType } from '../types';
import { ALL_PRIMARY_SUBJECTS } from '../data/personalAppendix2Manager';

interface UploadLessonToWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToWarehouse: (plan: WarehouseLessonPlan) => void;
  onSaveAndOpenEditor?: (plan: WarehouseLessonPlan) => void;
  onImportMultiplePlans?: (plans: WarehouseLessonPlan[]) => void;
  existingPlansCount?: number;
  sounds?: {
    playClick: () => void;
    playCoin: () => void;
    playLevelUp: () => void;
  };
}

export default function UploadLessonToWarehouseModal({
  isOpen,
  onClose,
  onSaveToWarehouse,
  onSaveAndOpenEditor,
  onImportMultiplePlans,
  existingPlansCount = 0,
  sounds
}: UploadLessonToWarehouseModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'presets' | 'backup'>('upload');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [parsedTemplate, setParsedTemplate] = useState<ParsedLessonTemplate | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset_en_global_success');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pasteText, setPasteText] = useState<string>('');

  // Editable Form fields before saving
  const [editTitle, setEditTitle] = useState<string>('');
  const [editSubject, setEditSubject] = useState<string>('Tiếng Anh');
  const [editGrade, setEditGrade] = useState<string>('Lớp 3');
  const [editBookSeries, setEditBookSeries] = useState<string>('Global Success (Bộ GD&ĐT)');
  const [editUnit, setEditUnit] = useState<string>('Unit 1: Hello');
  const [editLesson, setEditLesson] = useState<string>('Lesson 1');
  const [editPeriod, setEditPeriod] = useState<string>('Tiết 1');
  const [editDuration, setEditDuration] = useState<string>('35 phút (1 tiết)');
  const [editSummary, setEditSummary] = useState<string>('');
  const [customTags, setCustomTags] = useState<string>('CV 2345, Chuẩn BGDĐT, Năng lực số');

  // Multi-file batch status
  const [batchPlans, setBatchPlans] = useState<WarehouseLessonPlan[]>([]);
  const [batchStatusMessage, setBatchStatusMessage] = useState<string | null>(null);

  const safeSounds = sounds || {
    playClick: () => {},
    playCoin: () => {},
    playLevelUp: () => {}
  };

  if (!isOpen) return null;

  // Grade options
  const gradeOptions = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'];
  
  // Book series options
  const bookSeriesOptions = [
    'Kết nối tri thức với cuộc sống',
    'Global Success (Bộ GD&ĐT)',
    'Chân trời sáng tạo',
    'Cánh diều',
    'Cùng học để phát triển năng lực',
    'Vì sự bình đẳng và dân chủ trong giáo dục'
  ];

  const updateFieldsFromTemplate = (template: ParsedLessonTemplate, sourceFileName?: string) => {
    setParsedTemplate(template);
    setEditTitle(template.title || sourceFileName?.replace(/\.[^/.]+$/, '') || 'Kế hoạch bài dạy chuẩn hóa');
    setEditSubject(template.subject || 'Tiếng Việt');
    setEditGrade(template.grade || 'Lớp 3');
    setEditBookSeries(template.bookSeries || 'Kết nối tri thức với cuộc sống');
    setEditUnit(template.unit || 'Chủ điểm 1');
    setEditLesson(template.lessonName || 'Bài 1');
    setEditPeriod('Tiết 1');
    setEditDuration(template.duration || '35 phút (1 tiết)');
    
    const isEn = template.subject === 'Tiếng Anh';
    setEditSummary(
      isEn 
        ? `Primary English Lesson Plan strictly aligned with MOET Official Dispatch 2345, Circular 32/2018 & CEFR A1 standards for ${template.grade}.` 
        : `Kế hoạch bài dạy môn ${template.subject} bám sát chuẩn Công văn 2345/BGDĐT-GDTH, tích hợp năng lực số CV 3456 & AI QĐ 2422.`
    );
    setCustomTags(`${template.subject}, ${template.grade}, ${template.bookSeries.split(' ')[0]}, CV 2345`);
  };

  // Handle single or multiple file upload
  const handleFileUpload = async (files: FileList | File[]) => {
    safeSounds.playCoin();
    setIsProcessing(true);
    setBatchStatusMessage(null);

    try {
      const fileArray = Array.from(files);

      // Check if user uploaded a backup JSON file containing array of warehouse plans
      if (fileArray.length === 1 && fileArray[0].name.endsWith('.json')) {
        const text = await fileArray[0].text();
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].fullPlan) {
            // It's a full warehouse backup!
            if (onImportMultiplePlans) {
              onImportMultiplePlans(parsed);
              safeSounds.playLevelUp();
              alert(`🎉 Nhập thành công ${parsed.length} giáo án từ tệp sao lưu JSON vào kho lưu trữ!`);
              onClose();
              return;
            }
          }
        } catch (e) {
          // not array JSON, continue normal parse
        }
      }

      if (fileArray.length === 1) {
        const file = fileArray[0];
        setUploadedFileName(file.name);
        const rawText = await extractTextFromFile(file);
        const template = parseCompleteLessonPlanText(rawText, file.name);
        updateFieldsFromTemplate(template, file.name);
        safeSounds.playLevelUp();
      } else {
        // Multi-file batch parse
        const parsedList: WarehouseLessonPlan[] = [];
        for (let i = 0; i < fileArray.length; i++) {
          const file = fileArray[i];
          try {
            const rawText = await extractTextFromFile(file);
            const template = parseCompleteLessonPlanText(rawText, file.name);
            const isEn = template.subject === 'Tiếng Anh';
            const fp: FullLessonPlan = {
              subject: template.subject,
              grade: template.grade,
              unit: template.unit,
              lesson: template.lessonName,
              period: 'Tiết 1',
              lessonName: template.title,
              topic: template.unit,
              duration: template.duration,
              bookSeries: template.bookSeries,
              language: isEn ? 'en' : 'vi',
              officialReferences: [],
              objectives: {
                knowledgeAndSkills: template.objectives.knowledgeAndSkills,
                coreCompetencies: template.objectives.coreCompetencies,
                personalQualities: template.objectives.personalQualities,
                digitalCompetency: template.objectives.digitalCompetency,
                aiIntegration: template.objectives.aiIntegration,
                trafficSafety: template.objectives.trafficSafety,
                lifeSkills: template.objectives.lifeSkills,
                ethicsAndMoral: template.objectives.ethicsAndMoral
              },
              materials: {
                teacher: template.materials.teacher,
                student: template.materials.student,
                digitalTools: template.materials.digitalTools || ['SmartEdu Interactive Screen']
              },
              activities: template.activities.map(a => ({
                id: a.id || 'act_' + Math.random().toString(36).substring(2, 7),
                name: a.name,
                duration: a.duration,
                teacherActivity: a.teacherActivity,
                studentActivity: a.studentActivity,
                description: a.description || a.teacherActivity,
                digitalTools: a.digitalTools,
                objective: a.objective
              })),
              assessment: {
                methods: template.assessment.methods,
                tools: template.assessment.tools,
                rubrics: template.assessment.rubrics
              },
              createdAt: new Date().toISOString()
            };

            const item: WarehouseLessonPlan = {
              id: 'wh_upload_' + Date.now() + '_' + i,
              title: template.title,
              subject: template.subject,
              grade: template.grade,
              unit: template.unit,
              lesson: template.lessonName,
              period: 'Tiết 1',
              bookSeries: template.bookSeries,
              duration: template.duration,
              summary: isEn 
                ? `Primary English Lesson Plan for ${template.grade} (${template.unit}).` 
                : `Kế hoạch bài dạy môn ${template.subject} lớp ${template.grade} chuẩn CV 2345/BGDĐT.`,
              fullPlan: fp,
              tags: [template.subject, template.grade, 'Tải lên hàng loạt'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isFavorite: false
            };
            parsedList.push(item);
          } catch (e) {
            console.warn('Error parsing batch file:', file.name, e);
          }
        }

        setBatchPlans(parsedList);
        setBatchStatusMessage(`Đã trích xuất thành công ${parsedList.length}/${fileArray.length} tệp giáo án.`);
        if (parsedList.length > 0) {
          updateFieldsFromTemplate(
            parseCompleteLessonPlanText(await extractTextFromFile(fileArray[0]), fileArray[0].name),
            fileArray[0].name
          );
        }
        safeSounds.playLevelUp();
      }
    } catch (err) {
      console.error('Error parsing files:', err);
      alert('Không thể đọc tệp tin. Vui lòng kiểm tra lại định dạng tệp (.docx, .doc, .txt, .json) hoặc dán trực tiếp nội dung!');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleParsePastedText = () => {
    if (!pasteText.trim()) {
      alert('Vui lòng dán nội dung giáo án vào khung văn bản trước!');
      return;
    }
    safeSounds.playCoin();
    setIsProcessing(true);
    setTimeout(() => {
      const template = parseCompleteLessonPlanText(pasteText, 'Giao_an_tu_van_ban.txt');
      updateFieldsFromTemplate(template, 'Văn bản giáo án đã dán');
      setUploadedFileName('Văn bản giáo án dán trực tiếp');
      setIsProcessing(false);
      safeSounds.playLevelUp();
    }, 300);
  };

  const handleSelectPreset = (presetId: string) => {
    safeSounds.playClick();
    setSelectedPresetId(presetId);
    const found = SAMPLE_LESSON_PLAN_PRESETS.find(p => p.id === presetId);
    if (found) {
      updateFieldsFromTemplate(found.template, found.name);
    }
  };

  // Compile final WarehouseLessonPlan
  const buildFinalWarehousePlan = (): WarehouseLessonPlan | null => {
    if (!parsedTemplate) return null;

    const isEn = editSubject === 'Tiếng Anh';
    const tagList = customTags.split(',').map(t => t.trim()).filter(Boolean);

    const fp: FullLessonPlan = {
      subject: editSubject,
      grade: editGrade,
      unit: editUnit,
      lesson: editLesson,
      period: editPeriod,
      lessonName: editTitle,
      topic: editUnit,
      duration: editDuration,
      bookSeries: editBookSeries,
      language: isEn ? 'en' : 'vi',
      officialReferences: [],
      objectives: {
        knowledgeAndSkills: parsedTemplate.objectives.knowledgeAndSkills,
        coreCompetencies: parsedTemplate.objectives.coreCompetencies,
        personalQualities: parsedTemplate.objectives.personalQualities,
        digitalCompetency: parsedTemplate.objectives.digitalCompetency,
        aiIntegration: parsedTemplate.objectives.aiIntegration,
        trafficSafety: parsedTemplate.objectives.trafficSafety,
        lifeSkills: parsedTemplate.objectives.lifeSkills,
        ethicsAndMoral: parsedTemplate.objectives.ethicsAndMoral
      },
      materials: {
        teacher: parsedTemplate.materials.teacher,
        student: parsedTemplate.materials.student,
        digitalTools: parsedTemplate.materials.digitalTools || ['SmartEdu Interactive Screen', 'Audio Player']
      },
      activities: parsedTemplate.activities.map(a => ({
        id: a.id || 'act_' + Math.random().toString(36).substring(2, 7),
        name: a.name,
        duration: a.duration,
        teacherActivity: a.teacherActivity,
        studentActivity: a.studentActivity,
        description: a.description || a.teacherActivity,
        digitalTools: a.digitalTools,
        objective: a.objective
      })),
      assessment: {
        methods: parsedTemplate.assessment.methods,
        tools: parsedTemplate.assessment.tools,
        rubrics: parsedTemplate.assessment.rubrics
      },
      createdAt: new Date().toISOString()
    };

    const finalPlan: WarehouseLessonPlan = {
      id: 'wh_uploaded_' + Date.now(),
      title: editTitle,
      subject: editSubject,
      grade: editGrade,
      unit: editUnit,
      lesson: editLesson,
      period: editPeriod,
      bookSeries: editBookSeries,
      duration: editDuration,
      summary: editSummary || `${editSubject} ${editGrade} - ${editUnit}`,
      fullPlan: fp,
      tags: tagList.length > 0 ? tagList : [editSubject, editGrade, editBookSeries.split(' ')[0]],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false
    };

    return finalPlan;
  };

  // Action: Save to Warehouse directly
  const handleSaveDirectlyToWarehouse = () => {
    if (batchPlans.length > 0) {
      if (onImportMultiplePlans) {
        onImportMultiplePlans(batchPlans);
        safeSounds.playLevelUp();
        alert(`🎉 Đã lưu thành công cả ${batchPlans.length} kế hoạch bài dạy vào Kho Lưu Trữ Chuẩn Hóa!`);
        onClose();
        return;
      }
    }

    const finalPlan = buildFinalWarehousePlan();
    if (!finalPlan) {
      alert('Vui lòng tải lên tệp hoặc dán nội dung giáo án trước khi lưu.');
      return;
    }

    safeSounds.playLevelUp();
    onSaveToWarehouse(finalPlan);
    alert(`🎉 Đã lưu thành công giáo án "${finalPlan.title}" (${finalPlan.subject} ${finalPlan.grade}) vào Kho Lưu Trữ Chuẩn Hóa!`);
    onClose();
  };

  // Action: Save and open Editor
  const handleSaveAndOpen = () => {
    const finalPlan = buildFinalWarehousePlan();
    if (!finalPlan) {
      alert('Vui lòng tải lên tệp hoặc dán nội dung giáo án trước khi lưu.');
      return;
    }

    safeSounds.playLevelUp();
    onSaveToWarehouse(finalPlan);
    if (onSaveAndOpenEditor) {
      onSaveAndOpenEditor(finalPlan);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn text-left">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-indigo-100 max-h-[94vh] flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-fredoka text-lg md:text-xl font-black text-indigo-950 flex items-center gap-2">
                <span>Tải Giáo Án Lên & Lưu Vào Kho Chuẩn Hóa</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Chuẩn CV 2345
                </span>
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Tự động bóc tách từ file Word (.docx, .doc), .txt, .json hoặc dán văn bản để lưu trữ lâu dài trong kho
              </p>
            </div>
          </div>
          <button
            onClick={() => { safeSounds.playClick(); onClose(); }}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 pt-4 pb-2 shrink-0">
          <button
            onClick={() => { safeSounds.playClick(); setActiveTab('upload'); }}
            className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>1. Tải lên tệp Word / JSON / Text</span>
          </button>

          <button
            onClick={() => { safeSounds.playClick(); setActiveTab('paste'); }}
            className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'paste'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Dán nội dung giáo án</span>
          </button>

          <button
            onClick={() => { 
              safeSounds.playClick(); 
              setActiveTab('presets'); 
              if (!parsedTemplate) {
                const def = SAMPLE_LESSON_PLAN_PRESETS[0];
                setSelectedPresetId(def.id);
                updateFieldsFromTemplate(def.template, def.name);
              }
            }}
            className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl font-fredoka font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>3. Chọn từ Kho Mẫu Tiêu Chuẩn</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-4">
          
          {/* TAB 1: FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('warehouse-file-upload-input')?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging ? 'border-emerald-600 bg-emerald-50/70' : 'border-gray-200 hover:border-emerald-400 bg-gray-50/60'
                }`}
              >
                <input
                  id="warehouse-file-upload-input"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".docx,.doc,.txt,.json"
                />
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  {isProcessing ? <RefreshCw className="w-7 h-7 animate-spin text-emerald-600" /> : <FileCheck className="w-7 h-7" />}
                </div>
                <h4 className="font-fredoka font-bold text-sm text-indigo-950">
                  {uploadedFileName ? `📂 Đã nạp: ${uploadedFileName}` : 'Kéo thả 1 hoặc NHIỀU file giáo án vào đây, hoặc click để chọn'}
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">
                  Hỗ trợ định dạng Microsoft Word <strong>.docx, .doc</strong>, văn bản <strong>.txt</strong> và tệp sao lưu kho <strong>.json</strong>
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full">
                  <span>✨ Hỗ trợ tải hàng loạt nhiều tệp giáo án cùng lúc</span>
                </div>
              </div>

              {batchStatusMessage && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-bold flex items-center justify-between">
                  <span>📁 {batchStatusMessage}</span>
                  <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg text-[10px]">
                    {batchPlans.length} kế hoạch
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PASTE TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Dán toàn bộ kế hoạch bài dạy (Yêu cầu cần đạt, Đồ dùng, 4 Hoạt động):</span>
                </span>
                <button
                  onClick={handleParsePastedText}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-fredoka font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bóc tách nội dung ngay ⚡</span>
                </button>
              </div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Dán toàn bộ nội dung giáo án cũ hoặc mẫu của trường (Mục tiêu, Đồ dùng, Hoạt động 1 Khởi động, Hoạt động 2 Khám phá, Hoạt động 3 Luyện tập, Hoạt động 4 Vận dụng)..."
                rows={7}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium leading-relaxed"
              />
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SAMPLE_LESSON_PLAN_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg">
                          {preset.badge}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                      </div>
                      <h4 className="font-fredoka font-bold text-xs text-indigo-950 leading-snug">
                        {preset.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-3">
                        {preset.description}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-gray-100 text-[10px] text-emerald-800 font-bold flex items-center justify-between">
                      <span>{preset.subject} - {preset.grade}</span>
                      <span>{preset.bookSeries.split(' ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* EDITABLE METADATA & PREVIEW FORM */}
          {parsedTemplate && (
            <div className="bg-slate-50 border border-emerald-200 rounded-2xl p-4 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="font-fredoka font-extrabold text-sm text-indigo-950 flex items-center gap-1.5">
                  <FolderArchive className="w-4 h-4 text-emerald-600" />
                  <span>Xem trước & Tùy chỉnh thông tin trước khi Lưu vào Kho:</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {parsedTemplate.activities.length} Hoạt động đã trích xuất
                </span>
              </div>

              {/* Form grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                
                {/* Title */}
                <div className="md:col-span-8 space-y-1">
                  <label className="font-bold text-gray-700 block">Tên bài học / Tiêu đề giáo án *</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="VD: Unit 1: Hello - Lesson 1"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Duration */}
                <div className="md:col-span-4 space-y-1">
                  <label className="font-bold text-gray-700 block">Thời lượng</label>
                  <input
                    type="text"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    placeholder="VD: 35 phút (1 tiết)"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Subject */}
                <div className="md:col-span-4 space-y-1">
                  <label className="font-bold text-gray-700 block">Môn học</label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {ALL_PRIMARY_SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Grade */}
                <div className="md:col-span-4 space-y-1">
                  <label className="font-bold text-gray-700 block">Khối lớp</label>
                  <select
                    value={editGrade}
                    onChange={(e) => setEditGrade(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Book Series */}
                <div className="md:col-span-4 space-y-1">
                  <label className="font-bold text-gray-700 block">Bộ sách</label>
                  <select
                    value={editBookSeries}
                    onChange={(e) => setEditBookSeries(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {bookSeriesOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Unit */}
                <div className="md:col-span-6 space-y-1">
                  <label className="font-bold text-gray-700 block">Chủ điểm / Unit</label>
                  <input
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    placeholder="VD: Unit 1: Hello / Chủ điểm 1"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Lesson / Period */}
                <div className="md:col-span-6 space-y-1">
                  <label className="font-bold text-gray-700 block">Tiết dạy / Phần bài</label>
                  <input
                    type="text"
                    value={editLesson}
                    onChange={(e) => setEditLesson(e.target.value)}
                    placeholder="VD: Lesson 1 (Tiết 1) / Bài 1"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-12 space-y-1">
                  <label className="font-bold text-gray-700 block">Thẻ tìm kiếm (cách nhau bởi dấu phẩy)</label>
                  <input
                    type="text"
                    value={customTags}
                    onChange={(e) => setCustomTags(e.target.value)}
                    placeholder="VD: Tiếng Anh, Lớp 3, Global Success, CV 2345, Năng lực số"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Quick extracted summary card */}
              <div className="bg-white rounded-xl p-3 border border-gray-200 space-y-2 text-[11px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-bold text-indigo-950 block">I. Yêu cầu cần đạt trích xuất:</span>
                    <ul className="list-disc list-inside text-gray-600 space-y-0.5 pl-1">
                      <li>Đặc thù: {parsedTemplate.objectives.knowledgeAndSkills[0]?.slice(0, 80)}...</li>
                      <li>Chung: {parsedTemplate.objectives.coreCompetencies[0]?.slice(0, 80)}...</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-indigo-950 block">III. Tiến trình 4 Hoạt động:</span>
                    <ul className="list-decimal list-inside text-gray-600 space-y-0.5 pl-1">
                      {parsedTemplate.activities.slice(0, 4).map((a, i) => (
                        <li key={i} className="truncate">
                          <strong>{a.name}</strong> ({a.duration})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
            <span>Kho hiện tại có <strong>{existingPlansCount}</strong> giáo án</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { safeSounds.playClick(); onClose(); }}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>

            {onSaveAndOpenEditor && (
              <button
                onClick={handleSaveAndOpen}
                disabled={!parsedTemplate}
                className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-fredoka font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                <span>Lưu & Mở Soạn Thảo ✏️</span>
              </button>
            )}

            <button
              onClick={handleSaveDirectlyToWarehouse}
              disabled={!parsedTemplate && batchPlans.length === 0}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-fredoka font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              <Save className="w-4 h-4 text-emerald-200" />
              <span>
                {batchPlans.length > 1 
                  ? `Lưu ${batchPlans.length} Giáo Án Vào Kho 💾` 
                  : 'Lưu Trực Tiếp Vào Kho Giáo Án 💾'}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
