export interface SnowplowConfig {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackStep?: TrackStep;
}
export interface TrackPageView {
}
export interface EnableActivityTracking {
    minimumVisitLength: number;
    heartbeatDelay: number;
}
export interface TrackParticularClicks {
    selectors?: (string)[] | null;
}

export interface TrackStep {
    selectors?: (string)[] | null;
}