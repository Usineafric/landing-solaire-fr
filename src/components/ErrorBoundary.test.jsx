import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Composant qui génère une erreur
function ThrowError() {
  throw new Error('Test error');
}

// Composant normal
function NormalComponent() {
  return <div>Content works</div>;
}

describe('ErrorBoundary', () => {
  // Supprimer les erreurs console pendant les tests
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('affiche les enfants quand pas d\'erreur', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Content works')).toBeInTheDocument();
  });

  it('affiche le message d\'erreur quand une erreur survient', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
  });

  it('affiche les boutons de récupération', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Rafraîchir la page')).toBeInTheDocument();
    expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument();
  });
});
