export type AttemptState = {
    selected: string | null;
    submitted: boolean;
    elapsed: number;
};

const ATTEMPT_PREFIX = "keam4u:attempt:";
const COMPLETED_PREFIX = "keam4u:completed:";

function storageAvailable() {
    return typeof window !== "undefined" && !!window.localStorage;
}

export function loadAttempt(questionId: string): AttemptState | null {
    if (!storageAvailable()) return null;

    try {
        const raw = window.localStorage.getItem(ATTEMPT_PREFIX + questionId);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as Partial<AttemptState>;
        return {
            selected: parsed.selected ?? null,
            submitted: Boolean(parsed.submitted),
            elapsed: Number(parsed.elapsed) || 0,
        };
    } catch {
        return null;
    }
}

export function saveAttempt(questionId: string, state: AttemptState) {
    if (!storageAvailable()) return;

    try {
        window.localStorage.setItem(
            ATTEMPT_PREFIX + questionId,
            JSON.stringify(state)
        );
    } catch {
        // Storage can be full or blocked; attempts are non-critical.
    }
}

export function clearAttempt(questionId: string) {
    if (!storageAvailable()) return;

    try {
        window.localStorage.removeItem(ATTEMPT_PREFIX + questionId);
    } catch {
        // Ignore.
    }
}

export function chapterKey(subject: string, chapter: string, year: string) {
    return `${COMPLETED_PREFIX}${subject}/${chapter}/${year}`;
}

export function getCompletedQuestions(key: string): string[] {
    if (!storageAvailable()) return [];

    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function markQuestionCompleted(key: string, questionId: string) {
    if (!storageAvailable()) return;

    try {
        const completed = new Set(getCompletedQuestions(key));
        completed.add(questionId);
        window.localStorage.setItem(key, JSON.stringify([...completed]));
    } catch {
        // Ignore.
    }
}
