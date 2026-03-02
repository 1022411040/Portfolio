import { Component } from "react";
import { FiRefreshCw, FiAlertTriangle, FiChevronDown, FiChevronUp, FiCode, FiHome, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    retryCount: 0
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Portfolio Error:", error);
  }

  handleRetry = () => {
    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1,
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    }));
  };

  handleReset = () => {
    window.location.reload();
  };

  renderErrorUI() {
    const { error, showDetails, retryCount } = this.state;
    const NavigateWrapper = this.props.navigateWrapper || (() => null);
    const maxRetries = 2;
    const canRetry = retryCount < maxRetries;

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
        <div className="max-w-md w-full">
          {/* Error Card */}
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-xl p-6 sm:p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-rose-500/10 to-pink-500/10 blur-xl" />
                <div className="relative w-16 h-16 rounded-full bg-linear-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                  <FiAlertTriangle className="w-8 h-8 text-rose-500 dark:text-rose-400" />
                </div>
                {!canRetry && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Title */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                Application Error
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {canRetry 
                  ? "An unexpected issue occurred. You can try to recover below."
                  : "Multiple attempts failed. Please reload or contact support."
                }
              </p>
            </div>

            {/* Error Message (Minimal) */}
            {error && (
              <div className="mb-6">
                <div className="rounded-lg border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 p-3">
                  <div className="flex items-start gap-2">
                    <FiCode className="w-4 h-4 text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0" />
                    <code className="text-xs text-zinc-700 dark:text-zinc-300 truncate">
                      {error.toString()}
                    </code>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Actions */}
            <div className="flex flex-col gap-3 mb-6">
              {canRetry ? (
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Try Again ({retryCount + 1}/{maxRetries + 1})
                </button>
              ) : (
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Reload Application
                </button>
              )}

              <NavigateWrapper>
                {(navigate) => (
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/5 dark:border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <FiHome className="w-4 h-4" />
                    Return Home
                  </button>
                )}
              </NavigateWrapper>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
              <button
                onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {showDetails ? (
                  <>
                    Hide Details <FiChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Show Details <FiChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>

              <NavigateWrapper>
                {(navigate) => (
                  <button
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <FiMail className="w-3 h-3" />
                    Report Issue
                  </button>
                )}
              </NavigateWrapper>
            </div>

            {/* Error Details (Collapsible) */}
            {showDetails && this.state.errorInfo && (
              <div className="mt-4 animate-fadeIn">
                <div className="rounded-lg border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                      Stack Trace
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(JSON.stringify({
                        error: this.state.error?.toString(),
                        stack: this.state.errorInfo.componentStack
                      }))}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="text-xs text-zinc-600 dark:text-zinc-400 overflow-auto max-h-40 font-mono">
                    {this.state.errorInfo.componentStack.substring(0, 300)}...
                  </pre>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10">
              <p className="text-xs text-center text-zinc-500 dark:text-zinc-500">
                Error ID: {Date.now().toString(36).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Decorative Bottom Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Need immediate assistance?{" "}
              <NavigateWrapper>
                {(navigate) => (
                  <button
                    onClick={() => navigate("/contact")}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Contact support
                  </button>
                )}
              </NavigateWrapper>
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }
    return this.props.children;
  }
}

// Export wrapper with navigation
export default function ErrorBoundaryWithNav(props) {
  const navigate = useNavigate();
  
  return (
    <ErrorBoundary 
      {...props} 
      navigateWrapper={({ children }) => children(navigate)}
    />
  );
}