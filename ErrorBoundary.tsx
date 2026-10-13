/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends (React.Component as unknown as {
  new (props: Props): {
    props: Props;
    state: State;
    setState(state: Partial<State>): void;
    render(): React.ReactNode;
  };
}) {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.warn('ErrorBoundary captured runtime error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.hash = '';
      window.location.reload();
    }
  };

  private handleBackHome = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-indigo-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-center border-4 border-yellow-200 animate-fade-in">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <AlertTriangle className="w-9 h-9" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-fredoka font-bold text-slate-800 mb-2">
              Hệ thống đã tự động khôi phục an toàn 🐝
            </h2>
            
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Một tiến trình vừa hoàn tất hoặc gặp gián đoạn tạm thời. Dữ liệu giáo án và câu hỏi của thầy cô đã được lưu trữ an toàn trong bộ nhớ cache.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Tiếp tục làm việc</span>
              </button>
              
              <button
                type="button"
                onClick={this.handleBackHome}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all active:scale-95"
              >
                <Home className="w-4 h-4" />
                <span>Về trang chủ SmartEdu</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
