export type EnableActivityTracking = {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export type SnowplowConfig = {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackHover?: TrackHover;
}

export type TrackPageView = {
}

export type TrackParticularClicks = {
    selectors?: (string)[] | null;
}

export type TrackHover = {
    selectors?: (string)[] | null;
}