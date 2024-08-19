import { describe, it, expect, vi } from 'vitest';
import { debounce, getDefaultNote, defaultFolderId, defaultFolder } from './utils';

// Tests for debounce
describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    })
    it('should call the function after the specified delay', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 500);
        debouncedFunc();
        expect(func).not.toHaveBeenCalled();


        // Fast-forward time by 500ms
        vi.advanceTimersByTime(500);
        expect(func).toHaveBeenCalled();
    });

    it('should reset the delay if called again within the delay period', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 500);

        debouncedFunc();

        vi.advanceTimersByTime(300); // 300ms pass
        debouncedFunc(); // Called again within delay
        vi.advanceTimersByTime(200); // 200ms pass (total 500ms from start)

        expect(func).not.toHaveBeenCalled(); // Not called yet

        vi.advanceTimersByTime(300); // Complete the remaining 300ms
        expect(func).toHaveBeenCalled();
    });
});

// Tests for getDefaultNote and defaultFolderId
describe('getDefaultNote', () => {
    it('should return a new note with the provided folderId', () => {
        const folderId = 'testFolderId';
        const note = getDefaultNote(folderId);

        expect(note.folderId).toBe(folderId);
        expect(note.title).toBe('New Note');
        expect(note.content).toBe('');
        expect(note.createdAt).toBeDefined();
        expect(note.updatedAt).toBeDefined();
    });

    it('should return a new note with the defaultFolderId when no folderId is provided', () => {
        const note = getDefaultNote();

        expect(note.folderId).toBe(defaultFolderId);
        expect(note.title).toBe('New Note');
        expect(note.content).toBe('');
        expect(note.createdAt).toBeDefined();
        expect(note.updatedAt).toBeDefined();
    });
});

// Tests for defaultFolder
describe('defaultFolder', () => {
    it('should have id as defaultFolderId and name as "Notes"', () => {
        expect(defaultFolder.id).toBe(defaultFolderId);
        expect(defaultFolder.name).toBe('Notes');
    });
});
