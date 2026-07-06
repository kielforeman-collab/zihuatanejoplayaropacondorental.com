import React, { useState } from 'react';
import { Volume2, Send, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    passphrase: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    passphrase: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // The CAPTCHA code matches the hardcoded stamp/session of the static pages
  const passphraseCode = 'w65kpq';
  const ppstampValue = 'ff451d098a8ee4ed7e541475b515834c';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const playAudioCaptcha = () => {
    const chars = passphraseCode.split('');
    let index = 0;

    const playNext = () => {
      if (index >= chars.length) return;
      const audioUrl = `https://www.zihuatanejoplayaropacondorental.com/audio/${chars[index]}.mp3`;
      const audio = new Audio(audioUrl);
      audio.addEventListener('ended', () => {
        index++;
        setTimeout(playNext, 200);
      });
      audio.play().catch((err) => console.log('Audio playback failed', err));
    };

    playNext();
  };

  const validate = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: formData.phone.trim() === '',
      passphrase: formData.passphrase.toLowerCase() !== passphraseCode,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Create a form element dynamically and submit it natively 
      // to guarantee delivery to the legacy PHP server, avoiding CORS restrictions.
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://zihuatanejoplayaropacondorental.com/index.php?m=cs';

      const inputs = [
        { name: 'your-name', value: formData.name },
        { name: 'your-email', value: formData.email },
        { name: 'tel-number', value: formData.phone },
        { name: 'your-message', value: formData.message },
        { name: 'passphrase', value: formData.passphrase },
        { name: 'ppstamp', value: ppstampValue },
      ];

      inputs.forEach((inputData) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = inputData.name;
        input.value = inputData.value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
      // Since native submit redirects the browser, we just mark submitting
      // but in standard scenarios the page redirects. 
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError('An error occurred while preparing form submission.');
      console.error(err);
    }
  };

  return (
    <div className="contact-form-wrapper glass-panel">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="e.g. John Doe"
          />
          {errors.name && <span className="error-text">Your name is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder="e.g. john@example.com"
          />
          {errors.email && <span className="error-text">A valid email is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Your Phone Number <span className="required">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
            placeholder="e.g. +1 555-0199"
          />
          {errors.phone && <span className="error-text">Your phone number is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className="form-input form-textarea"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        {/* CAPTCHA / Passphrase block */}
        <div className="form-group captcha-group">
          <label>Passphrase <span className="required">*</span></label>
          <div className="captcha-display">
            <div className="captcha-images">
              <img src="/mobile/images/w.webp" alt="w" />
              <img src="/mobile/images/6.webp" alt="6" />
              <img src="/mobile/images/5.webp" alt="5" />
              <img src="/mobile/images/k.webp" alt="k" />
              <img src="/mobile/images/p.webp" alt="p" />
              <img src="/mobile/images/q.webp" alt="q" />
            </div>
            <button
              type="button"
              className="captcha-audio-btn"
              onClick={playAudioCaptcha}
              title="Speak Passphrase"
            >
              <Volume2 size={20} />
            </button>
          </div>
          
          <input
            type="text"
            name="passphrase"
            value={formData.passphrase}
            onChange={handleInputChange}
            className={`form-input captcha-input ${errors.passphrase ? 'input-error' : ''}`}
            placeholder="Type the passphrase shown above"
            maxLength={20}
            autoComplete="off"
          />
          {errors.passphrase && (
            <span className="error-text">Please match the passphrase characters shown.</span>
          )}
          <span className="captcha-help-text">Type the letters/numbers shown above in lowercase.</span>
        </div>

        {submitError && (
          <div className="form-error-banner">
            <AlertCircle size={18} />
            <span>{submitError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-submit"
        >
          {isSubmitting ? (
            <span className="btn-spinner"></span>
          ) : (
            <>
              Submit Message <Send size={16} style={{ marginLeft: '8px' }} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
export default ContactForm;
