export type EnableActivityTracking = {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export type SnowplowConfig = {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackStep?: TrackStep;
}

export type TrackPageView = {
}

export type TrackParticularClicks = {
    selectors?: (string)[] | null;
}

export type TrackStep = {
    selectors?: (string)[] | null;
}