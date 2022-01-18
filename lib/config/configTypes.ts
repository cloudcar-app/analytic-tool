export interface SnowplowConfig {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackPagePingExtended?: TrackPagePingExtended;
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
export interface TrackPagePingExtended {
    time_interval: number;
    mousePosInterval: number;
}