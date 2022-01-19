export interface EnableActivityTracking {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export interface SnowplowConfig {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
}

export interface TrackPageView {
}

export interface TrackParticularClicks {
    selectors?: (string)[] | null;
}
