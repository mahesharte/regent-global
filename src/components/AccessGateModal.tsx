'use client';

import { useEffect, useRef, type FC, useState } from 'react';
import { X } from 'lucide-react';

type AccessGateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { organisationName: string; email: string }) => Promise<void>;
  pageSlug: string;
  pdfLabel?: string;
};

const AccessGateModal: FC<AccessGateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  pageSlug,
  pdfLabel,
}) => {
  const [organisationName, setOrganisationName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'input, button, [tabindex]'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first input on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstInput = modalRef.current.querySelector('input') as HTMLInputElement;
      setTimeout(() => firstInput?.focus(), 0);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!organisationName.trim()) {
      setError('Organisation Name is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        organisationName: organisationName.trim(),
        email: email.trim(),
      });
      // Reset form on success
      setOrganisationName('');
      setEmail('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process request';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-6">
          <h2 id="modal-title" className="text-xl font-bold text-blue">
            Access Our Sustainability Strategy
          </h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Organisation Name */}
          <div>
            <label
              htmlFor="organisation-name"
              className="block text-sm font-semibold text-neutral-900"
            >
              Organisation Name <span className="text-red-600">*</span>
            </label>
            <input
              id="organisation-name"
              type="text"
              value={organisationName}
              onChange={(e) => {
                setOrganisationName(e.target.value);
                setError(null);
              }}
              placeholder="Your organisation name"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:bg-neutral-100 disabled:text-neutral-500"
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-neutral-900"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              placeholder="your@email.com"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:bg-neutral-100 disabled:text-neutral-500"
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-lg bg-blue px-6 py-2.5 font-semibold text-white transition-all hover:bg-red hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:hover:shadow-none"
            aria-busy={isLoading}
          >
            {isLoading ? 'Processing...' : 'View Strategy'}
          </button>
        </form>

        {/* Optional: Footer note */}
        {pdfLabel && (
          <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-3 text-xs text-neutral-600">
            <p>PDF: {pdfLabel}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AccessGateModal;
