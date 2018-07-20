export interface UserProfile {
    id: number;
    name: string;
}

export interface PendingRequest {
    id: string;
    name: string;
    email: string;
    degree: string;
    location: string;
    expiresOn: Date;
}

export interface Mentor {
    id: number;
    status: string;
    trainingDate?: Date;
    pendingRequests?: PendingRequest[];
    mentee?: {
        id: string,
        name: string;
        email: string;
        endsOn: Date;
    };
}

export interface Mentee {
    id: number;
    status: string;
    mentor?: {
        name: string;
        email: string;
        endsOn?: Date;
        expiresOn?: Date;
    };
}

