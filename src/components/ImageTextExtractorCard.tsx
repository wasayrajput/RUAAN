'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Copy, 
  Check, 
  Trash2, 
  Download, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  ImageIcon, 
  Phone, 
  ClipboardCopy,
  Zap
} from 'lucide-react';

interface ImageTextExtractorCardProps {
  showToast?: (msg: string) => void;
}

export const ImageTextExtractorCard: React.FC<ImageTextExtractorCardProps> = ({ showToast }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+V paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageSrc(result);
      runOcr(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const runOcr = async (src: string) => {
    setIsScanning(true);
    setProgress(15);
    setStatusMessage('Loading OCR engine...');
    setExtractedText('');

    try {
      // 1. Dynamically load Tesseract.js from CDN if not already loaded
      if (!(window as any).Tesseract) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Could not load OCR engine. Please check internet connection.'));
          document.head.appendChild(script);
        });
      }

      const Tesseract = (window as any).Tesseract;
      setProgress(35);
      setStatusMessage('Analyzing & recognizing text in image...');

      const worker = await Tesseract.createWorker('eng', 1, {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            const p = Math.round((m.progress || 0) * 100);
            setProgress(Math.max(35, p));
            setStatusMessage(`Reading text... ${p}%`);
          }
        },
      });

      const ret = await worker.recognize(src);
      await worker.terminate();

      const text = ret.data.text ? ret.data.text.trim() : '';
      if (!text) {
        setExtractedText('Tasveer mein koi text detect nahi hua. Baraye meherbani saaf ya high-resolution tasveer upload karein.');
        setStatusMessage('Complete: No text detected.');
      } else {
        setExtractedText(text);
        setProgress(100);
        setStatusMessage('✅ Text extracted successfully!');
        if (showToast) showToast('✅ Text extracted from image!');
      }
    } catch (err: any) {
      console.error('OCR Error:', err);
      setStatusMessage('Scanning failed. Please try again.');
      setExtractedText('Error occurred during scanning: ' + (err.message || 'Unknown error'));
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopyText = async () => {
    if (!extractedText.trim()) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setIsCopied(true);
      if (showToast) showToast('📋 Text Copied to Clipboard!');
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = extractedText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setIsCopied(true);
      if (showToast) showToast('📋 Text Copied to Clipboard!');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleDownloadTxt = () => {
    if (!extractedText.trim()) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('💾 Downloaded as .txt file');
  };

  const handleClear = () => {
    setImageSrc(null);
    setImageFile(null);
    setExtractedText('');
    setStatusMessage('');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Quick detection of Pakistani phone numbers inside text
  const detectedPhones = useMemo(() => {
    if (!extractedText) return [];
    const matches = extractedText.match(/(?:03\d{2}[-\s]?\d{7})|(?:\+92\s?3\d{2}[-\s]?\d{7})/g);
    return matches ? Array.from(new Set(matches)) : [];
  }, [extractedText]);

  const wordCount = extractedText.trim() ? extractedText.trim().split(/\s+/).length : 0;
  const charCount = extractedText.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#151821] border border-[#262b38] rounded-xl p-5 shadow-md">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#c5a059]/15 text-[#c5a059] rounded-lg border border-[#c5a059]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                Picture Text Extractor (OCR)
              </h2>
              <p className="text-xs text-gray-400">
                Koi bhi tasveer ya screenshot upload karein — Sara text foran extract ho kar copy ke liye tayar ho jayega.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f2430] border border-[#31394c] text-xs font-mono text-gray-300">
            <Zap className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Shortcut: Ctrl + V to Paste</span>
          </span>
          {extractedText && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold rounded-lg border border-rose-500/30 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Upload on Left, Extracted Text on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Upload & Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[300px] overflow-hidden ${
              isDragging
                ? 'border-[#c5a059] bg-[#c5a059]/10'
                : 'border-[#2d3446] hover:border-[#c5a059]/70 bg-[#12141b] hover:bg-[#161a23]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            {imageSrc ? (
              <div className="w-full flex flex-col items-center space-y-3">
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-black/40 border border-[#2b3140]">
                  <Image
                    src={imageSrc}
                    alt="Upload Preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center justify-between w-full px-2 text-xs text-gray-400">
                  <span className="truncate max-w-[200px]">{imageFile?.name || 'Uploaded Image'}</span>
                  <span className="font-mono text-[10px] bg-[#1f2430] px-2 py-0.5 rounded text-amber-200">
                    Click to Change
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-6">
                <div className="w-16 h-16 rounded-2xl bg-[#1e2330] border border-[#333b50] flex items-center justify-center mx-auto text-[#c5a059] shadow-inner group-hover:scale-105 transition">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Click to Upload or Drag &amp; Drop Picture
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                    Screenshot, WhatsApp chat, courier receipt, ya supplier bill upload karein.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-[#1e2330] text-[#c5a059] text-[11px] font-mono rounded-full border border-[#374158]">
                    PNG, JPG, JPEG, WEBP &bull; or Press Ctrl+V
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Scanning Progress Bar */}
          {isScanning && (
            <div className="p-4 bg-[#141822] rounded-xl border border-[#2b3345] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{statusMessage}</span>
                </span>
                <span className="font-mono font-bold text-[#c5a059]">{progress}%</span>
              </div>
              <div className="w-full bg-[#202738] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#d4af37] to-amber-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Quick Detected Info (e.g. Phone Numbers) */}
          {detectedPhones.length > 0 && (
            <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-700/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>Detected Phone Numbers:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {detectedPhones.map((ph, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigator.clipboard.writeText(ph);
                      if (showToast) showToast(`Copied: ${ph}`);
                    }}
                    className="px-2.5 py-1 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-mono rounded-md border border-emerald-600/40 flex items-center gap-1 cursor-pointer"
                    title="Click to copy number"
                  >
                    <span>{ph}</span>
                    <Copy className="w-3 h-3 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Extracted Content Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#12141b] border border-[#262c3a] rounded-2xl p-5 shadow-xl flex flex-col min-h-[460px]">
            {/* Header & Copy Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#242a38] mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#c5a059]" />
                <span className="font-serif font-bold text-sm text-white uppercase tracking-wider">
                  Extracted Text Content
                </span>
                {extractedText && (
                  <span className="text-[10px] text-gray-400 font-mono bg-[#1c212d] px-2 py-0.5 rounded border border-[#2d3548]">
                    {wordCount} words &bull; {charCount} chars
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyText}
                  disabled={!extractedText || isScanning}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-gradient-to-r from-[#d4af37] to-[#aa8222] hover:from-[#e5bf47] hover:to-[#b88d2a] text-black shadow-[#c5a059]/20'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy All Content</span>
                    </>
                  )}
                </button>

                {extractedText && (
                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    title="Download as .txt"
                    className="p-2.5 bg-[#1f2430] hover:bg-[#2b3345] text-gray-300 hover:text-white rounded-xl border border-[#353d52] transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Editable Textbox */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder={
                  isScanning
                    ? 'AI is reading the text from your image... Please wait a few seconds.'
                    : 'Tasveer upload ya paste karein, sara likha hua content yahan show hoga jise aap aasaani se copy ya edit kar sakte hain...'
                }
                className="w-full flex-1 min-h-[300px] bg-[#0c0d12] border border-[#232938] rounded-xl p-4 text-sm font-sans text-stone-200 placeholder-gray-500 focus:outline-none focus:border-[#c5a059] resize-y leading-relaxed"
              />
            </div>

            {/* Footer Quick Hint */}
            <div className="pt-3 mt-3 border-t border-[#1f2430] flex items-center justify-between text-[11px] text-gray-400">
              <span>💡 You can directly edit the text above before copying.</span>
              {extractedText && (
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="text-[#c5a059] hover:underline font-semibold flex items-center gap-1"
                >
                  <ClipboardCopy className="w-3 h-3" />
                  <span>Quick Copy</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
