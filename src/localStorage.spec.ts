// localStorage.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { loadState, saveState } from './localStorage';

// localStorage.spec.ts

describe('localStorage utilities', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();

    });

    it('should load state from localStorage', () => {
        const testState = { key: 'value' };
        localStorage.setItem('testKey', JSON.stringify(testState));

        const result = loadState('testKey');

        expect(result).toEqual(testState);
    });

    it('should return undefined if localStorage is empty', () => {
        const result = loadState('nonExistentKey');

        expect(result).toBeUndefined();
    });

    it('should save state to localStorage', () => {
        const testState = { key: 'value' };

        saveState('testKey', testState);

        expect(localStorage.getItem('testKey')).toEqual(JSON.stringify(testState));
    });
});
