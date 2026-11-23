import { Component } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Uncaught React Error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#101D36] text-[#F5F0E8]">
          <div className="relative max-w-lg w-full p-8 rounded-3xl glass-panel border border-rose-500/40 bg-[#0A1324] text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mx-auto mb-4 text-rose-400">
              <AlertCircle className="w-7 h-7" />
            </div>

            <span className="font-cinematic text-xs tracking-widest text-[#F5B77D] uppercase font-semibold">
              Portal Interruption
            </span>

            <h2 className="font-cinematic text-xl sm:text-2xl font-bold text-white mt-1 mb-3">
              The Door Encountered a Rift
            </h2>

            <p className="text-xs sm:text-sm text-[#A7B7C9] font-sans leading-relaxed mb-6">
              A temporary runtime issue occurred while rendering the cinematic experience. You can reload the portal to resume your journey.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 rounded-xl bg-black/50 border border-white/10 text-left overflow-x-auto text-[11px] font-mono text-rose-300 max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#F5B77D] text-[#101D36] font-cinematic text-xs font-bold tracking-widest uppercase shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Portal</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
