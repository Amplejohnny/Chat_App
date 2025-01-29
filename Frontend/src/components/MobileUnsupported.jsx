const MobileUnsupported = () => {
  return (
    <div className="mobile-unsupported-container">
      <div className="mobile-unsupported-content">
        <div className="icon">
          <span role="img" aria-label="warning">
            ⚠️
          </span>
        </div>
        <h1>Oops! Mobile Access Not Supported</h1>
        <p>
          This app is designed for laptop and desktop use only. Please switch to a larger screen to
          continue.
        </p>
        <p className="contact-support">
          Need help? <a href="mailto:workatdeveloper@gmail.com">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default MobileUnsupported;
