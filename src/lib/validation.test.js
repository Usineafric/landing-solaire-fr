import { describe, it, expect } from 'vitest';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  validateStep,
  checkEligibility,
} from './validation';

describe('Validation Step 1', () => {
  it('valide un formulaire correct', () => {
    const data = {
      isOwner: 'yes',
      housingType: 'house',
      postalCode: '75001',
    };
    const result = validateStep(step1Schema, data);
    expect(result.success).toBe(true);
  });

  it('rejette un code postal trop court', () => {
    const data = {
      isOwner: 'yes',
      housingType: 'house',
      postalCode: '750',
    };
    const result = validateStep(step1Schema, data);
    expect(result.success).toBe(false);
    expect(result.errors.postalCode).toBeDefined();
  });

  it('rejette un code postal DOM-TOM', () => {
    const data = {
      isOwner: 'yes',
      housingType: 'house',
      postalCode: '97100',
    };
    const result = validateStep(step1Schema, data);
    expect(result.success).toBe(false);
  });

  it('rejette un code postal Corse', () => {
    const data = {
      isOwner: 'yes',
      housingType: 'house',
      postalCode: '20000',
    };
    const result = validateStep(step1Schema, data);
    expect(result.success).toBe(false);
  });
});

describe('Validation Step 2', () => {
  it('valide un formulaire correct', () => {
    const data = {
      requestType: 'Étude de faisabilité gratuite',
      projectDeadline: '3-6',
    };
    const result = validateStep(step2Schema, data);
    expect(result.success).toBe(true);
  });

  it('rejette sans type de demande', () => {
    const data = {
      requestType: '',
      projectDeadline: '3-6',
    };
    const result = validateStep(step2Schema, data);
    expect(result.success).toBe(false);
  });
});

describe('Validation Step 3', () => {
  it('valide un formulaire correct', () => {
    const data = {
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '0612345678',
      email: 'jean@example.com',
      consent: true,
    };
    const result = validateStep(step3Schema, data);
    expect(result.success).toBe(true);
  });

  it('valide un téléphone avec +33', () => {
    const data = {
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '+33612345678',
      email: 'jean@example.com',
      consent: true,
    };
    const result = validateStep(step3Schema, data);
    expect(result.success).toBe(true);
  });

  it('rejette un email invalide', () => {
    const data = {
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '0612345678',
      email: 'invalid-email',
      consent: true,
    };
    const result = validateStep(step3Schema, data);
    expect(result.success).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it('rejette sans consentement', () => {
    const data = {
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '0612345678',
      email: 'jean@example.com',
      consent: false,
    };
    const result = validateStep(step3Schema, data);
    expect(result.success).toBe(false);
  });

  it('rejette un téléphone invalide', () => {
    const data = {
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '123',
      email: 'jean@example.com',
      consent: true,
    };
    const result = validateStep(step3Schema, data);
    expect(result.success).toBe(false);
  });
});

describe('Éligibilité', () => {
  it('éligible: propriétaire + maison', () => {
    expect(checkEligibility({ isOwner: 'yes', housingType: 'house' })).toBe(true);
  });

  it('non éligible: locataire', () => {
    expect(checkEligibility({ isOwner: 'no', housingType: 'house' })).toBe(false);
  });

  it('non éligible: appartement', () => {
    expect(checkEligibility({ isOwner: 'yes', housingType: 'apartment' })).toBe(false);
  });
});
