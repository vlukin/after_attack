import { describe, it, expect, beforeAll } from 'vitest';
import { generateRandomName, generateRandomDepartment, getRandomEvent, getExcuseByType, securityEvents, excuses, loadDictionaries } from '../data/dictionaries';

describe('dictionaries', () => {
  beforeAll(async () => {
    await loadDictionaries();
  });

  describe('generateRandomName', () => {
    it('should generate a name with format "Adjective Noun"', () => {
      const name = generateRandomName();
      const parts = name.split(' ');
      expect(parts.length).toBe(2);
    });

    it('should return consistent format multiple times', () => {
      for (let i = 0; i < 10; i++) {
        const name = generateRandomName();
        const parts = name.split(' ');
        expect(parts.length).toBeGreaterThanOrEqual(1);
        parts.forEach(part => {
          expect(part.length).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('generateRandomDepartment', () => {
    it('should return a department', () => {
      const dept = generateRandomDepartment();
      expect(typeof dept).toBe('string');
      expect(dept.length).toBeGreaterThan(0);
    });

    it('should return a string', () => {
      const dept = generateRandomDepartment();
      expect(typeof dept).toBe('string');
    });
  });
});

describe('events', () => {
  beforeAll(async () => {
    await loadDictionaries();
  });

  describe('securityEvents', () => {
    it('should have events with required properties', () => {
      securityEvents.forEach(event => {
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('event');
        expect(event).toHaveProperty('consequences');
        expect(event).toHaveProperty('type');
      });
    });

    it('should have non-empty event descriptions', () => {
      securityEvents.forEach(event => {
        expect(event.event.length).toBeGreaterThan(0);
        expect(event.consequences.length).toBeGreaterThan(0);
      });
    });
  });

  describe('excuses', () => {
    it('should have excuses with required properties', () => {
      excuses.forEach(excuse => {
        expect(excuse).toHaveProperty('id');
        expect(excuse).toHaveProperty('description');
        expect(excuse).toHaveProperty('type');
      });
    });

    it('should have non-empty descriptions', () => {
      excuses.forEach(excuse => {
        expect(excuse.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getRandomEvent', () => {
    it('should return a security event', () => {
      const event = getRandomEvent();
      expect(securityEvents).toContain(event);
    });
  });

  describe('getExcuseByType', () => {
    it('should return an excuse with matching type', () => {
      const type = 'phishing';
      const excuse = getExcuseByType(type);
      expect(excuse.type).toBe(type);
    });

    it('should return random excuse for unknown type', () => {
      const excuse = getExcuseByType('unknown_type');
      expect(excuses).toContain(excuse);
    });
  });
});
