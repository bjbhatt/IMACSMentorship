export interface Login {
    userId: number;
    fullName: string;
}

export interface PendingMentorRequest {
    userId: number;
    fullName: string;
    emailAddress: string;
    requestDate: Date;
    expirationDate: Date;
    degree?: string;
    location?: string;
}

export interface CurrentMentee {
    userId: number;
    fullName: string;
    emailAddress: string;
    startDate: Date;
    endDate: Date;
}

export interface Mentor {
    userId: number;
    status: string;
    trainingDate?: Date;
    pendingRequests?: PendingMentorRequest[];
    currentMentee?: CurrentMentee;
}

export interface MentorshipHistory {
    id: string;
    fullName: string;
    emailAddress: string;
    outcome: string;
    startDate: Date;
    endDate?: Date;
    cancellationDate?: Date;
}

export interface PendingMenteeRequest {
    userId: number;
    fullName: string;
    emailAddress: string;
    requestDate: Date;
    expirationDate: Date;
    degree?: string;
    location?: string;
}

export interface CurrentMentor {
    userId: number;
    fullName: string;
    emailAddress: string;
    startDate: Date;
    endDate: Date;
}

export interface Mentee {
    userId: number;
    status: string;
    pendingRequests?: PendingMenteeRequest[];
    currentMentor?: CurrentMentor;
}

export interface MentorSearch {
    userId: number;
    fullName: string;
    emailAddress: string;
    available: boolean;
    availableAfter?: Date;
}

export interface UserProfile {
    id: number;
    fullName: string;
    emailAddress: string;
}
