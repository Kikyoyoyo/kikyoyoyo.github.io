import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error("[app error]", err, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto max-w-3xl px-4 py-10 font-serif text-mizuno-900 dark:text-mizuno-50">
          <h1 className="mb-4 text-2xl font-semibold">Something went wrong</h1>
          <p className="mb-4 font-mono text-sm text-mizuno-700 dark:text-mizuno-300">{this.state.message}</p>
          <p className="text-mizuno-800 dark:text-mizuno-200">
            Try a hard refresh. If this persists, open the browser console (F12) and report the error.
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}
