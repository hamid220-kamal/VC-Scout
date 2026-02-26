'use client';

export default function NotesTab({ note, setNote, onSaveNote }) {
    return (
        <div className="notes-tab">
            <h3>Internal Notes</h3>
            <textarea
                placeholder="Add a note about this company..."
                className="notes-area"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button
                className="btn-primary"
                style={{ marginTop: '1rem' }}
                onClick={onSaveNote}
            >
                Save Note
            </button>
        </div>
    );
}
