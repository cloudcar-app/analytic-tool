export interface SnowplowConfig {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackPurchaseButtonClick?: TrackPurchaseButtonClick;
    trackTextSelection?: TrackTextSelection;
}
export interface TrackPageView {
}
export interface TrackTextSelection {
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