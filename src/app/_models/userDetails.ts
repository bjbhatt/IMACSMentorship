export interface Login {
    userId: number;
    fullName: string;
    isAdmin: boolean;
}

export interface PendingMentorRequest {
    userId: number;
    fullName: string;
    emailAddress: string;
    degree: string;
    location: string;
    requestDate: Date;
    expirationDate: Date;
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
    userId: string;
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
    degree: string;
    location: string;
    requestDate: Date;
    expirationDate: Date;
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
    pendingRequest?: PendingMenteeRequest;
    currentMentor?: CurrentMentor;
}

export interface MentorSearch {
    userId: number;
    fullName: string;
    emailAddress: string;
    degree: string;
    location: string;
    available: boolean;
    availableAfter?: Date;
}

export interface UserProfile {
    userId: number;
    fullName: string;
    isAdmin: boolean;
    emailAddress: string;
}
