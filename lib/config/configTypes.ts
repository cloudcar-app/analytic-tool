export interface SnowplowConfig {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackHover?: TrackHover;
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
export interface TrackHover {
    selectors?: (string)[] | null;
}