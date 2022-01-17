export interface SnowplowConfig {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackPurchaseButtonClick?: TrackPurchaseButtonClick;
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
export interface TrackPurchaseButtonClick {
    selectors?: (string)[] | null;
}