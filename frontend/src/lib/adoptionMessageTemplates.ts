const getAcceptanceTemplate = (userName: string, animalName: string) =>
  `Szanowny/a ${userName},
  
  z przyjemnością informujemy, że Twój wniosek o adopcję zwierzęcia ${animalName} został zaakceptowany.
  
  Prosimy o kontakt w celu umówienia spotkania i finalizacji adopcji.
  
  Z poważaniem,
  Zespół Schroniska`;

const getRejectionTemplate = (userName: string, animalName: string) =>
  `Szanowny/a ${userName},
  
  dziękujemy za zainteresowanie adopcją zwierzęcia ${animalName}. Po rozpatrzeniu wniosku niestety nie możemy go zaakceptować.
  
  [Uzupełnij powód odrzucenia]
  
  Z poważaniem,
  Zespół Schroniska`;

const getCancellationTemplate = (userName: string, animalName: string) =>
  `Szanowny/a ${userName},
  
  informujemy, że wniosek o adopcję zwierzęcia ${animalName} został anulowany.
  
  [Uzupełnij powód anulacji, jeśli dotyczy]
  
  Z poważaniem,
  Zespół Schroniska`;

export { getAcceptanceTemplate, getRejectionTemplate, getCancellationTemplate };
