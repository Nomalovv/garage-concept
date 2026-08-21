const KW_TO_CH = 1.35962;

export function hpFromKw(powerKw: number): number | null {
  if (!powerKw || powerKw <= 0) return null;
  return Math.round(powerKw * KW_TO_CH);
}

// Formule administrative française (arrêté du 9 février 1998) : CV fiscaux =
// (CO2 / 45) + (puissance en kW / 40)^1.6, arrondi à l'entier le plus proche.
export function fiscalHorsepower(
  powerKw: number,
  co2: number,
): number | null {
  if (!powerKw || powerKw <= 0) return null;
  const value = co2 / 45 + Math.pow(powerKw / 40, 1.6);
  return Math.max(1, Math.round(value));
}
