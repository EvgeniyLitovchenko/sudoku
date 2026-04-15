import CookieConsent from "react-cookie-consent";

type Props = {
  buttonText?: string;
  declineButtonText?: string;
  overlay?: boolean;
};

/**
 * Компонент CookieBanner для відображення банера з інформацією про використання cookies.
 * @param {any} {buttonText="Acceptall"
 * @param {any} declineButtonText="Decline"
 * @param {any} overlay=false
 * @param {any} }:Props
 * @returns {any}
 */
const CookieBanner = ({
  buttonText = "Accept all",
  declineButtonText = "Decline",
  overlay = false,
}: Props) => {
  return (
    <CookieConsent
      location="bottom"
      buttonText={buttonText}
      declineButtonText={declineButtonText}
      enableDeclineButton
      cookieName="sudoku_cookie_consent"
      style={{
        background: "#1f2937",
        color: "#f9fafb",
        fontSize: "16px",
        padding: "14pх 10px",
        borderTop: "1px solid #374151",
      }}
      contentStyle={{
        margin: 0,
        padding: 0,
      }}
      buttonStyle={{
        background: "#22c55e",
        color: "#fff",
        fontSize: "13px",
        borderRadius: "6px",
        padding: "8px 14px",
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      declineButtonStyle={{
        background: "#ef4444",
        color: "#fff",
        fontSize: "13px",
        borderRadius: "6px",
        padding: "8px 14px",
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      expires={150}
      overlay={overlay}
    >
      🍪 This Sudoku app uses cookies and browser storage to save your progress and
      settings.
    </CookieConsent>
  );
};

export default CookieBanner;
