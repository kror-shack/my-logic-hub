const checkValidity = (key: string): string | null => {
  const figures: Record<string, string> = {
    "AAA-1": "Barbara",
    "AEE-2": "Camestres",
    "AII-3": "Datisi",
    "AEE-4": "Camenes",
    "EAE-1": "Celarent",
    "EAE-2": "Cesare",
    "IAI-3": "Disamis",
    "IAI-4": "Dimaris",
    "AII-1": "Darii",
    "AOO-2": "Baroko",
    "EIO-3": "Ferison",
    "EIO-4": "Fresison",
    "EIO-1": "Ferio",
    "EIO-2": "Festino",
    "OAO-3": "Bokardo",
  };

  return figures[key] || null;
};

export default checkValidity;
