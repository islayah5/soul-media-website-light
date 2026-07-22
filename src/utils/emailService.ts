export interface QuoteData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  services: string;
  volume: string;
  estimateRange: string;
  notes?: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export const sendQuoteEmail = (data: QuoteData) => {
  const subject = encodeURIComponent(`Soul Media - Custom Scope Intake: ${data.name} (${data.company})`);
  const body = encodeURIComponent(
    `Executive Intake Request from Soul Media Website\n\n` +
    `Name: ${data.name}\n` +
    `Company: ${data.company}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || 'N/A'}\n\n` +
    `Scope Details:\n` +
    `- Deliverable Output: ${data.volume}\n` +
    `- Required Services: ${data.services}\n` +
    `- Estimated Scope Investment Range: ${data.estimateRange}\n\n` +
    `Additional Notes:\n${data.notes || 'None provided'}\n`
  );

  window.location.href = `mailto:contact@soulmediagroup.com?subject=${subject}&body=${body}`;
};

export const sendContactEmail = (data: ContactData) => {
  const subject = encodeURIComponent(`Soul Media - Strategy Call Request: ${data.name}`);
  const body = encodeURIComponent(
    `Direct Strategy Intake from Soul Media Website\n\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || 'N/A'}\n` +
    `Primary Capability Interest: ${data.service}\n\n` +
    `Message:\n${data.message}\n`
  );

  window.location.href = `mailto:contact@soulmediagroup.com?subject=${subject}&body=${body}`;
};
