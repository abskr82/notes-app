// @ts-nocheck
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { Header } from './Header';
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../../store/slices/notesSlice';
import foldersReducer from '../../store/slices/foldersSlice';
import * as utils from '../../utils/utils'; // Import everything from utils

// Partially mock the utils module
vi.mock('../../utils/utils', async () => {
    const originalModule = await vi.importActual('../../utils/utils');
    return {
        ...originalModule, // Spread the original exports
        getDefaultNote: vi.fn(), // Mock getDefaultNote function
    };
});

describe('Header', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                notes: notesReducer,
                folders: foldersReducer,
            },
        });

        // Mocking the return value of getDefaultNote
        (utils.getDefaultNote as vi.Mock).mockReturnValue({
            id: '1',
            title: 'New Note',
            content: '',
            folderId: utils.defaultFolderId, // Use the original defaultFolderId
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    });

    it('renders the "Create Note" button', () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        const button = screen.getByText(/create note/i);
        expect(button).toBeInTheDocument();
    });

    it('dispatches addNote when the "Create Note" button is clicked', () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        const button = screen.getByText(/create note/i);

        fireEvent.click(button);

        const state = store.getState();

        expect(state.notes.notes).toHaveLength(1);
        expect(state.notes.notes[0]).toEqual({
            id: '1',
            title: 'New Note',
            content: '',
            folderId: utils.defaultFolderId, // Use the original defaultFolderId
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });
});
