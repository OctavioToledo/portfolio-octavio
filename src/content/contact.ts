import type { Localized } from './types'

export type ContactContent = {
  sectionTitle: string
  intro: string
  emailLabel: string
  locationLabel: string
  locationValue: string
  formNameLabel: string
  formEmailLabel: string
  formMessageLabel: string
  formSubmitLabel: string
  formSuccessMessage: string
  formErrorMessage: string
}

export const contactContent: Localized<ContactContent> = {
  es: {
    sectionTitle: 'Contacto',
    intro: 'Prefiero email o LinkedIn — o usá el formulario de acá abajo. Respondo en 24-48hs.',
    emailLabel: 'Email',
    locationLabel: 'Ubicación',
    locationValue: 'Mendoza, Argentina',
    formNameLabel: 'Nombre',
    formEmailLabel: 'Email',
    formMessageLabel: 'Mensaje',
    formSubmitLabel: 'Enviar mensaje',
    formSuccessMessage: 'Mensaje enviado. Te voy a responder pronto.',
    formErrorMessage: 'No se pudo enviar el mensaje. Probá de nuevo o escribime directo a octatoledo7@gmail.com.',
  },
  en: {
    sectionTitle: 'Contact',
    intro: 'Email or LinkedIn work best — or just use the form below. I reply within 24-48h.',
    emailLabel: 'Email',
    locationLabel: 'Location',
    locationValue: 'Mendoza, Argentina',
    formNameLabel: 'Name',
    formEmailLabel: 'Email',
    formMessageLabel: 'Message',
    formSubmitLabel: 'Send message',
    formSuccessMessage: "Message sent. I'll get back to you soon.",
    formErrorMessage: "Couldn't send the message. Try again or email me directly at octatoledo7@gmail.com.",
  },
}
